import { getColorData, getMaxChroma, parseYellowProblem } from 'ThemeGenerator'

import { RequestMessageType } from './worker-types'
import { canvasBaseHeight, canvasBaseWidth } from './sizes'

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
    const H = state.hue

    const width = canvasBaseWidth * size
    const height = canvasBaseHeight * size

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
    const width = canvasBaseWidth * size
    const height = canvasBaseHeight * size

    canvasCtx.clearRect(0, 0, width, height)
    for (let L = height; L >= 0; L--) {
      const maxChroma = getMaxChroma(L / size, state.hue)

      canvasCtx.fillStyle = 'rgba(255, 255, 255, 1)'
      canvasCtx.fillRect(
        maxChroma * size,
        canvasBaseHeight * size - L,
        canvasBaseWidth * size - maxChroma,
        1
      )
    }
  }
  state.hasRenderPending = false
}

const resize = (size: number) => {
  const width = canvasBaseWidth * size
  const height = canvasBaseHeight * size
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
      // const width = canvasBaseWidth * request.size
      // const height = canvasBaseHeight * request.size
      resize(request.size)
      canvas = request.canvas
      canvasCtx = request.canvas?.getContext('2d')

      // if (canvas) {
      //   canvas.height = height
      //   canvas.width = width
      // }
      break

    case 'paintChroma':
      state.hue = request.hue
      if (!state.hasRenderPending) {
        state.hasRenderPending = true
        resize(request.size)
        requestAnimationFrame(() => renderChroma(request.size))
      }
      break

    case 'paintMask':
      state.hue = request.hue
      if (!state.hasRenderPending) {
        state.hasRenderPending = true
        resize(request.size)
        requestAnimationFrame(() => renderMask(request.size))
      }
      break

    default:
      break
  }
}
