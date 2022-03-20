import {
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
  MAX_POSSIBLE_LUMINANCE,
} from 'ThemeGenerator/constants'
import { getMaxChroma } from 'ThemeGenerator/utils'
import { WorkerState } from '../types'

export const renderMask = (
  state: WorkerState,
  canvas: OffscreenCanvas,
  canvasContext: OffscreenCanvasRenderingContext2D,
) => {
  const { hue, size } = state
  const width = MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size
  const height = MAX_POSSIBLE_LUMINANCE * size

  canvasContext.clearRect(0, 0, width, height)

  for (let L = height; L >= 0; L--) {
    const maxChroma = getMaxChroma(L / size, hue)

    canvasContext.fillStyle = 'rgba(255, 255, 255, 1)'
    canvasContext.fillRect(
      maxChroma * size,
      MAX_POSSIBLE_LUMINANCE * size - L,
      MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size - maxChroma,
      1,
    )
  }

  state.hasRenderPending = false
  const bitmap = canvas.transferToImageBitmap()
  // console.log({ bitmap })
  return bitmap
}
