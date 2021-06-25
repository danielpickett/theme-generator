import React, { useRef } from 'react'
import {
  maxPossibleChromaForAnyHue,
  maxPossibleLuminance,
} from 'ThemeGenerator/config'
import { LCHObjType } from 'ThemeGenerator/types'
import { clamp } from 'ThemeGenerator/utils'
import './MovableColorDot.scss'

export const MovableColorDot = ({
  color,
  size,
  onColorChange,
}: {
  color: LCHObjType
  size: number
  onColorChange: (color: LCHObjType) => void
}) => {
  const colorRef = useRef<LCHObjType>(color)
  colorRef.current.l = color.l
  colorRef.current.c = color.c
  colorRef.current.h = color.h

  const handleMouseMove = (e: MouseEvent) => {
    // TODO: using e.movement means it gets weird when you
    // move the mouse paste the edge a ways and then back again.
    const l = clamp(
      colorRef.current.l + (e.movementY / size) * -1,
      maxPossibleLuminance,
      0
    )
    const c = clamp(
      colorRef.current.c + e.movementX / size,
      maxPossibleChromaForAnyHue,
      0
    )
    onColorChange({ l, c, h: colorRef.current.h })
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
  }

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp, { once: true })
  }

  return (
    <div
      className="MovableColorDot"
      style={{ left: color.c * size, bottom: color.l * size }}
      onMouseDown={handleMouseDown}
    />
  )
}
