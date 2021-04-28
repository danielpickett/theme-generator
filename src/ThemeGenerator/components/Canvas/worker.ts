import {
  getColorData,
  getMaxChroma,
  parseYellowProblem,
} from 'ThemeGenerator/utils/color-utils'

import { RequestMessageType } from './worker-types'
import { size, smallSize } from './sizes'

declare const self: {
  onmessage: (event: MessageEvent<RequestMessageType>) => void
}

const width = 150 * size
const height = 100 * size

const smallWidth = 150 * smallSize
const smallHeight = 100 * smallSize

let canvasCtx: OffscreenCanvasRenderingContext2D | null | undefined

const state: { hue: number; hasRenderPending: boolean } = {
  hue: 0,
  hasRenderPending: false,
}

const renderChroma = () => {
  if (canvasCtx) {
    const H = state.hue
    console.time(`chroma ${H}`)
    for (let L = smallHeight; L >= 0; L--) {
      const yellowException = parseYellowProblem(L / smallSize, H)
      for (let C = 0; C < smallWidth; C++) {
        const color = getColorData(L / smallSize, C / smallSize, H)

        canvasCtx.fillStyle = color.hex
        if (!color.isClipped) {
          canvasCtx.fillRect(C, smallHeight - L, 1, 1)
        } else {
          if (yellowException !== null && C < yellowException * smallSize) {
            canvasCtx.fillRect(C, smallHeight - L, 1, 1)
          } else {
            canvasCtx.fillRect(C, smallHeight - L, smallWidth - C, 1)
            break
          }
        }
      }
    }
    console.timeEnd(`chroma ${H}`)
  }

  state.hasRenderPending = false
}

const renderMask = () => {
  if (canvasCtx) {
    console.time(`  mask ${state.hue}`)
    canvasCtx.clearRect(0, 0, width, height)
    for (let L = height; L >= 0; L--) {
      const maxChroma = getMaxChroma(L / size, state.hue)

      canvasCtx.fillStyle = 'rgba(255, 255, 255, 1)'
      canvasCtx.fillRect(
        maxChroma * size,
        100 * size - L,
        150 * size - maxChroma,
        1
      )
    }

    console.timeEnd(`  mask ${state.hue}`)
  }
  state.hasRenderPending = false
}

self.onmessage = (event) => {
  const request = event.data

  switch (request.type) {
    case 'initCanvas':
      canvasCtx = request.canvas?.getContext('2d')
      // console.log('initCanvas')
      break

    case 'paintChroma':
      state.hue = request.hue
      if (!state.hasRenderPending) {
        state.hasRenderPending = true
        requestAnimationFrame(renderChroma)
      }
      break

    case 'paintMask':
      state.hue = request.hue
      if (!state.hasRenderPending) {
        state.hasRenderPending = true
        requestAnimationFrame(renderMask)
      }
      break

    default:
      console.log(`uncaught switch case: ${event.data.type}`)
      break
  }
}
