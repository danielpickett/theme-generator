import React, { ReactNode, useRef } from 'react'
import {
  maxPossibleChromaForAnyHue,
  maxPossibleLuminance,
} from 'ThemeGenerator/config'
import { LCHObjType } from 'ThemeGenerator/types'
import { clamp } from 'ThemeGenerator/utils'
import './MovableColorDot.scss'

const clampL = (l: number) => clamp(l, maxPossibleLuminance, 0)
const clampC = (c: number) => clamp(c, maxPossibleChromaForAnyHue, 0)

export const MovableColorDot = ({
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
  children: ReactNode
}) => {
  const clickOriginRef = useRef({ x: 0, y: 0 })

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

  return (
    <div
      className="MovableColorDot"
      style={{ left: color.c * size, bottom: color.l * size }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  )
}
