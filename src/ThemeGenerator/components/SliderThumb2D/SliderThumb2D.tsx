import React, { ReactNode, useRef } from 'react'
import {
  maxPossibleChromaForAnyHue,
  maxPossibleLuminance,
} from 'ThemeGenerator/config'
import { LCHObjType } from 'ThemeGenerator/types'
import { useKeyboardFocus } from 'ThemeGenerator/hooks'
import { clamp } from 'ThemeGenerator/utils'
import './SliderThumb2D.scss'

const clampL = (l: number) => clamp(l, maxPossibleLuminance, 0)
const clampC = (c: number) => clamp(c, maxPossibleChromaForAnyHue, 0)

export const SliderThumb2D = ({
  color,
  size,
  onColorChange,
  sliderAreaRef,
  children,
}: {
  color: LCHObjType
  size: number
  onColorChange: (color: LCHObjType) => void
  sliderAreaRef:
    | React.RefObject<HTMLDivElement>
    | React.MutableRefObject<HTMLDivElement>
  children: ((hasKeyboardFocus: boolean) => ReactNode) | ReactNode
}) => {
  const clickOriginRef = useRef({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)
  const hasKeyboardFocus = useKeyboardFocus(ref)

  const handleMouseMove = (e: MouseEvent) => {
    if (sliderAreaRef.current) {
      const rect = sliderAreaRef.current.getBoundingClientRect()
      const l = clampL((rect.bottom - e.clientY) / size)
      const c = clampC((e.clientX - rect.left) / size)
      requestAnimationFrame(() => onColorChange({ l, c, h: color.h }))
    }
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    clickOriginRef.current = { x: e.clientX, y: e.clientY }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp, { once: true })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { altKey, shiftKey, key } = e
    const { l, c } = color

    let move = 1
    if (altKey === true) move = 0.1
    if (shiftKey === true) move = 5

    if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].includes(key))
      e.preventDefault()

    if (key === 'ArrowUp') onColorChange({ ...color, l: clampL(l + move) })
    if (key === 'ArrowDown') onColorChange({ ...color, l: clampL(l - move) })
    if (key === 'ArrowRight') onColorChange({ ...color, c: clampC(c + move) })
    if (key === 'ArrowLeft') onColorChange({ ...color, c: clampC(c - move) })
  }

  return (
    <div
      className="SliderThumb2D"
      style={{ left: color.c * size, bottom: color.l * size }}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      ref={ref}
    >
      {typeof children === 'function' ? children(hasKeyboardFocus) : children}
    </div>
  )
}
