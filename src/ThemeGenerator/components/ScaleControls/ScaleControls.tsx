import React from 'react'
import './ScaleControls.scss'
import { Canvas, HueSlider, CanvasPointsOverlay } from 'ThemeGenerator'

export const ScaleControls = ({ scaleName }: { scaleName: string }) => {
  return (
    <div className="ScaleControls">
      <div className="ScaleControls__canvas">
        <Canvas scaleName={scaleName} />
        <div className="ScaleControls__canvas-points-overlay">
          <CanvasPointsOverlay scaleName={scaleName} />
        </div>
      </div>
      <HueSlider scaleName={scaleName} />
    </div>
  )
}
