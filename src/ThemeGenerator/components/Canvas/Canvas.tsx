import { useEffect, useRef, useState } from 'react'
import './Canvas.scss'
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CHROMA_CANVAS_SIZE_DIVISOR,
} from 'ThemeGenerator/constants'
import { ResponseMessageEvent } from './types'

let maskCache: Record<number, ImageBitmap | undefined> = {}
let chromaCache: Record<number, ImageBitmap | undefined> = {}

const maskWorker = new Worker(
  new URL('./web-workers/mask.worker', import.meta.url),
)

maskWorker.onmessage = ({ data }: ResponseMessageEvent) => {
  if (!maskCache[data.hue]) maskCache[data.hue] = data.bitmap
}

const chromaWorker = new Worker(
  new URL('./web-workers/chroma.worker', import.meta.url),
)
chromaWorker.onmessage = ({ data }: ResponseMessageEvent) => {
  if (!chromaCache[data.hue]) chromaCache[data.hue] = data.bitmap
}

export const Canvas = ({ hue }: { hue: number }) => {
  const hueRef = useRef(hue)
  hueRef.current = hue
  const [canvasContextMask, setCanvasContextMask] =
    useState<ImageBitmapRenderingContext>()

  const [canvasContextChroma, setCanvasContextChroma] =
    useState<ImageBitmapRenderingContext>()

  useEffect(() => {
    const requestMask = () => {
      if (hue !== hueRef.current) return

      const bitmap = maskCache[hue]
      if (!bitmap) {
        maskWorker.postMessage({ hue })
        requestAnimationFrame(requestMask)
      } else {
        createImageBitmap(bitmap).then((image) => {
          canvasContextMask?.transferFromImageBitmap(image)
        })
      }
    }
    requestMask()

    const requestChroma = () => {
      if (hue !== hueRef.current) return

      const bitmap = chromaCache[hue]
      if (!bitmap) {
        chromaWorker.postMessage({ hue })
        requestAnimationFrame(requestChroma)
      } else {
        createImageBitmap(bitmap).then((image) => {
          canvasContextChroma?.transferFromImageBitmap(image)
        })
      }
    }
    requestChroma()
  }, [canvasContextChroma, canvasContextMask, hue])

  return (
    <div
      className="Canvas"
      style={{ height: CANVAS_HEIGHT, width: CANVAS_WIDTH }}
    >
      <div>
        {/* Chroma Convas */}
        <canvas
          className="Canvas__canvas"
          height={CANVAS_HEIGHT / CHROMA_CANVAS_SIZE_DIVISOR}
          width={CANVAS_WIDTH / CHROMA_CANVAS_SIZE_DIVISOR}
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
      </div>
    </div>
  )
}
