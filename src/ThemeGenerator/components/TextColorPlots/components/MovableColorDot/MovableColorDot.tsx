import { EFAULT } from 'constants'
import React, { useRef } from 'react'
import { useEffect } from 'react'
import { LCHObjType } from 'ThemeGenerator/types'
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
    if (colorRef.current) {
      const x = e.movementX
      const y = e.movementY

      let { l, c, h } = colorRef.current
      l = colorRef.current.l + (e.movementY / size) * -1
      c = colorRef.current.c + e.movementX / size

      onColorChange({ l, c, h })
    }
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
