import React, { useRef } from 'react'
import { shadeNames, ChromaSlider, defaultLuminances } from 'ThemeGenerator'
import { canvasBaseHeight, canvasBaseWidth } from '../Canvas/sizes'
// import { size } from '../Canvas/sizes'
import './CanvasPointsOverlay.scss'

export const CanvasPointsOverlay = ({
  scaleName,
  sizeProp,
}: {
  scaleName: string
  sizeProp: number
}) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className="CanvasPointsOverlay"
      style={{
        height: `${canvasBaseHeight * sizeProp}px`,
        width: `${canvasBaseWidth * sizeProp}px`,
      }}
    >
      {shadeNames.slice(1).map((shadeName) => (
        <div
          key={shadeName}
          className="CanvasPointsOverlay__chroma-slider"
          style={{ bottom: defaultLuminances[shadeName] * sizeProp }}
        >
          <ChromaSlider shade={{ scaleName, shadeName }} />
        </div>
      ))}
    </div>
  )
}
