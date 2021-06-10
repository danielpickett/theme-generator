import React, { useCallback, useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { hueAtom } from 'ThemeGenerator'
import { size, smallSize } from './sizes'
import './Canvas.scss'
import Worker from 'worker-loader!./worker' // eslint-disable-line import/no-webpack-loader-syntax

export const Canvas = ({ scaleName }: { scaleName: string }) => {
  const hue = useRecoilValue(hueAtom(scaleName))

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
        },
        [offscreen]
      )
    }
  }, [])

  // Terminate workers
  useEffect(
    () => () => {
      chromaWorkerRef.current?.terminate()
      maskWorkerRef.current?.terminate()
    },
    []
  )

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
        style={{ height: `${100 * size}px`, width: `${150 * size}px` }}
      >
        <canvas
          height={100 * smallSize}
          width={150 * smallSize}
          className="Canvas__canvas"
          ref={initChromaWorker}
        >
          Your browser is not supported
        </canvas>
        <canvas
          height={100 * size}
          width={150 * size}
          className="Canvas__canvas"
          ref={initMaskWorker}
        >
          Your browser is not supported
        </canvas>
      </div>
    </>
  )
}
