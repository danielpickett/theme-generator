import React, { useEffect, useRef } from 'react'
import { canvasBaseHeight, canvasBaseWidth } from 'ThemeGenerator'
import './Canvas.scss'
import Worker from 'worker-loader!./worker' // eslint-disable-line import/no-webpack-loader-syntax

const sizeDivisor = 2

export const Canvas = ({ hue, size }: { hue: number; size: number }) => {
  // CHROMA
  const chromaWorkerRef = useRef<Worker | null>(null)
  const initChromaWorker = (canvas: HTMLCanvasElement) => {
    if (!chromaWorkerRef.current) {
      const offscreen = canvas.transferControlToOffscreen()
      chromaWorkerRef.current = new Worker()
      chromaWorkerRef.current.postMessage(
        {
          type: 'initCanvas', // chroma
          canvas: offscreen,
          size: size / sizeDivisor,
        },
        [offscreen]
      )
    }
  }

  // MASK
  const maskWorkerRef = useRef<Worker | null>(null)
  const initMaskWorker = (canvas: HTMLCanvasElement) => {
    if (!maskWorkerRef.current) {
      const offscreen = canvas.transferControlToOffscreen()
      maskWorkerRef.current = new Worker()
      maskWorkerRef.current.postMessage(
        {
          type: 'initCanvas', // mask
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

  useEffect(() => {
    chromaWorkerRef.current?.postMessage({
      type: 'paintChroma',
      hue,
      size: size / sizeDivisor,
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
    </>
  )
}
