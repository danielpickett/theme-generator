import React, { useEffect, useRef } from 'react'
import { size, reducedSize } from './sizeSetting'
import './Canvas.scss'

// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./worker'

const logTime = (time: number) => {
  const stars = `${'*'.repeat(50)}\n`
  const msg = 'painted onscreen canvas - synchronous'
  console.log(`${stars}${+new Date() - time}ms - ${msg}\n${stars}`)
}

export const Canvas = ({ hue }: { hue: number }) => {
  const chromaWorkerRef = useRef<Worker | null>(null)
  const chromaCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chromaWorkerRef.current) {
      chromaWorkerRef.current = new Worker()
    }
    return () => chromaWorkerRef.current?.terminate()
  }, [])

  useEffect(() => {
    if (chromaCanvasRef.current && chromaWorkerRef.current) {
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
            logTime(reqTime)
          }
        }
      }
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
      </div>
      <br />
    </>
  )
}
