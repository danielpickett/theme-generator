import {
  getColorData,
  getMaxChroma,
  parseYellowProblem,
} from 'ThemeGenerator/utils'
import {
  maxPossibleLuminance,
  maxPossibleChromaForAnyHue,
} from 'ThemeGenerator/config'
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

    const width = maxPossibleChromaForAnyHue * size
    const height = maxPossibleLuminance * size

    canvasCtx.clearRect(0, 0, width, height)
    for (let L = height; L >= 0; L--) {
      const yellowException = parseYellowProblem(L / size, H)
      for (let C = 0; C < width; C++) {
        const color = getColorData(L / size, C / size, H)

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
    const width = maxPossibleChromaForAnyHue * size
    const height = maxPossibleLuminance * size

    canvasCtx.clearRect(0, 0, width, height)
    for (let L = height; L >= 0; L--) {
      const maxChroma = getMaxChroma(L / size, state.hue)

      canvasCtx.fillStyle = 'rgba(255, 255, 255, 1)'
      canvasCtx.fillRect(
        maxChroma * size,
        maxPossibleLuminance * size - L,
        maxPossibleChromaForAnyHue * size - maxChroma,
        1
      )
    }
  }
  state.hasRenderPending = false
}

const resize = (size: number) => {
  const width = maxPossibleChromaForAnyHue * size
  const height = maxPossibleLuminance * size
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
