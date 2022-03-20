import { useEffect, useState } from 'react'
import './Canvas.scss'
import '../../../theme.css'
import {
  MAX_POSSIBLE_LUMINANCE,
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
} from 'ThemeGenerator/constants'
import { ResponseMessageEvent } from './types'
import { useRecoilValue } from 'recoil'
import { canvasSizeAtom } from 'ThemeGenerator/state'

let maskCache: Record<number, ImageBitmap> = {}
let chromaCache: Record<number, ImageBitmap> = {}
let cacheBitmapSize: number | null = null

const invalidateCacheOnSizeChange = (size: number) => {
  if (size !== cacheBitmapSize) {
    console.log('invalidating caches')

    maskCache = {}
    chromaCache = {}
  }

  cacheBitmapSize = size
}

// @ts-ignore
window.maskCache = maskCache
// @ts-ignore
window.chromaCache = chromaCache

const maskWorker = new Worker(
  new URL('./web-workers/mask.worker', import.meta.url),
)
// maskWorker.onmessage = ({ data }: ResponseMessageEvent) => {
//   console.log('onmessage')
//   maskCache[data.hue] = data.bitmap
// }
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
  const size = useRecoilValue(canvasSizeAtom)
  invalidateCacheOnSizeChange(size)

  const [canvasContextMask, setCanvasContextMask] =
    useState<ImageBitmapRenderingContext>()

  const [canvasContextChroma, setCanvasContextChroma] =
    useState<ImageBitmapRenderingContext>()

  // onMessage
  useEffect(() => {
    // const handleMessageMask = ({ data }: ResponseMessageEvent) => {
    //   if (!maskCache[data.hue]) {
    //     maskCache[data.hue] = data.bitmap
    //   }
    //   const bitmap = maskCache[data.hue]
    //   console.log('bitmap', bitmap)
    //   canvasContextMask?.transferFromImageBitmap(bitmap)
    // }
    // maskWorker.addEventListener('message', handleMessageMask)

    const handleMessageMask = ({ data }: ResponseMessageEvent) => {
      if (!maskCache[data.hue]) {
        maskCache[data.hue] = data.bitmap
      }

      if (data.hue !== hue) return

      const bitmap = maskCache[data.hue]
      console.log({ bitmap })

      canvasContextMask?.transferFromImageBitmap(bitmap)
    }
    maskWorker.addEventListener('message', handleMessageMask)

    const handleMessageChroma = ({ data }: ResponseMessageEvent) => {
      if (!chromaCache[data.hue]) {
        chromaCache[data.hue] = data.bitmap
      }

      if (data.hue !== hue) return

      const bitmap = chromaCache[data.hue]
      console.log({ bitmap })

      canvasContextChroma?.transferFromImageBitmap(bitmap)
    }
    chromaWorker.addEventListener('message', handleMessageChroma)

    return () => {
      // maskWorker.removeEventListener('message', handleMessageMask)
      chromaWorker.removeEventListener('message', handleMessageChroma)
    }
  }, [canvasContextChroma, canvasContextMask, hue])

  useEffect(() => {
    requestMaskBitmap(hue, size)
    requestChromaBitmap(hue, size)
  }, [hue, size])

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
