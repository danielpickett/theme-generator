import {
  getColorDataWithRGB,
  getMaxChroma,
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
  const H = state.hue
  let prevColorHex = '#ffffff'

  if (canvasCtx) {
    console.time('chroma')
    for (let L = smallHeight; L >= 0; L--) {
      for (let C = 0; C < smallWidth; C++) {
        const color = getColorDataWithRGB(L / smallSize, C / smallSize, H)

        canvasCtx.fillStyle = color.hex
        if (!color.isClipped) {
          canvasCtx.fillRect(C, smallHeight - L, 1, 1)
          canvasCtx.fillStyle = color.hex
          // if (color.hex !== prevColorHex) {
          //   canvasCtx.fillStyle = 'red'
          //   canvasCtx.fillRect(C, smallHeight - L, 1, 1)
          // }
        } else {
          // exceptions for light yellow
          canvasCtx.fillStyle = 'black'
          if (
            H > 98.1 &&
            H < 106.6 &&
            L > 92.5 * smallSize &&
            L < 98.3 * smallSize &&
            C < 97.1 * smallSize
          ) {
            // if (C < 20 * smallSize) canvasCtx.fillStyle = 'red'
            // else canvasCtx.fillStyle = 'black'
            // canvasCtx.fillStyle = 'black'
            canvasCtx.fillRect(C, smallHeight - L, 1, 1)
          } else {
            // canvasCtx.fillStyle = 'grey'
            canvasCtx.fillRect(C, smallHeight - L, smallWidth - C, 1)
            break
          }
        }
        prevColorHex = color.hex
      }
    }
    console.timeEnd('chroma')
  }
  state.hasRenderPending = false
}

const renderMask = () => {
  if (canvasCtx) {
    console.time('  mask')
    canvasCtx.clearRect(0, 0, width, height)
    for (let L = height; L >= 0; L--) {
      const maxChroma = getMaxChroma(L / size, state.hue)
      canvasCtx.fillStyle = 'rgba(255, 255, 255, 1)'
      canvasCtx.fillStyle = 'rgba(0, 0, 0, 1)'
      canvasCtx.fillRect(
        maxChroma * size,
        100 * size - L,
        150 * size - maxChroma,
        1
      )
    }

    console.timeEnd('  mask')
  }
  state.hasRenderPending = false
}

self.onmessage = (event) => {
  const request = event.data

  switch (request.type) {
    case 'initCanvas':
      canvasCtx = request.canvas?.getContext('2d')
      console.log('initCanvas')
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
