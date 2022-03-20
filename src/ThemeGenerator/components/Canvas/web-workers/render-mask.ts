import {
  DEFAULT_CANVAS_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from 'ThemeGenerator/constants'
import { getMaxChroma } from 'ThemeGenerator/utils'
import { WorkerState } from '../types'

export const renderMask = (
  state: WorkerState,
  canvas: OffscreenCanvas,
  canvasContext: OffscreenCanvasRenderingContext2D,
) => {
  const { hue } = state

  canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  for (let L = CANVAS_HEIGHT; L >= 0; L--) {
    const maxChroma = getMaxChroma(L / DEFAULT_CANVAS_SIZE, hue)

    canvasContext.fillStyle = 'rgba(255, 255, 255, 1)'
    canvasContext.fillRect(
      maxChroma * DEFAULT_CANVAS_SIZE,
      CANVAS_HEIGHT - L,
      CANVAS_WIDTH - maxChroma,
      1,
    )
  }

  state.hasRenderPending = false
  const bitmap = canvas.transferToImageBitmap()
  return bitmap
}
