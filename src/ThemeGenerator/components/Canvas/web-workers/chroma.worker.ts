import { DEFAULT_CANVAS_SIZE } from 'ThemeGenerator/constants'
import { WorkerContext } from '../types'
import { createCanvas, getInitialState, resize } from './utils'
import { renderChroma } from './render-chroma'

/**
 * Chroma canvas is painted at a reduced size to make it faster,
 * then it gets upscaled when painted to the canvas in the DOM.
 * This results in a 'blurry' final onscreen image, which is
 * unnoticeable since it's a soft gradient anyway.
 */
export const CHROMA_CANVAS_SIZE_DIVISOR = 2

declare const self: WorkerContext
let state = getInitialState(DEFAULT_CANVAS_SIZE / CHROMA_CANVAS_SIZE_DIVISOR)
let cache: Record<number, ImageBitmap> = {}
const { canvas, canvasContext } = createCanvas(state.size)

self.onmessage = ({ data }) => {
  const reducedSize = data.size / CHROMA_CANVAS_SIZE_DIVISOR
  if (reducedSize !== state.size) {
    // console.log('resize', reducedSize, state.size)
    resize(canvas, reducedSize)
    cache = {}
  }

  state.hue = data.hue
  state.size = reducedSize

  if (!state.hasRenderPending) {
    state.hasRenderPending = true
    requestAnimationFrame(() => {
      if (!cache[state.hue]) {
        cache[state.hue] = renderChroma(state, canvas, canvasContext) // expensive
        console.log(`miss ${data.hue}`)
      } else {
        console.log(`hit ${data.hue}`)
      }

      self.postMessage({
        hue: state.hue,
        size: state.size,
        bitmap: cache[state.hue],
      })
      state.hasRenderPending = false
    })
  } else {
    console.log(`skip ${data.hue}`)
  }
}
