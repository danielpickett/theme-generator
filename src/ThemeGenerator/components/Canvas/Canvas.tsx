import './Canvas.scss'
import { useEffect, useRef } from 'react'
import {
  MAX_POSSIBLE_LUMINANCE,
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
} from 'ThemeGenerator/constants'

const CHROMA_CANVAS_SIZE_DIVISOR = 2

export const Canvas = ({ hue, size }: { hue: number; size: number }) => {
  // CHROMA
  const chromaWorkerRef = useRef<Worker | null>(null)
  const initChromaWorker = (canvas: HTMLCanvasElement) => {
    if (!chromaWorkerRef.current) {
      const offscreen = canvas.transferControlToOffscreen()
      const worker = new Worker(new URL('./worker', import.meta.url))
      chromaWorkerRef.current = worker
      chromaWorkerRef.current.postMessage(
        {
          type: 'initCanvas', // chroma
          canvas: offscreen,
          size: size / CHROMA_CANVAS_SIZE_DIVISOR,
        },
        [offscreen],
      )
    }
  }

  // MASK
  const maskWorkerRef = useRef<Worker | null>(null)
  const initMaskWorker = (canvas: HTMLCanvasElement) => {
    if (!maskWorkerRef.current) {
      const offscreen = canvas.transferControlToOffscreen()
      const worker = new Worker(new URL('./worker', import.meta.url))
      maskWorkerRef.current = worker
      maskWorkerRef.current.postMessage(
        {
          type: 'initCanvas', // mask
          canvas: offscreen,
          size: size,
        },
        [offscreen],
      )
    }
  }

  useEffect(() => {
    return () => {
      chromaWorkerRef.current?.terminate()
      maskWorkerRef.current?.terminate()
    }
  }, [])

  useEffect(() => {
    chromaWorkerRef.current?.postMessage({
      type: 'paintChroma',
      hue,
      size: size / CHROMA_CANVAS_SIZE_DIVISOR,
    })
    maskWorkerRef.current?.postMessage({
      type: 'paintMask',
      hue,
      size: size,
    })
  })

  return (
    <>
      <div
        className="Canvas"
        style={{
          height: `${MAX_POSSIBLE_LUMINANCE * size}px`,
          width: `${MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size}px`,
        }}
      >
        <canvas className="Canvas__canvas" ref={initChromaWorker}>
          Your browser is not supported
        </canvas>
        <canvas className="Canvas__canvas" ref={initMaskWorker}>
          Your browser is not supported
        </canvas>
      </div>
    </>
  )
}
