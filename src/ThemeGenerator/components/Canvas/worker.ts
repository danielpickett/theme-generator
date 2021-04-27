import {
  getColorDataPlus,
  // getMaxChroma,
  getMaxChroma2,
  isProblemYellow,
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
  let prevColor = {
    hex: '#ffffff',
    lch: {
      l: 100,
      c: 0,
      h: 0,
    },
    rgb: [255, 255, 255],
    isClipped: false,
  }

  let hasSkips = false

  if (canvasCtx) {
    for (let L = smallHeight; L >= 0; L--) {
      if (L < 92 * smallSize) break
      for (let C = 0; C < smallWidth; C++) {
        const color = getColorDataPlus(L / smallSize, C / smallSize, H)

        canvasCtx.fillStyle = color.hex
        if (!color.isClipped) {
          canvasCtx.fillRect(C, smallHeight - L, 1, 1)
          canvasCtx.fillStyle = color.hex

          if (
            Math.abs(color.rgb[0] - prevColor.rgb[0]) > 1 ||
            Math.abs(color.rgb[1] - prevColor.rgb[1]) > 1 ||
            Math.abs(color.rgb[2] - prevColor.rgb[2]) > 1
          ) {
            if (C > 0) hasSkips = true
            canvasCtx.fillStyle = L / smallSize > 40 ? 'black' : 'white'
            canvasCtx.fillRect(C, smallHeight - L, 1, 1)
          }
        } else {
          canvasCtx.fillStyle = 'white'
          if (isProblemYellow(L, state.hue) && C < 97.2 * smallSize) {
            canvasCtx.fillStyle = 'red'
            canvasCtx.fillRect(C, smallHeight - L, 1, 1)
          } else {
            canvasCtx.fillRect(C, smallHeight - L, smallWidth - C, 1)
            break
          }
        }
        prevColor = color
      }
    }
  }
  if (hasSkips && false) console.log('HAS SKIPS!!! hue: ', state.hue)
  state.hasRenderPending = false
}

const renderMask = () => {
  if (canvasCtx) {
    canvasCtx.clearRect(0, 0, width, height)
    for (let L = height; L >= 0; L--) {
      // const shouldLogTime = L === 998 || isProblemYellow(L, state.hue)

      // shouldLogTime && console.time(`L ${L}`)
      const maxChroma = getMaxChroma2(L / size, state.hue)
      // shouldLogTime && console.timeEnd(`L ${L}`)

      canvasCtx.fillStyle = 'rgba(0, 0, 124, .5)'
      canvasCtx.fillRect(
        maxChroma * size,
        100 * size - L,
        150 * size - maxChroma,
        1
      )
    }

    // console.timeEnd('  mask')
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
