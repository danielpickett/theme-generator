import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Expand } from 'ThemeGenerator/types'
import { useHasKeyboardFocus } from 'ThemeGenerator/hooks'
import classNames from 'classnames'
import './SliderThumb.scss'

export const defaultSliderThumbSizeInRem = 1
export const defaultTrackBarHeightInRem = 0.5

type OnChangeType = (value: number, id: string | number | undefined) => void
type OnFocusChangeType = (id: string | number | undefined) => void
type RenderPropsType = {
  hasFocus: boolean
  hasKeyboardFocus: boolean
  isDragging: boolean
}

export const SliderThumb = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  microStepMultiplier,
  macroStepMultiplier,
  sliderTrackRef,
  children,
  id,
  'aria-label': ariaLabel,
  onChange,
  onFocus,
  onKeyboardFocus,
  onBlur,
  onKeyboardBlur,
  onDragStart,
  onDragEnd,
}: {
  value: number
  min?: number
  max?: number
  step?: number
  microStepMultiplier?: number
  macroStepMultiplier?: number
  sliderTrackRef: React.RefObject<HTMLDivElement>
  children?:
    | JSX.Element
    | ((renderProps: Expand<RenderPropsType>) => JSX.Element)
  id?: string | number
  'aria-label': string
  onChange?: OnChangeType
  onFocus?: OnFocusChangeType
  onKeyboardFocus?: () => void
  onBlur?: OnFocusChangeType
  onKeyboardBlur?: () => void
  onDragStart?: () => void
  onDragEnd?: () => void
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const thumbRef = useRef<HTMLDivElement>(null)
  const originalUserSelectSetting = useRef<string>('')
  const hasKeyboardFocus = useHasKeyboardFocus(thumbRef, {
    onKeyboardFocus,
    onKeyboardBlur,
  })
  const clickOffsetRef = useRef(0)
  const range = max - min

  const clamp = useCallback(
    (n: number) => Math.max(Math.min(n, max), min),
    [min, max]
  )
  const roundToStep = useCallback(
    (n: number) => Math.round(n / step) * step,
    [step]
  )

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true)
    if (onDragStart) onDragStart()

    // Get the distance between the point on the thumb that was click, and
    // the center of the thumb. Save this in a ref to avoid extra renders.
    // If you've clicked the thumb a bit off-center, adding this back in the
    // mouse move handler prevents the thumb from jumping it's centerpoint
    // to your cursor position, which is a bit umpleasant visually.
    if (thumbRef.current) {
      const thumb = thumbRef.current.getBoundingClientRect()
      clickOffsetRef.current = Math.round(
        thumb.left + thumb.width / 2 - e.clientX
      )
    }

    // Prevents text on the page from getting selected as user drags.
    // This is reset in handleMouseUp.
    originalUserSelectSetting.current = document.body.style.userSelect
    document.body.style.userSelect = 'none'
  }

  useEffect(
    () => {
      const handleMouseUp = () => {
        setIsDragging(false)
        if (onDragEnd) onDragEnd()
        document.body.style.userSelect = originalUserSelectSetting.current
      }

      const handleMouseMove = (e: globalThis.MouseEvent) => {
        if (sliderTrackRef.current && thumbRef.current) {
          const slider = sliderTrackRef.current.getBoundingClientRect()
          const thumbPos = e.clientX - slider.left + clickOffsetRef.current
          const newValue = (thumbPos / slider.width) * range + min
          if (onChange) onChange(clamp(roundToStep(newValue)), id)
        }
      }

      if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
      } else {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    },
    [
      isDragging,
      range,
      min,
      max,
      step,
      id,
      sliderTrackRef,
      roundToStep,
      clamp,
      onChange,
    ] // everything but the value
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const sign = e.key === 'ArrowLeft' ? -1 : 1
      let diff: number

      // micro- and macro-stepping are intended to be power user features
      // for specific sliders, where shift or alt can be held to make the
      // value jump in larger or smaller increments. This feature is common
      // in design tools like Photoshop and Figma. Right now it's only
      // implemented for keyboard interactions, but I'd like to implement it
      // for mouse dragging in the future.
      if (e.altKey && microStepMultiplier) {
        diff = step * microStepMultiplier * sign
      } else if (e.shiftKey && macroStepMultiplier) {
        diff = step * macroStepMultiplier * sign
      } else {
        diff = step * sign
      }

      if (onChange) onChange(clamp(value + diff), id)
    }
  }

  const renderProps: RenderPropsType = {
    hasFocus,
    hasKeyboardFocus,
    isDragging,
  }

  return (
    <div
      ref={thumbRef}
      className="SliderThumb"
      tabIndex={0}
      role="slider"
      aria-label={ariaLabel}
      aria-valuenow={value}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      onFocus={() => {
        setHasFocus(true)
        if (onFocus) onFocus(id)
      }}
      onBlur={() => {
        setHasFocus(false)
        if (onBlur) onBlur(id)
      }}
      style={{
        left: `${((clamp(value) - min) / range) * 100}%`,
      }}
    >
      {(() => {
        if (!children) {
          return (
            <div
              className={classNames('SliderThumb__thumb', {
                'SliderThumb__thumb--has-keyboard-focus': hasKeyboardFocus,
                'SliderThumb__thumb--is-dragging': isDragging,
              })}
              style={{
                width: `${defaultSliderThumbSizeInRem}rem`,
                height: `${defaultSliderThumbSizeInRem}rem`,
              }}
            />
          )
        }
        if (typeof children === 'function') {
          return children(renderProps)
        }
        return children
      })()}
    </div>
  )
}
