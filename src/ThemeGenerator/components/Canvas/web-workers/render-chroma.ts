import {
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
  MAX_POSSIBLE_LUMINANCE,
} from 'ThemeGenerator/constants'
import { getColorData, parseYellowProblem } from 'ThemeGenerator/utils'
import { WorkerState } from '../types'

export const renderChroma = (
  state: WorkerState,
  canvas: OffscreenCanvas,
  canvasContext: OffscreenCanvasRenderingContext2D,
) => {
  const { size, hue } = state
  const width = MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size
  const height = MAX_POSSIBLE_LUMINANCE * size

  canvasContext.clearRect(0, 0, width, height)

  for (let luminance = height; luminance >= 0; luminance--) {
    const yellowException = parseYellowProblem(luminance / size, hue)
    for (let chroma = 0; chroma < width; chroma++) {
      const color = getColorData({
        l: luminance / size,
        c: chroma / size,
        h: hue,
      })

      canvasContext.fillStyle = color.hex
      if (!color.isClipped) {
        canvasContext.fillRect(chroma, height - luminance, 1, 1)
      } else {
        // uncomment to see the yellow dip
        // canvasContext.fillStyle = 'black'
        // canvasContext.fillRect(C, height - L, 1, 1)
        if (yellowException !== null && chroma < yellowException * size) {
          canvasContext.fillRect(chroma, height - luminance, 1, 1)
        } else {
          canvasContext.fillRect(chroma, height - luminance, width - chroma, 1)
          break
        }
      }
    }
  }

  const bitmap = canvas.transferToImageBitmap()
  return bitmap
}
