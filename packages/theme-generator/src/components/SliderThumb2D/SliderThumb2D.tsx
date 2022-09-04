import React, { useEffect, useRef, useState, useCallback } from 'react'
import './SliderThumb2D.scss'
import classNames from 'classnames'
import { Expand } from 'src/types'
import { useKeyboardFocus } from 'src/hooks'

type OnChangeType = (xy: [number, number]) => void
type OnFocusChangeType = () => void
type RenderPropsType = {
  hasFocus: boolean
  hasKeyboardFocus: boolean
  isDragging: boolean
}

// adapted from https://github.com/gregberge/react-merge-refs
export const mergeRefs = <T,>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>,
): React.RefCallback<T> => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') ref(value)
      else if (ref != null)
        // eslint-disable-next-line no-param-reassign
        (ref as React.MutableRefObject<T | null>).current = value
    })
  }
}

export const SliderThumb2D = React.forwardRef(
  (
    {
      xy,
      minXY = [0, 0],
      maxXY = [100, 100],
      step = 1,
      allowFloat,
      microStep,
      macroStep,
      sliderAreaRef,
      children,
      id,
      'aria-label': ariaLabel,
      onChange,
      onFocus,
      onBlur,
      onKeyboardFocus,
      onKeyboardBlur,
      onDragStart,
      onDragEnd,
    }: {
      xy: [number, number]
      minXY?: [number, number]
      maxXY?: [number, number]
      step?: number
      allowFloat?: boolean
      microStep?: number
      macroStep?: number
      sliderAreaRef: React.RefObject<HTMLDivElement>
      children?:
        | JSX.Element
        | ((renderProps: Expand<RenderPropsType>) => JSX.Element)
      id?: string | number
      'aria-label': string
      onChange?: OnChangeType
      onFocus?: OnFocusChangeType
      onBlur?: OnFocusChangeType
      onKeyboardFocus?: () => void
      onKeyboardBlur?: () => void
      onDragStart?: () => void
      onDragEnd?: () => void
    },
    forwardedRef,
  ) => {
    const [isDragging, setIsDragging] = useState(false)
    const [hasFocus, setHasFocus] = useState(false)
    const thumbRef = useRef<HTMLDivElement>(null)
    const hasKeyboardFocus = useKeyboardFocus(thumbRef, {
      onKeyboardFocus,
      onKeyboardBlur,
    })
    const originalUserSelectSetting = useRef<string>('')
    const clickOffsetRef = useRef([0, 0])
    const [x, y] = xy
    const [maxX, maxY] = maxXY
    const [minX, minY] = minXY

    const rangeX = maxX - minX
    const rangeY = maxY - minY

    const clampX = useCallback(
      (n: number) => Math.max(Math.min(n, maxX), minX),
      [maxX, minX],
    )
    const clampY = useCallback(
      (n: number) => Math.max(Math.min(n, maxY), minY),
      [maxY, minY],
    )
    // const clampY = (n: number) => Math.max(Math.min(n, maxY), minY)
    const roundToStep = useCallback(
      (n: number) => Math.round(n / step) * step,
      [step],
    )

    const handleMouseDown = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
      setIsDragging(true)
      if (onDragStart) onDragStart()

      // Get the distance between the point on the thumb that was click, and
      // the center of the thumb. Save this in a ref to avoid extra renders.
      // If you've clicked the thumb a bit off-center, adding this back in the
      // mouse move handler prevents the thumb from jumping it's centerpoint
      // to your cursor position, which is a bit umpleasant visually.
      if (thumbRef.current) {
        const thumb = thumbRef.current.getBoundingClientRect()
        clickOffsetRef.current = [
          Math.round(thumb.left + thumb.width / 2 - e.clientX),
          Math.round(thumb.top + thumb.height / 2 - e.clientY),
        ]
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
          if (sliderAreaRef.current) {
            const [offsetX, offsetY] = clickOffsetRef.current
            const slider = sliderAreaRef.current.getBoundingClientRect()

            const thumbPosX = e.clientX - slider.left + offsetX
            const newX = (thumbPosX / slider.width) * rangeX + minX

            const thumbPosY = e.clientY - slider.top + offsetY
            const newY = rangeY - ((thumbPosY / slider.height) * rangeY + minY)

            if (onChange)
              onChange([
                clampX(allowFloat ? newX : roundToStep(newX)),
                clampY(allowFloat ? newY : roundToStep(newY)),
              ])
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
        rangeX,
        maxX,
        minX,
        rangeY,
        maxY,
        minY,
        step,
        id,
        sliderAreaRef,
        allowFloat,
        clampX,
        clampY,
        roundToStep,
        onChange,
        onDragEnd,
      ], // everything but the value
    )

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault()
        const sign = ['ArrowLeft', 'ArrowDown'].includes(e.key) ? -1 : 1

        let _step = step

        if (e.altKey && microStep) _step = step * microStep
        else if (e.shiftKey && macroStep) _step = step * macroStep

        const diff = _step * sign

        if (onChange) {
          if (['ArrowRight', 'ArrowLeft'].includes(e.key))
            onChange([clampX(x + diff), y])
          else {
            onChange([x, clampY(y + diff)])
          }
        }
      }
    }

    const renderProps: RenderPropsType = {
      hasFocus,
      hasKeyboardFocus,
      isDragging,
    }

    const _children = (() => {
      if (typeof children === 'function') return children(renderProps)
      if (children) return children
      return (
        <div
          className={classNames('SliderThumb2D__thumb', {
            'SliderThumb2D__thumb--has-keyboard-focus': hasKeyboardFocus,
          })}
        />
      )
    })()

    return (
      <div
        ref={mergeRefs([forwardedRef, thumbRef])}
        className="SliderThumb2D"
        tabIndex={0}
        /* eslint-disable-next-line jsx-a11y/role-has-required-aria-props */
        role="slider"
        aria-valuetext={`x is ${xy[0]} and y is ${xy[1]}`}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          setHasFocus(true)
          if (onFocus) onFocus()
        }}
        onBlur={() => {
          setHasFocus(false)
          if (onBlur) onBlur()
        }}
        style={{
          left: `${((clampX(x) - minX) / rangeX) * 100}%`,
          top: `${rangeY - ((clampX(y) - minY) / rangeY) * 100}%`,
        }}
      >
        {_children}
      </div>
    )
  },
)
