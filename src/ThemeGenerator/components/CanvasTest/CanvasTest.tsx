import { useEffect, useState } from 'react'
import './CanvasTest.scss'
import '../../../theme.css'
import {
  MAX_POSSIBLE_LUMINANCE,
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
} from 'ThemeGenerator/constants'
import { HueSlider } from '..'

const worker = new Worker(new URL('./worker', import.meta.url))
const size = 2

export const CanvasTest = () => {
  const [hue, setHue] = useState(0)
  const [canvasContext, setCanvasContext] =
    useState<ImageBitmapRenderingContext>()

  useEffect(() => {
    const handleMessage = ({ data: bitmap }: { data: ImageBitmap }) => {
      canvasContext?.transferFromImageBitmap(bitmap)
    }
    worker.addEventListener('message', handleMessage)
    return () => worker.removeEventListener('message', handleMessage)
  }, [canvasContext])

  const handleClick = () => {
    worker.postMessage(hue)
  }

  return (
    <div
      className="CanvasTest dark-blue-theme"
      style={{ position: 'relative' }}
    >
      <div>
        <canvas
          className="CanvasTest__canvas"
          height={MAX_POSSIBLE_LUMINANCE * size}
          width={MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size}
          ref={(canvasElement) => {
            if (canvasContext) return
            const ctx = canvasElement?.getContext('bitmaprenderer')
            if (ctx) setCanvasContext(ctx)
          }}
        >
          Your browser is not supported
        </canvas>
      </div>
      <button onClick={handleClick}>click</button>
      <div style={{ width: '30rem' }}>
        <HueSlider
          hue={hue}
          onHueChange={(newHue) => {
            setHue(newHue)
            worker.postMessage(newHue)
          }}
        />
      </div>
      <div>{hue}</div>
    </div>
  )
}
