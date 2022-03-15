import { DEFAULT_CANVAS_SIZE } from 'ThemeGenerator/constants'
import { WorkerContext } from './types'
import { createCanvas, getInitialState } from './utils'
import { renderMask } from './render-mask'

declare const self: WorkerContext
let state = getInitialState(DEFAULT_CANVAS_SIZE)
const cache: Record<number, ImageBitmap> = {}
const { canvas, canvasContext } = createCanvas(state.size)

self.onmessage = ({ data }) => {
  const { hue, size } = data
  state = { ...state, hue, size }

  if (!state.hasRenderPending) {
    state.hasRenderPending = true
    requestAnimationFrame(() => {
      if (!cache[state.hue])
        cache[state.hue] = renderMask(state, canvas, canvasContext)

      self.postMessage({ hue: state.hue, bitmap: cache[state.hue] })
      state.hasRenderPending = false
    })
  }
}
