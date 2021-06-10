import React, { CSSProperties } from 'react'
import './SliderBarFill.scss'

export const SliderBarFill = ({
  left,
  width,
  style,
}: {
  left?: string
  width: string
  style?: CSSProperties
}) => {
  return (
    <div
      className="SliderBarFill"
      style={{
        left,
        width,
        ...style,
      }}
    />
  )
}
