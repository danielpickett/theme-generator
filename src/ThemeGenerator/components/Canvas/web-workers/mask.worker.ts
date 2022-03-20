import { DEFAULT_CANVAS_SIZE } from 'ThemeGenerator/constants'
import { WorkerContext } from '../types'
import { createCanvas, getInitialState, resize } from './utils'
import { renderMask } from './render-mask'

declare const self: WorkerContext
let state = getInitialState(DEFAULT_CANVAS_SIZE)
let cache: Record<number, ImageBitmap> = {}
const { canvas, canvasContext } = createCanvas(state.size)

self.onmessage = ({ data }) => {
  if (data.size !== state.size) {
    resize(canvas, data.size)
    cache = {}
  }

  state.hue = data.hue
  state.size = data.size

  if (!state.hasRenderPending) {
    state.hasRenderPending = true
    requestAnimationFrame(() => {
      if (!cache[state.hue])
        cache[state.hue] = renderMask(state, canvas, canvasContext)

      self.postMessage({
        hue: state.hue,
        size: state.size,
        bitmap: cache[state.hue],
      })
      state.hasRenderPending = false
    })
  }
}
