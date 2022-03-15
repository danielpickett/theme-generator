import { useEffect, useState } from 'react'
import './CanvasTest.scss'
import '../../../theme.css'
import {
  MAX_POSSIBLE_LUMINANCE,
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
  DEFAULT_CANVAS_SIZE,
} from 'ThemeGenerator/constants'
import { HueSlider } from '..'
import { ResponseMessageEvent } from './web-workers/types'

const maskWorker = new Worker(
  new URL('./web-workers/mask.worker', import.meta.url),
)
const requestMaskBitmap = (hue: number, size: number) => {
  maskWorker.postMessage({ hue, size })
}

const chromaWorker = new Worker(
  new URL('./web-workers/chroma.worker', import.meta.url),
)
const requestChromaBitmap = (hue: number, size: number) => {
  chromaWorker.postMessage({ hue, size })
}

const size = DEFAULT_CANVAS_SIZE

export const CanvasTest = () => {
  const [hue, setHue] = useState(0)
  const [canvasContextMask, setCanvasContextMask] =
    useState<ImageBitmapRenderingContext>()

  const [canvasContextChroma, setCanvasContextChroma] =
    useState<ImageBitmapRenderingContext>()

  useEffect(() => {
    const handleMessageMask = ({ data }: ResponseMessageEvent) =>
      canvasContextMask?.transferFromImageBitmap(data.bitmap)
    maskWorker.addEventListener('message', handleMessageMask)

    const handleMessageChroma = ({ data }: ResponseMessageEvent) =>
      canvasContextChroma?.transferFromImageBitmap(data.bitmap)
    chromaWorker.addEventListener('message', handleMessageChroma)

    return () => {
      maskWorker.removeEventListener('message', handleMessageMask)
      chromaWorker.removeEventListener('message', handleMessageChroma)
    }
  }, [canvasContextChroma, canvasContextMask])

  const handleClick = () => {
    requestMaskBitmap(hue, size)
    requestChromaBitmap(hue, size)
  }

  return (
    <div className="CanvasTest dark-blue-theme">
      <div>
        {/* Chroma Convas */}
        <canvas
          className="CanvasTest__canvas"
          height={MAX_POSSIBLE_LUMINANCE * size}
          width={MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size}
          ref={(canvasElement) => {
            if (canvasContextChroma) return
            const ctx = canvasElement?.getContext('bitmaprenderer')
            if (ctx) setCanvasContextChroma(ctx)
          }}
        >
          Your browser is not supported
        </canvas>

        {/* Mask Convas */}
        <canvas
          className="CanvasTest__canvas"
          height={MAX_POSSIBLE_LUMINANCE * size}
          width={MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size}
          ref={(canvasElement) => {
            if (canvasContextMask) return
            const ctx = canvasElement?.getContext('bitmaprenderer')
            if (ctx) setCanvasContextMask(ctx)
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
            requestMaskBitmap(newHue, size)
            requestChromaBitmap(newHue, size)
          }}
        />
      </div>
      <div>{hue}</div>
    </div>
  )
}
