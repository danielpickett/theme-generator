import { useEffect, useState } from 'react'
import './Canvas.scss'
import '../../../theme.css'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'ThemeGenerator/constants'
import { ResponseMessageEvent } from './types'

let maskCache: Record<number, ImageBitmap> = {}
let chromaCache: Record<number, ImageBitmap> = {}

// @ts-ignore
window.maskCache = maskCache
// @ts-ignore
window.chromaCache = chromaCache

const maskWorker = new Worker(
  new URL('./web-workers/mask.worker', import.meta.url),
)
const updateMaskCache = (hue: number, bitmap: ImageBitmap) => {
  maskCache[hue] = bitmap
}
maskWorker.onmessage = ({ data }: ResponseMessageEvent) => {
  console.log('onmessage')
  maskCache[data.hue] = data.bitmap
}
const requestMaskBitmap = (hue: number, size: number) => {
  maskWorker.postMessage({ hue, size })
}

const chromaWorker = new Worker(
  new URL('./web-workers/chroma.worker', import.meta.url),
)
// chromaWorker.onmessage = ({ data }: ResponseMessageEvent) => {
//   chromaCache[data.hue] = data.bitmap
// }
const requestChromaBitmap = (hue: number, size: number) => {
  chromaWorker.postMessage({ hue, size })
}

export const Canvas = ({ hue }: { hue: number }) => {
  const [canvasContextMask, setCanvasContextMask] =
    useState<ImageBitmapRenderingContext>()

  const [canvasContextChroma, setCanvasContextChroma] =
    useState<ImageBitmapRenderingContext>()

  return (
    <div
      className="Canvas"
      style={{ height: CANVAS_HEIGHT, width: CANVAS_WIDTH }}
    >
      <div>
        {/* Chroma Convas */}
        <canvas
          className="Canvas__canvas"
          height={CANVAS_HEIGHT}
          width={CANVAS_WIDTH}
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
          height={CANVAS_HEIGHT}
          width={CANVAS_WIDTH}
          ref={(canvasElement) => {
            if (canvasContextMask) return
            const ctx = canvasElement?.getContext('bitmaprenderer')
            if (ctx) setCanvasContextMask(ctx)
          }}
        >
          Your browser is not supported
        </canvas>
        <button
          style={{ zIndex: 1, position: 'relative' }}
          onClick={() => {
            console.log('maskCache', maskCache)
            console.log('chromaCache', chromaCache)
          }}
        >
          cache
        </button>
      </div>
    </div>
  )
}
