import { getColorData } from 'internal'
import React, { useEffect, useRef } from 'react'
import { getMaxChroma } from 'ThemeGenerator/utils'
import './Canvas.scss'

export const Canvas = ({ hue, size = 2 }: { hue: number; size?: number }) => {
  const mainCanvasRef = useRef<HTMLCanvasElement>(null)
  const knockoutCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    console.time('Canvas')
    if (mainCanvasRef.current && knockoutCanvasRef.current) {
      const mainCtx = mainCanvasRef.current.getContext('2d')
      if (mainCtx) {
        const halfSize = size / 2
        for (let L = 100 * halfSize; L >= 0; L--) {
          for (let C = 0; C < 150 * halfSize; C++) {
            const color = getColorData(L / halfSize, C / halfSize, hue)
            if (!color.isClipped) {
              mainCtx.fillStyle = color.hex
              mainCtx.fillRect(C, 100 * halfSize - L, 1, 1)
            } else {
              mainCtx.fillRect(C, 100 * halfSize - L, 150 * halfSize - C, 1)
              break
            }
          }
        }
        mainCtx.fillStyle = 'white'
        mainCtx.fillRect(0, 0, size, size)
      }

      const knockoutCtx = knockoutCanvasRef.current.getContext('2d')
      if (knockoutCtx) {
        knockoutCtx.clearRect(0, 0, 150 * size, 100 * size)
        for (let L = 100 * size; L >= 0; L--) {
          const maxChroma = getMaxChroma(L / size, hue)
          knockoutCtx.fillStyle = 'rgba(255, 255, 255, 1)'
          knockoutCtx.fillRect(
            maxChroma * size,
            100 * size - L,
            150 * size - maxChroma,
            1
          )
        }
      }
    }
    console.timeEnd('Canvas')
  }, [hue, size])

  return (
    <div
      className="Canvas"
      style={{ height: `${100 * size}px`, width: `${150 * size}px` }}
    >
      <canvas
        height={100 * (size / 2)}
        width={150 * (size / 2)}
        className="Canvas__main-canvas"
        ref={mainCanvasRef}
      >
        Your browser is not supported
      </canvas>
      <canvas
        height={100 * size}
        width={150 * size}
        className="Canvas__knockout-canvas"
        ref={knockoutCanvasRef}
      >
        Your browser is not supported
      </canvas>
    </div>
  )
}
