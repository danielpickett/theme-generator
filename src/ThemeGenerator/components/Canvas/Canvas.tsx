import React, { useCallback, useEffect, useRef } from 'react'
import { size } from './sizes' // smallSize
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
        style={{ height: `${100 * sizeProp}px`, width: `${150 * sizeProp}px` }}
      >
        <canvas
          height={100 * smallSizeProp}
          width={150 * smallSizeProp}
          className="Canvas__canvas"
          ref={initChromaWorker}
        >
          Your browser is not supported
        </canvas>
        <canvas
          height={100 * sizeProp}
          width={150 * sizeProp}
          className="Canvas__canvas"
          ref={initMaskWorker}
        >
          Your browser is not supported
        </canvas>
      </div>
    </>
  )
}
