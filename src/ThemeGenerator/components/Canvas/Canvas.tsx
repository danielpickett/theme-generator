import { useEffect, useState } from 'react'
import './Canvas.scss'
import '../../../theme.css'
import {
  MAX_POSSIBLE_LUMINANCE,
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
} from 'ThemeGenerator/constants'
import { OnBitmapResponseData, ResponseMessageEvent } from './types'

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

export const Canvas = ({
  hue,
  size,
  onBitmapResponse,
}: {
  hue: number
  size: number
  onBitmapResponse?: ({ type, hue, size }: OnBitmapResponseData) => void
}) => {
  const [canvasContextMask, setCanvasContextMask] =
    useState<ImageBitmapRenderingContext>()

  const [canvasContextChroma, setCanvasContextChroma] =
    useState<ImageBitmapRenderingContext>()

  // onMessage
  useEffect(() => {
    const handleMessageMask = ({ data }: ResponseMessageEvent) => {
      canvasContextMask?.transferFromImageBitmap(data.bitmap)
      onBitmapResponse?.({ type: 'mask', hue: data.hue, size: data.size })
    }
    maskWorker.addEventListener('message', handleMessageMask)

    const handleMessageChroma = ({ data }: ResponseMessageEvent) => {
      canvasContextChroma?.transferFromImageBitmap(data.bitmap)
      onBitmapResponse?.({ type: 'chroma', hue: data.hue, size: data.size })
    }
    chromaWorker.addEventListener('message', handleMessageChroma)

    return () => {
      maskWorker.removeEventListener('message', handleMessageMask)
      chromaWorker.removeEventListener('message', handleMessageChroma)
    }
  }, [canvasContextChroma, canvasContextMask, onBitmapResponse])

  // postMessage
  useEffect(() => {
    requestMaskBitmap(hue, size)
    requestChromaBitmap(hue, size)
  }, [hue, size, onBitmapResponse])

  const height = MAX_POSSIBLE_LUMINANCE * size
  const width = MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size

  return (
    <div className="Canvas" style={{ height, width }}>
      <div>
        {/* Chroma Convas */}
        <canvas
          className="Canvas__canvas"
          height={height}
          width={width}
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
          className="Canvas__canvas"
          height={height}
          width={width}
          ref={(canvasElement) => {
            if (canvasContextMask) return
            const ctx = canvasElement?.getContext('bitmaprenderer')
            if (ctx) setCanvasContextMask(ctx)
          }}
        >
          Your browser is not supported
        </canvas>
      </div>
    </div>
  )
}
