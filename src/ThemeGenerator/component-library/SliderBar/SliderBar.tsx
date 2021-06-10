import React, { ReactNode, CSSProperties } from 'react'
import { defaultTrackBarHeightInRem } from '..'
import './SliderBar.scss'

export const SliderBar = ({
  children,
  style,
}: {
  children?: ReactNode
  style?: CSSProperties
}) => {
  return (
    <div
      className="SliderBar"
      style={{ height: `${defaultTrackBarHeightInRem}rem`, ...style }}
    >
      {children}
    </div>
  )
}
