import { WorkerContext } from '../types'
import { createCanvas, getInitialState } from './utils'
import { renderChroma } from './render-chroma'
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CHROMA_CANVAS_SIZE_DIVISOR,
} from 'src/constants'

/**
 * Chroma canvas is painted at a reduced size to make it faster,
 * then it gets upscaled when painted to the canvas in the DOM.
 * This results in a 'blurry' final onscreen image, which is
 * unnoticeable since it's a soft gradient anyway.
 */
const REDUCED_CANVAS_WIDTH = CANVAS_WIDTH / CHROMA_CANVAS_SIZE_DIVISOR
const REDUCED_CANVAS_HEIGHT = CANVAS_HEIGHT / CHROMA_CANVAS_SIZE_DIVISOR

declare const self: WorkerContext
let state = getInitialState()
let cache: Record<number, ImageBitmap> = {}
const canvasContext = createCanvas(REDUCED_CANVAS_WIDTH, REDUCED_CANVAS_HEIGHT)

self.onmessage = ({ data }) => {
  state.hue = data.hue

  if (!state.hasRenderPending) {
    state.hasRenderPending = true
    requestAnimationFrame(() => {
      if (!cache[state.hue]) {
        cache[state.hue] = renderChroma(state, canvasContext) // expensive
      }

      self.postMessage({
        hue: state.hue,

        bitmap: cache[state.hue],
      })
      state.hasRenderPending = false
    })
  }
}
