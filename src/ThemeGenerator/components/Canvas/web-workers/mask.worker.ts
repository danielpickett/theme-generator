import { WorkerContext } from '../types'
import { createCanvas, getInitialState } from './utils'
import { renderMask } from './render-mask'

declare const self: WorkerContext
let state = getInitialState()
let cache: Record<number, ImageBitmap> = {}
const { canvas, canvasContext } = createCanvas()

self.onmessage = ({ data }) => {
  state.hue = data.hue

  if (!state.hasRenderPending) {
    state.hasRenderPending = true
    requestAnimationFrame(() => {
      if (!cache[state.hue])
        cache[state.hue] = renderMask(state, canvas, canvasContext)

      self.postMessage({
        hue: state.hue,
        bitmap: cache[state.hue],
      })
      state.hasRenderPending = false
    })
  }
}
