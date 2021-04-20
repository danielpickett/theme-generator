import React, { useCallback, useEffect, useRef } from 'react'
import { size, reducedSize } from './sizeSetting'
import './Canvas.scss'
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./worker'

export const Canvas = ({ hue }: { hue: number }) => {
  // CHROMA
  const chromaWorkerRef = useRef<Worker | null>(null)
  const initChromaWorker = useCallback((canvas: HTMLCanvasElement) => {
    if (!chromaWorkerRef.current) {
      const offscreenChroma = canvas.transferControlToOffscreen()
      chromaWorkerRef.current = new Worker()
      chromaWorkerRef.current.postMessage(
        {
          type: 'initOffscreenChromaCanvas',
          canvas: offscreenChroma,
        },
        [offscreenChroma]
      )
    }
  }, [])
  useEffect(() => () => chromaWorkerRef.current?.terminate(), [])

  // MASK
  // const maskCWorkerRef = useRef<Worker>(null)

  useEffect(() => {
    // console.log('requesting paint')
    chromaWorkerRef.current?.postMessage({
      type: 'paintChroma',
      hue,
      requestTime: +new Date(),
    })
  }, [hue])

  return (
    <>
      <div
        className="Canvas"
        style={{ height: `${100 * size}px`, width: `${150 * size}px` }}
      >
        <canvas
          height={100 * reducedSize}
          width={150 * reducedSize}
          className="Canvas__main-canvas"
          ref={initChromaWorker}
        >
          Your browser is not supported
        </canvas>
        {/* <canvas
          height={100 * size}
          width={150 * size}
          className="Canvas__main-canvas"
          ref={maskCanvasRef}
        >
          Your browser is not supported
        </canvas> */}
      </div>
      <br />
    </>
  )
}
