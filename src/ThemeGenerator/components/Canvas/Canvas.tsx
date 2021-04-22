import React, { useCallback, useEffect, useRef, useState } from 'react'
import { size, smallSize } from './sizes'
import './Canvas.scss'
import Worker from 'worker-loader!./worker' // eslint-disable-line import/no-webpack-loader-syntax

export const Canvas = ({ hue }: { hue: number }) => {
  const [maskCanvasNode, setMaskCanvasNode] = useState<HTMLCanvasElement>()
  // CHROMA
  const chromaWorkerRef = useRef<Worker | null>(null)
  const initChromaWorker = useCallback((canvas: HTMLCanvasElement) => {
    setMaskCanvasNode(canvas)
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
    // maskWorkerRef.current?.postMessage({
    //   type: 'paintMask',
    //   hue,
    // })
  }, [hue])

  const logMousePosition = (
    canvas: HTMLCanvasElement,
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    let rect = canvas.getBoundingClientRect()

    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    console.log(
      'C: ' + (x / size).toFixed(1),
      'L: ' + (100 - y / size).toFixed(1)
    )
  }

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
          onMouseDown={(e) =>
            maskCanvasNode && logMousePosition(maskCanvasNode, e)
          }
        >
          Your browser is not supported
        </canvas>
      </div>
      <br />
    </>
  )
}
