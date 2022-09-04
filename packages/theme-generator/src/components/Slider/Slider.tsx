import './Slider.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useKeyboardFocus } from 'src/hooks'
import classNames from 'classnames'

type OnChangeType = (value: number) => void

export const Slider = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  microStep,
  macroStep,
  onChange,
  children,
  onKeyboardFocus,
  onKeyboardBlur,
  onDragStart,
  onDragEnd,
  track,
}: {
  value: number
  min?: number
  max?: number
  step?: number
  microStep?: number
  macroStep?: number
  onChange: OnChangeType
  children?: JSX.Element | (() => JSX.Element)
  track?: JSX.Element | (() => JSX.Element)
  onKeyboardFocus?: () => void
  onKeyboardBlur?: () => void
  onDragStart?: () => void
  onDragEnd?: () => void
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const sliderTrackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const thumbHasKeyboardFocus = useKeyboardFocus(thumbRef, {
    onKeyboardFocus,
    onKeyboardBlur,
  })
  const originalUserSelectSetting = useRef<string>('')
  const originalCursorSetting = useRef<string>('')
  const clickOffsetRef = useRef(0)
  const range = max - min
  const clamp = (n: number) => Math.max(Math.min(n, max), min)
  const roundToStep = (n: number) => {
    if (step > 0) return Math.round(n / step) * step
    return n
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sliderTrackRef.current) {
        const slider = sliderTrackRef.current.getBoundingClientRect()
        const thumbPos = e.clientX - slider.left + clickOffsetRef.current
        const newValue = (thumbPos / slider.width) * range + min
        if (onChange) onChange(clamp(roundToStep(newValue)))
      }
    }
    const handleMouseUp = () => {
      setIsDragging(false)
      if (onDragEnd) onDragEnd()
      document.body.style.userSelect = originalUserSelectSetting.current
      document.body.style.cursor = originalCursorSetting.current
    }

    const addListeners = () => {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
    const removeListeners = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    if (isDragging) addListeners()
    else removeListeners()
    return () => removeListeners()
  })

  const handleTrackMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.button === 0) {
      setIsDragging(true)
      if (onDragStart) onDragStart()
      if (sliderTrackRef.current) {
        const slider = sliderTrackRef.current.getBoundingClientRect()
        const thumbPos = e.clientX - slider.left
        const newValue = (thumbPos / slider.width) * range + min
        if (onChange) onChange(clamp(roundToStep(newValue)))
      }
      clickOffsetRef.current = 0

      // Prevents text on the page from getting selected as user drags.
      // This is reset in handleMouseUp.
      originalUserSelectSetting.current = document.body.style.userSelect
      document.body.style.userSelect = 'none'

      originalCursorSetting.current = document.body.style.cursor
      document.body.style.cursor = 'ew-resize'
    }
  }

  const handleThumbMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation()
    if (e.button === 0) {
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
          thumb.left + thumb.width / 2 - e.clientX,
        )
      }

      // Prevents text on the page from getting selected as user drags.
      // This is reset in handleMouseUp.
      originalUserSelectSetting.current = document.body.style.userSelect
      document.body.style.userSelect = 'none'

      originalCursorSetting.current = document.body.style.cursor
      document.body.style.cursor = 'ew-resize'
    }
  }

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
      if (e.altKey && microStep) {
        diff = microStep * sign
      } else if (e.shiftKey && macroStep) {
        diff = macroStep * sign
      } else {
        diff = step * sign
      }

      if (onChange) onChange(clamp(value + diff))
    }
  }

  const renderChildren = () => {
    if (!children)
      return (
        <div
          className={classNames('Slider__thumb', {
            'Slider__thumb--has-keyboard-focus': thumbHasKeyboardFocus,
          })}
        />
      )
    if (typeof children === 'function') return children()
    return children
  }

  const renderTrack = () => {
    if (!track) return <div className="Slider__track" />
    if (typeof track === 'function') return track()
    return track
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="Slider"
      onMouseDown={handleTrackMouseDown}
      ref={sliderTrackRef}
    >
      {renderTrack()}
      <div
        className="Slider__thumb-wrapper"
        style={{ left: `${((clamp(value) - min) / range) * 100}%` }}
        onMouseDown={handleThumbMouseDown}
        role="slider"
        aria-valuenow={value}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        ref={thumbRef}
      >
        {renderChildren()}
      </div>
    </div>
  )
}
