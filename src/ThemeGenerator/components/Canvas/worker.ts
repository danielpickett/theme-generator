import { getColorData, getMaxChroma } from 'ThemeGenerator/utils/color-utils'
import { RequestMessageType } from './worker-types'
import { size, reducedSize } from './sizeSetting'

declare const self: {
  onmessage: (event: MessageEvent<RequestMessageType>) => void
}

let canvasCtx: OffscreenCanvasRenderingContext2D | null | undefined

const state: { hue: number; busy: boolean } = { hue: 0, busy: false }

const renderChroma = () => {
  if (canvasCtx) {
    console.time('chroma')
    for (let L = 100 * reducedSize; L >= 0; L--) {
      for (let C = 0; C < 150 * reducedSize; C++) {
        const color = getColorData(L / reducedSize, C / reducedSize, state.hue)
        canvasCtx.fillStyle = color.hex
        if (!color.isClipped) {
          canvasCtx.fillRect(C, 100 * reducedSize - L, 1, 1)
        } else {
          // canvasCtx.fillStyle = 'white'
          canvasCtx.fillRect(C, 100 * reducedSize - L, 150 * reducedSize - C, 1)
          break
        }
      }
    }
    console.timeEnd('chroma')
  }
  state.busy = false
}

const renderMask = () => {
  if (canvasCtx) {
    console.time('mask')
    canvasCtx.clearRect(0, 0, 150 * size, 100 * size)
    for (let L = 100 * size; L >= 0; L--) {
      const maxChroma = getMaxChroma(L / size, state.hue)
      canvasCtx.fillStyle = 'rgba(255, 255, 255, 1)'
      canvasCtx.fillRect(
        maxChroma * size,
        100 * size - L,
        150 * size - maxChroma,
        1
      )
    }

    console.timeEnd('mask')
  }
  state.busy = false
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
      if (!state.busy) {
        state.busy = true
        requestAnimationFrame(renderChroma)
      }
      break

    case 'paintMask':
      state.hue = request.hue
      if (!state.busy) {
        state.busy = true
        requestAnimationFrame(renderMask)
      }
      break
    default:
      console.log(`uncaught switch case: ${event.data.type}`)
      break
  }
}
