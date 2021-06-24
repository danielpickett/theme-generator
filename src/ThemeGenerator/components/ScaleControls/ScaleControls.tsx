import React from 'react'
import './ScaleControls.scss'
import { useRecoilState } from 'recoil'

import { Canvas, HueSlider, CanvasPointsOverlay, hueAtom } from 'ThemeGenerator'

export const ScaleControls = ({ scaleName }: { scaleName: string }) => {
  const [hue, setHue] = useRecoilState(hueAtom(scaleName))

  const handleHueChange = (newHue: number) => {
    requestAnimationFrame(() => setHue(newHue))
  }

  return (
    <div className="ScaleControls">
      <div className="ScaleControls__canvas">
        <Canvas hue={hue} sizeProp={2} />
        <div className="ScaleControls__canvas-points-overlay">
          <CanvasPointsOverlay scaleName={scaleName} sizeProp={2} />
        </div>
      </div>
      <div className="ScaleControls__hue-slider">
        <div>{hue.toFixed(2)}</div>
        <HueSlider hue={hue} onHueChange={handleHueChange} />
      </div>
    </div>
  )
}
