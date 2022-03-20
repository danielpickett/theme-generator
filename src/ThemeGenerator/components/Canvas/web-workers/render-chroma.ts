import {
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
  MAX_POSSIBLE_LUMINANCE,
  DEFAULT_CANVAS_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from 'ThemeGenerator/constants'
import { getColorData, parseYellowProblem } from 'ThemeGenerator/utils'
import { WorkerState } from '../types'

export const renderChroma = (
  state: WorkerState,
  canvas: OffscreenCanvas,
  canvasContext: OffscreenCanvasRenderingContext2D,
) => {
  const { hue } = state

  canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  for (let luminance = CANVAS_HEIGHT; luminance >= 0; luminance--) {
    const yellowException = parseYellowProblem(
      luminance / DEFAULT_CANVAS_SIZE,
      hue,
    )
    for (let chroma = 0; chroma < CANVAS_WIDTH; chroma++) {
      const color = getColorData({
        l: luminance / DEFAULT_CANVAS_SIZE,
        c: chroma / DEFAULT_CANVAS_SIZE,
        h: hue,
      })

      canvasContext.fillStyle = color.hex
      if (!color.isClipped) {
        canvasContext.fillRect(chroma, CANVAS_HEIGHT - luminance, 1, 1)
      } else {
        // uncomment to see the yellow dip
        // canvasContext.fillStyle = 'black'
        // canvasContext.fillRect(C, height - L, 1, 1)
        if (
          yellowException !== null &&
          chroma < yellowException * DEFAULT_CANVAS_SIZE
        ) {
          canvasContext.fillRect(chroma, CANVAS_HEIGHT - luminance, 1, 1)
        } else {
          canvasContext.fillRect(
            chroma,
            CANVAS_HEIGHT - luminance,
            CANVAS_WIDTH - chroma,
            1,
          )
          break
        }
      }
    }
  }

  const bitmap = canvas.transferToImageBitmap()
  return bitmap
}
