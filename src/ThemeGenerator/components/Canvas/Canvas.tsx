import React, { useEffect, useRef } from 'react'
import { canvasBaseHeight, canvasBaseWidth, canvasSizeDivisor } from './sizes' // size, smallSize
import './Canvas.scss'
import Worker from 'worker-loader!./worker' // eslint-disable-line import/no-webpack-loader-syntax

export const Canvas = ({ hue, size }: { hue: number; size: number }) => {
  const width = canvasBaseWidth * size
  const height = canvasBaseHeight * size
  // CHROMA
  const chromaWorkerRef = useRef<Worker | null>(null)
  const initChromaWorker = (canvas: HTMLCanvasElement) => {
    if (!chromaWorkerRef.current) {
      canvas.height = height / canvasSizeDivisor
      canvas.width = width / canvasSizeDivisor
      const offscreen = canvas.transferControlToOffscreen()
      chromaWorkerRef.current = new Worker()
      chromaWorkerRef.current.postMessage(
        {
          type: 'initCanvas',
          canvas: offscreen,
          size: size / canvasSizeDivisor,
        },
        [offscreen]
      )
    }
  }

  // MASK
  const maskWorkerRef = useRef<Worker | null>(null)
  const initMaskWorker = (canvas: HTMLCanvasElement) => {
    if (!maskWorkerRef.current) {
      canvas.height = height
      canvas.width = width
      const offscreen = canvas.transferControlToOffscreen()

      maskWorkerRef.current = new Worker()
      maskWorkerRef.current.postMessage(
        {
          type: 'initCanvas',
          canvas: offscreen,
          size: size,
        },
        [offscreen]
      )
    }
  }

  useEffect(() => {
    return () => {
      chromaWorkerRef.current?.terminate()
      maskWorkerRef.current?.terminate()
    }
  }, [])

  const updateCanvases = () => {
    chromaWorkerRef.current?.postMessage({
      type: 'paintChroma',
      hue,
      size: size / canvasSizeDivisor,
    })
    maskWorkerRef.current?.postMessage({
      type: 'paintMask',
      hue,
      size: size,
    })
  }

  useEffect(() => {
    updateCanvases()
  })

  return (
    <div
      className="Canvas"
      style={{
        height: `${canvasBaseHeight * size}px`,
        width: `${canvasBaseWidth * size}px`,
      }}
    >
      <canvas className="Canvas__canvas" ref={initChromaWorker}>
        Your browser is not supported
      </canvas>
      <canvas className="Canvas__canvas" ref={initMaskWorker}>
        Your browser is not supported
      </canvas>
    </div>
  )
}
