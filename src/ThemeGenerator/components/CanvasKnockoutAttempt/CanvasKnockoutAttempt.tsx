import { getColorData } from 'internal'
import React, { useEffect, useRef } from 'react'
import './CanvasKnockoutAttempt.scss'

export const CanvasKnockoutAttempt = ({
  hue,
  size = 2,
}: {
  hue: number
  size?: number
}) => {
  const mainCanvasRef = useRef<HTMLCanvasElement>(null)
  const knockoutCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    console.time('Canvas')
    if (mainCanvasRef.current && knockoutCanvasRef.current) {
      // mainCanvasRef.current.height = 100 * size // px
      // mainCanvasRef.current.width = 150 * size //px

      const mainCtx = mainCanvasRef.current.getContext('2d')
      const knockoutCtx = knockoutCanvasRef.current.getContext('2d')

      if (mainCtx && knockoutCtx) {
        mainCtx.clearRect(0, 0, 150 * size, 100 * size)
        knockoutCtx.clearRect(0, 0, 150 * size, 100 * size)
        for (let L = 100 * size; L >= 0; L--) {
          for (let C = 0; C < 150 * size; C++) {
            const color = getColorData(L / size, C / size, hue)
            if (!color.isClipped) {
              mainCtx.fillStyle = color.hex
              mainCtx.fillRect(C, 100 * size - L, 1, 1)
            } else {
              mainCtx.fillStyle = 'blue'
              mainCtx.fillRect(C, 100 * size - L, 150 * size - C, 1)
              knockoutCtx.fillStyle = 'white'
              // knockoutCtx.fillRect(C, 100 * size - L, 150 * size - C, 1)
              break
            }
          }
        }
      }
    }
    console.timeEnd('Canvas')
  }, [hue, size])

  return (
    <div
      className="CanvasKnockoutAttempt"
      style={{ height: `${100 * size}px`, width: `${150 * size}px` }}
    >
      <canvas
        height={100 * size}
        width={150 * size}
        className="CanvasKnockoutAttempt__main-canvas"
        ref={mainCanvasRef}
      >
        Your browser is not supported
      </canvas>
      <canvas
        height={100 * size}
        width={150 * size}
        className="CanvasKnockoutAttempt__knockout-canvas"
        ref={knockoutCanvasRef}
      >
        Your browser is not supported
      </canvas>
    </div>
  )
}
