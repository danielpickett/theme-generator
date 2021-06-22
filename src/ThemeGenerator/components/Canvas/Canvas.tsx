import React, { useCallback, useEffect, useRef } from 'react'
import { canvasBaseHeight, canvasBaseWidth } from './sizes' // size, smallSize
import './Canvas.scss'
import Worker from 'worker-loader!./worker' // eslint-disable-line import/no-webpack-loader-syntax

export const Canvas = ({
  hue,
  sizeProp,
}: {
  hue: number
  sizeProp: number
}) => {
  const smallSizeProp = sizeProp / 2
  // CHROMA
  const chromaWorkerRef = useRef<Worker | null>(null)
  const initChromaWorker = useCallback((canvas: HTMLCanvasElement) => {
    if (!chromaWorkerRef.current) {
      const offscreen = canvas.transferControlToOffscreen()
      chromaWorkerRef.current = new Worker()
      chromaWorkerRef.current.postMessage(
        {
          type: 'initCanvas',
          canvas: offscreen,
          size: sizeProp,
        },
        [offscreen]
      )
    }
  }, [])

  // MASK
  const maskWorkerRef = useRef<Worker | null>(null)
  const initMaskWorker = useCallback((canvas: HTMLCanvasElement) => {
    if (!maskWorkerRef.current) {
      const offscreen = canvas.transferControlToOffscreen()
      maskWorkerRef.current = new Worker()
      maskWorkerRef.current.postMessage(
        {
          type: 'initCanvas',
          canvas: offscreen,
          size: sizeProp,
        },
        [offscreen]
      )
    }
  }, [])

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
    })
    maskWorkerRef.current?.postMessage({
      type: 'paintMask',
      hue,
    })
  }, [hue])

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
          height={canvasBaseHeight * smallSizeProp}
          width={canvasBaseWidth * smallSizeProp}
          className="Canvas__canvas"
          ref={initChromaWorker}
        >
          Your browser is not supported
        </canvas>
        <canvas
          height={canvasBaseHeight * sizeProp}
          width={canvasBaseWidth * sizeProp}
          className="Canvas__canvas"
          ref={initMaskWorker}
        >
          Your browser is not supported
        </canvas>
      </div>
    </>
  )
}
