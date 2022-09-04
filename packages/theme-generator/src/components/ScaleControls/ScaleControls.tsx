import './ScaleControls.scss'
import { useRecoilState } from 'recoil'
import { startTransition } from 'react'
import { hueAtom } from 'src/state'
import { Canvas, CanvasPointsOverlay, HueSlider } from 'src/components'

export const ScaleControls = ({ scaleName }: { scaleName: string }) => {
  const [hue, setHue] = useRecoilState(hueAtom(scaleName))

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
          <CanvasPointsOverlay scaleName={scaleName} />
        </div>
      </div>
      <div className="ScaleControls__hue-slider">
        <div>{hue.toFixed(2)}</div>
        <HueSlider hue={hue} onHueChange={handleHueChange} />
      </div>
    </div>
  )
}
