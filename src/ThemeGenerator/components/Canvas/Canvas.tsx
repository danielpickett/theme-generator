import React, { useEffect, useRef } from 'react'
import {
  canvasBaseHeight,
  canvasBaseWidth,
  canvasSizeDivisor,
  // size,
} from './sizes'
import './Canvas.scss'
import Worker from 'worker-loader!./worker' // eslint-disable-line import/no-webpack-loader-syntax

export const Canvas = ({
  hue,
  sizeProp,
}: {
  hue: number
  sizeProp: number
}) => {
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
          size: sizeProp / canvasSizeDivisor,
        },
        [offscreen]
      )
    }
  }

  // MASK
  const maskWorkerRef = useRef<Worker | null>(null)
  const initMaskWorker = (canvas: HTMLCanvasElement) => {
    if (!maskWorkerRef.current) {
      // canvas.height = height / canvasSizeDivisor
      // canvas.width = width / canvasSizeDivisor
      const offscreen = canvas.transferControlToOffscreen()
      maskWorkerRef.current = new Worker()
      maskWorkerRef.current.postMessage(
        {
          type: 'initCanvas', // mask
          canvas: offscreen,
          size: sizeProp,
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
      size: sizeProp / canvasSizeDivisor,
    })
    maskWorkerRef.current?.postMessage({
      type: 'paintMask',
      hue,
      size: sizeProp,
    })
  })

  return (
    <>
      <div
        className="Canvas"
        style={{
          height: `${canvasBaseHeight * sizeProp}px`,
          width: `${canvasBaseWidth * sizeProp}px`,
        }}
      >
        <canvas
          // style={{ opacity: 0.5 }}
          className="Canvas__canvas"
          ref={initChromaWorker}
        >
          Your browser is not supported
        </canvas>
        <canvas
          // style={{ opacity: 0.5 }}
          className="Canvas__canvas"
          ref={initMaskWorker}
        >
          Your browser is not supported
        </canvas>
      </div>
    </>
  )
}
