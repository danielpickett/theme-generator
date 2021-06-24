import React, { useRef } from 'react'
import {
  canvasBaseHeight,
  canvasBaseWidth,
  shadeNames,
  defaultLuminances,
} from 'ThemeGenerator/config'
import { ChromaSlider } from 'ThemeGenerator/components'

import './CanvasPointsOverlay.scss'

export const CanvasPointsOverlay = ({
  scaleName,
  size,
}: {
  scaleName: string
  size: number
}) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className="CanvasPointsOverlay"
      style={{
        height: `${canvasBaseHeight * size}px`,
        width: `${canvasBaseWidth * size}px`,
      }}
    >
      {shadeNames.slice(1).map((shadeName) => (
        <div
          key={shadeName}
          className="CanvasPointsOverlay__chroma-slider"
          style={{ bottom: defaultLuminances[shadeName] * size }}
        >
          <ChromaSlider shade={{ scaleName, shadeName }} />
        </div>
      ))}
    </div>
  )
}
