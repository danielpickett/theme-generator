import {
  DEFAULT_CANVAS_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from 'src/app-constants'
import { getMaxChroma } from 'src/utils'
import { WorkerState } from '../types'

export const renderMask = (
  state: WorkerState,
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
  const bitmap = canvasContext.canvas.transferToImageBitmap()
  return bitmap
}
