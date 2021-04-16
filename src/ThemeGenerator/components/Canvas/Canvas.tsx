import React, { useEffect, useRef, useState } from 'react'
import { size, reducedSize } from './sizeSetting'
import './Canvas.scss'

// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./worker'

export const Canvas = ({ hue }: { hue: number }) => {
  // CHROMA
  const chromaWorkerRef = useRef<Worker | null>(null)
  const chromaWorkerIdle = useRef<boolean>(true)
  const chromaCanvasRef = useRef<HTMLCanvasElement>(null)
  const [chromaBitmapHue, setChromaBitmapHue] = useState<number>()

  // CHROMA
  const maskCanvasRef = useRef<HTMLCanvasElement>(null)
  const [maskBitmapHue, setMaskBitmapHue] = useState<number>()
  const maskWorkerRef = useRef<Worker | null>(null)
  const maskWorkerIdle = useRef<boolean>(true)

  useEffect(() => () => chromaWorkerRef.current?.terminate(), [])
  useEffect(() => {
    if (!chromaWorkerRef.current) {
      chromaWorkerRef.current = new Worker()
      chromaWorkerRef.current.onmessage = ({ data }) => {
        // CHROMA
        if (data.type === 'chromaBitmap') {
          requestAnimationFrame(() => {
            chromaWorkerIdle.current = true
            setChromaBitmapHue(data.hue)

            chromaCanvasRef.current
              ?.getContext('2d')
              ?.clearRect(0, 0, 150 * reducedSize, 100 * reducedSize)
            chromaCanvasRef.current
              ?.getContext('2d')
              ?.drawImage(data.bitmap, 0, 0)

            const msg = `painted onscreen chroma canvas with hue ${data.hue}`
            console.log(`${+new Date() - data.requestTime}ms - ${msg}\n\n`)
          })
        }
      }
    }

    if (!maskWorkerRef.current) {
      maskWorkerRef.current = new Worker()
      maskWorkerRef.current.onmessage = ({ data }) => {
        // MASK
        if (data.type === 'maskBitmap') {
          requestAnimationFrame(() => {
            maskWorkerIdle.current = true
            setMaskBitmapHue(data.hue)

            maskCanvasRef.current
              ?.getContext('2d')
              ?.clearRect(0, 0, 150 * size, 100 * size)
            maskCanvasRef.current
              ?.getContext('2d')
              ?.drawImage(data.bitmap, 0, 0)

            const msg = `painted onscreen mask canvas with hue ${data.hue}`
            console.log(`${+new Date() - data.requestTime}ms - ${msg}\n\n`)
          })
        }
      }
    }

    // CHROMA
    if (chromaWorkerIdle.current && hue !== chromaBitmapHue) {
      chromaWorkerIdle.current = false
      chromaWorkerRef.current.postMessage({
        type: 'getChroma',
        hue,
        requestTime: +new Date(),
      })
    }

    // MASK
    if (maskWorkerIdle.current && hue !== maskBitmapHue) {
      maskWorkerIdle.current = false
      maskWorkerRef.current.postMessage({
        type: 'getMask',
        hue,
        requestTime: +new Date(),
      })
    }
  }, [hue, chromaBitmapHue, maskBitmapHue])

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
          className="Canvas__main-canvas"
          ref={maskCanvasRef}
        >
          Your browser is not supported
        </canvas>
      </div>
      <br />
    </>
  )
}
