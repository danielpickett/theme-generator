import React, { useEffect, useRef } from 'react'
import { size, reducedSize } from './sizeSetting'
import './Canvas.scss'

// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./worker'

export const Canvas = ({ hue }: { hue: number }) => {
  const maskWorkerRef = useRef<Worker | null>(null)
  const chromaWorkerRef = useRef<Worker | null>(null)
  const chromaCanvasRef = useRef<HTMLCanvasElement>(null)
  const maskCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!maskWorkerRef.current) {
      maskWorkerRef.current = new Worker()
    }
    return () => maskWorkerRef.current?.terminate()
  }, [])

  useEffect(() => {
    if (!chromaWorkerRef.current) {
      chromaWorkerRef.current = new Worker()
    }
    return () => chromaWorkerRef.current?.terminate()
  }, [])

  useEffect(() => {
    if (
      chromaCanvasRef.current &&
      maskCanvasRef.current &&
      maskWorkerRef.current &&
      chromaWorkerRef.current
    ) {
      // const maskWorker = maskWorkerRef.current
      const chromaWorker = chromaWorkerRef.current

      const chromaCtx = chromaCanvasRef.current.getContext('2d')
      if (chromaCtx) {
        chromaWorker.postMessage({
          type: 'updateHue',
          hue,
          requestTime: +new Date(),
        })
        chromaWorker.postMessage({
          type: 'getChroma',
          requestTime: +new Date(),
        })

        chromaWorker.onmessage = ({ data }) => {
          const reqTime = data.requestTime
          if (data.type === 'chromaBitmap') {
            chromaCtx.clearRect(0, 0, 150 * size, 100 * size)
            chromaCtx.drawImage(data.bitmap, 0, 0)
            console.log(`${+new Date() - reqTime}ms - painted onscreen canvas`)
          }
          if (data.type === 'hueStateUpdate') {
            chromaWorker.postMessage({
              type: 'getChroma',
              requestTime: +new Date(),
            })
          }
        }
      }

      // const maskCtx = maskCanvasRef.current.getContext('2d')
      // if (maskCtx) {
      //   maskWorker.postMessage({ type: 'mask', hue, requestTime: +new Date() })
      //   maskWorker.onmessage = (event) => {
      //     event.data.requestTime &&
      //       // console.log(
      //       //   `type: ${event.data.type}\ntime: ${
      //       //     +new Date() - event.data.requestTime
      //       //   }`
      //       // )
      //       maskCtx.clearRect(0, 0, 150 * size, 100 * size)
      //     event.data.bitmap && maskCtx.drawImage(event.data.bitmap, 0, 0)
      //   }
      // }
    }
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
          ref={chromaCanvasRef}
        >
          Your browser is not supported
        </canvas>
        <canvas
          height={100 * size}
          width={150 * size}
          className="Canvas__mask-canvas"
          ref={maskCanvasRef}
        >
          Your browser is not supported
        </canvas>
      </div>
      <br />
    </>
  )
}
