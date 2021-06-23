import React from 'react'
import './ScaleControls.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  Canvas,
  HueSlider,
  CanvasPointsOverlay,
  hueAtom,
  canvasSizeAtom,
  showCanvasesAtom,
} from 'ThemeGenerator'

export const ScaleControls = ({ scaleName }: { scaleName: string }) => {
  const [hue, setHue] = useRecoilState(hueAtom(scaleName))
  const canvasSize = useRecoilValue(canvasSizeAtom)
  const showCanvases = useRecoilValue(showCanvasesAtom)

  const handleHueChange = (newHue: number) => {
    requestAnimationFrame(() => setHue(newHue))
  }

  return showCanvases ? (
    <div className="ScaleControls">
      <div className="ScaleControls__canvas">
        <Canvas hue={hue} size={canvasSize} />
        <div className="ScaleControls__canvas-points-overlay">
          <CanvasPointsOverlay scaleName={scaleName} sizeProp={canvasSize} />
        </div>
      </div>
      <div className="ScaleControls__hue-slider">
        <div>{hue.toFixed(2)}</div>
        <HueSlider hue={hue} onHueChange={handleHueChange} />
      </div>
    </div>
  ) : null
}
