import { getColorData } from 'internal'
import React, { useEffect, useRef } from 'react'
import { getMaxChroma } from 'ThemeGenerator/utils'
import './CanvasGradientAttempt.scss'

export const CanvasGradientAttempt = ({
  hue,
  size = 2,
}: {
  hue: number
  size?: number
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    console.time('CanvasGradientAttempt')
    if (canvasRef.current) {
      canvasRef.current.height = 100 * size // px
      canvasRef.current.width = 150 * size //px
      const ctx = canvasRef.current.getContext('2d')

      if (ctx) {
        for (let L = 100 * size; L >= 0; L--) {
          const maxChroma = getMaxChroma(L / size, hue)
          const gradient = ctx.createLinearGradient(0, 0, maxChroma * size, 0)
          const yCoord = 100 * size - L
          gradient.addColorStop(0, getColorData(L / size, 0, hue).hex)
          gradient.addColorStop(1, getColorData(L / size, maxChroma, hue).hex)

          ctx.fillStyle = gradient
          ctx.fillRect(0, yCoord, maxChroma * size, size)
        }
      }
    }
    console.timeEnd('CanvasGradientAttempt')
  }, [hue, size])

  return (
    <div
      className="CanvasGradientAttempt"
      style={{ height: `${100 * size}px`, width: `${150 * size}px` }}
    >
      <canvas className="CanvasGradientAttempt__canvas" ref={canvasRef}>
        Your browser is not supported
      </canvas>
    </div>
  )
}
