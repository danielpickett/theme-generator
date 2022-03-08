import {
  getColorData,
  getMaxChroma,
  parseYellowProblem,
} from 'ThemeGenerator/utils'
import {
  MAX_POSSIBLE_LUMINANCE,
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
} from 'ThemeGenerator/constants'
import { RequestMessageType } from './worker-types'

declare const self: {
  onmessage: (event: MessageEvent<RequestMessageType>) => void
}

let canvasCtx: OffscreenCanvasRenderingContext2D | null | undefined
let canvas: OffscreenCanvas | undefined

const state: { hue: number; hasRenderPending: boolean } = {
  hue: 0,
  hasRenderPending: false,
}

const renderChroma = (size: number) => {
  if (canvasCtx) {
    resize(size)
    const H = state.hue

    const width = MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size
    const height = MAX_POSSIBLE_LUMINANCE * size

    canvasCtx.clearRect(0, 0, width, height)
    for (let L = height; L >= 0; L--) {
      const yellowException = parseYellowProblem(L / size, H)
      for (let C = 0; C < width; C++) {
        const color = getColorData({ l: L / size, c: C / size, h: H })

        canvasCtx.fillStyle = color.hex
        if (!color.isClipped) {
          canvasCtx.fillRect(C, height - L, 1, 1)
        } else {
          // uncomment to see the yellow dip
          // canvasCtx.fillStyle = 'black'
          // canvasCtx.fillRect(C, height - L, 1, 1)
          if (yellowException !== null && C < yellowException * size) {
            canvasCtx.fillRect(C, height - L, 1, 1)
          } else {
            canvasCtx.fillRect(C, height - L, width - C, 1)
            break
          }
        }
      }
    }
  }
  state.hasRenderPending = false
}

const renderMask = (size: number) => {
  if (canvasCtx) {
    resize(size)
    const width = MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size
    const height = MAX_POSSIBLE_LUMINANCE * size

    canvasCtx.clearRect(0, 0, width, height)
    for (let L = height; L >= 0; L--) {
      const maxChroma = getMaxChroma(L / size, state.hue)

      canvasCtx.fillStyle = 'rgba(255, 255, 255, 1)'
      canvasCtx.fillRect(
        maxChroma * size,
        MAX_POSSIBLE_LUMINANCE * size - L,
        MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size - maxChroma,
        1,
      )
    }
  }
  state.hasRenderPending = false
}

const resize = (size: number) => {
  const width = MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size
  const height = MAX_POSSIBLE_LUMINANCE * size
  if (
    (canvas && canvas.height !== height) ||
    (canvas && canvas.width !== width)
  ) {
    canvas.height = height
    canvas.width = width
  }
}

self.onmessage = (event) => {
  const request = event.data

  switch (request.type) {
    case 'initCanvas':
      canvas = request.canvas
      resize(request.size)
      canvasCtx = request.canvas?.getContext('2d')
      break

    case 'paintChroma':
      state.hue = request.hue
      if (!state.hasRenderPending) {
        state.hasRenderPending = true
        requestAnimationFrame(() => renderChroma(request.size))
      }
      break

    case 'paintMask':
      state.hue = request.hue
      if (!state.hasRenderPending) {
        state.hasRenderPending = true
        requestAnimationFrame(() => renderMask(request.size))
      }
      break

    default:
      break
  }
}
