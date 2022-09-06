import { WorkerContext } from '../types'
import { createCanvas, getInitialState } from './utils'
import { renderMask } from './render-mask'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'src/constants'

declare const self: WorkerContext
let state = getInitialState()
let cache: Record<number, ImageBitmap> = {}
const canvasContext = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)

self.onmessage = ({ data }) => {
  state.hue = data.hue

  if (!state.hasRenderPending) {
    state.hasRenderPending = true
    requestAnimationFrame(() => {
      if (!cache[state.hue]) cache[state.hue] = renderMask(state, canvasContext)

      self.postMessage({
        hue: state.hue,
        bitmap: cache[state.hue],
      })
      state.hasRenderPending = false
    })
  }
}
