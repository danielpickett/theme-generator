import { getColorData } from 'internal'
import React, { useEffect, useRef } from 'react'
import './Canvas.scss'

export const Canvas = ({ hue, size = 2 }: { hue: number; size?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    console.time('Canvas')
    if (canvasRef.current) {
      canvasRef.current.height = 100 * size // px
      canvasRef.current.width = 150 * size //px

      const canvasContext = canvasRef.current.getContext('2d')
      if (canvasContext) {
        const image = canvasContext.createImageData(1500, 1)
        for (let L = 100 * size; L >= 0; L--) {
          for (let C = 0; C < 150 * size; C++) {
            const color = getColorData(L / size, C / size, hue)
            if (!color.isClipped) {
              image.data[C * 4 + 0] = color.rgb[0]
              image.data[C * 4 + 1] = color.rgb[1]
              image.data[C * 4 + 2] = color.rgb[2]
              image.data[C * 4 + 3] = 255
            } else {
              image.data[C * 4 + 3] = 0
            }
          }
          canvasContext.putImageData(image, 0, 100 * size - L)
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
      <canvas className="Canvas__canvas" ref={canvasRef}>
        Your browser is not supported
      </canvas>
    </div>
  )
}
