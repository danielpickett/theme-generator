import {
  DEFAULT_CANVAS_SIZE,
  CHROMA_CANVAS_SIZE_DIVISOR,
} from 'ThemeGenerator/constants'
import { WorkerContext } from './types'
import { createCanvas, getInitialState } from './utils'
import { renderChroma } from './render-chroma'

declare const self: WorkerContext
let state = getInitialState(DEFAULT_CANVAS_SIZE / CHROMA_CANVAS_SIZE_DIVISOR)
const cache: Record<number, ImageBitmap> = {}
const { canvas, canvasContext } = createCanvas(state.size)

self.onmessage = ({ data }) => {
  const { hue, size } = data
  state = { ...state, hue, size: size / CHROMA_CANVAS_SIZE_DIVISOR }

  if (!state.hasRenderPending) {
    state.hasRenderPending = true
    requestAnimationFrame(() => {
      if (!cache[state.hue])
        cache[state.hue] = renderChroma(state, canvas, canvasContext) // expensive

      self.postMessage({ hue: state.hue, bitmap: cache[state.hue] })
      state.hasRenderPending = false
    })
  }
}
