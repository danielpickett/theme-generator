import React, { ReactElement, useRef } from 'react'
import { Expand } from 'ThemeGenerator/types'
import { SliderBar } from '../SliderBar'
import './SliderTrack.scss'

type RenderPropsType = {
  sliderTrackRef: React.RefObject<HTMLDivElement>
  valueToPercent: (value: number) => number
  range: number
}

export const SliderTrack = ({
  min,
  max,
  children,
  bar,
}: {
  min: number
  max: number
  children: (renderProps: Expand<RenderPropsType>) => ReactElement
  bar?: (renderProps: Expand<RenderPropsType>) => ReactElement
}) => {
  const sliderTrackRef = useRef<HTMLDivElement>(null)
  const range = max - min

  const valueToPercent = (value: number) => {
    const clamp = (n: number) => Math.max(Math.min(n, max), min)
    return ((clamp(value) - min) / range) * 100
  }

  const renderProps: RenderPropsType = {
    sliderTrackRef,
    valueToPercent,
    range,
  }

  return (
    <div className="SliderTrack" ref={sliderTrackRef}>
      {bar ? bar(renderProps) : <SliderBar />}
      {children(renderProps)}
    </div>
  )
}
