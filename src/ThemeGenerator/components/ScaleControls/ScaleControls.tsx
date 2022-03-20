import './ScaleControls.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
import { startTransition } from 'react'
import { canvasSizeAtom, hueAtom } from 'ThemeGenerator/state'
import {
  // CanvasOld,
  Canvas,
  CanvasPointsOverlay,
  HueSlider,
} from 'ThemeGenerator/components'

export const ScaleControls = ({ scaleName }: { scaleName: string }) => {
  const [hue, setHue] = useRecoilState(hueAtom(scaleName))
  const size = useRecoilValue(canvasSizeAtom)

  const handleHueChange = (newHue: number) => {
    requestAnimationFrame(() => {
      startTransition(() => setHue(newHue))
    })
  }

  return (
    <div className="ScaleControls">
      <div className="ScaleControls__canvas">
        <Canvas hue={hue} />

        <div className="ScaleControls__canvas-points-overlay">
          <CanvasPointsOverlay scaleName={scaleName} size={size} />
        </div>
      </div>
      <div className="ScaleControls__hue-slider">
        <div>{hue.toFixed(2)}</div>
        <HueSlider hue={hue} onHueChange={handleHueChange} />
      </div>
    </div>
  )
}
