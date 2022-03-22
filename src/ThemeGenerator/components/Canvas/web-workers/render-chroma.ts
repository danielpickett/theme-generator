import {
  DEFAULT_CANVAS_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CHROMA_CANVAS_SIZE_DIVISOR,
} from 'ThemeGenerator/constants'
import { getColorData, parseYellowProblem } from 'ThemeGenerator/utils'
import { WorkerState } from '../types'

const REDUCED_DEFAULT_CANVAS_SIZE =
  DEFAULT_CANVAS_SIZE / CHROMA_CANVAS_SIZE_DIVISOR
const REDUCED_CANVAS_WIDTH = CANVAS_WIDTH / CHROMA_CANVAS_SIZE_DIVISOR
const REDUCED_CANVAS_HEIGHT = CANVAS_HEIGHT / CHROMA_CANVAS_SIZE_DIVISOR

export const renderChroma = (
  state: WorkerState,
  canvasContext: OffscreenCanvasRenderingContext2D,
) => {
  const { hue } = state

  canvasContext.clearRect(0, 0, REDUCED_CANVAS_WIDTH, REDUCED_CANVAS_HEIGHT)

  for (let luminance = REDUCED_CANVAS_HEIGHT; luminance >= 0; luminance--) {
    const yellowException = parseYellowProblem(
      luminance / REDUCED_DEFAULT_CANVAS_SIZE,
      hue,
    )
    for (let chroma = 0; chroma < REDUCED_CANVAS_WIDTH; chroma++) {
      const color = getColorData({
        l: luminance / REDUCED_DEFAULT_CANVAS_SIZE,
        c: chroma / REDUCED_DEFAULT_CANVAS_SIZE,
        h: hue,
      })

      canvasContext.fillStyle = color.hex
      if (!color.isClipped) {
        canvasContext.fillRect(chroma, REDUCED_CANVAS_HEIGHT - luminance, 1, 1)
      } else {
        // uncomment to see the yellow dip
        // canvasContext.fillStyle = 'black'
        // canvasContext.fillRect(chroma, REDUCED_CANVAS_HEIGHT - luminance, 1, 1)
        if (
          yellowException !== null &&
          chroma < yellowException * REDUCED_DEFAULT_CANVAS_SIZE
        ) {
          canvasContext.fillRect(
            chroma,
            REDUCED_CANVAS_HEIGHT - luminance,
            1,
            1,
          )
        } else {
          canvasContext.fillRect(
            chroma,
            REDUCED_CANVAS_HEIGHT - luminance,
            REDUCED_CANVAS_WIDTH - chroma,
            1,
          )
          break
        }
      }
    }
  }

  const bitmap = canvasContext.canvas.transferToImageBitmap()
  return bitmap
}
