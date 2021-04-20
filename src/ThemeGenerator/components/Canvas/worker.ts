import { getColorData } from 'ThemeGenerator/utils/color-utils'
import { RequestMessageType, ResponseMessageType } from './worker-types'
import {
  // size,
  reducedSize,
} from './sizeSetting'

declare const self: {
  postMessage: (message: ResponseMessageType) => void
  onmessage: (event: MessageEvent<RequestMessageType>) => void
}

const sp = (n: number) => ' '.repeat(n)

let chromaCtx: OffscreenCanvasRenderingContext2D | null | undefined

const state: { hue?: number; busy: boolean } = { busy: false }

// const postRenderCheck = (hue: number | undefined) => {
//   if (hue !== state.hue) {
//     console.log('cleanup')
//     requestAnimationFrame(render)
//   } else {
//     state.busy = false
//   }
// }

const render = (hue: number) => {
  if (hue === state.hue) {
    console.time('time')
    for (let L = 100 * reducedSize; L >= 0; L--) {
      for (let C = 0; C < 150 * reducedSize; C++) {
        const color = getColorData(L / reducedSize, C / reducedSize, hue)
        if (chromaCtx) {
          chromaCtx.fillStyle = color.hex
          if (!color.isClipped) {
            chromaCtx.fillRect(C, 100 * reducedSize - L, 1, 1)
          } else {
            chromaCtx.fillStyle = 'white'
            chromaCtx.fillRect(
              C,
              100 * reducedSize - L,
              150 * reducedSize - C,
              1
            )
            break
          }
        }
      }
    }
    console.timeEnd('time')
    console.log(`${sp(30)}renderer - matched, ${hue} painted`)
  } else {
    console.log(
      `${sp(30)}renderer - mismatch ${hue}: ${state.hue}, (rescheduling ${
        state.hue
      })`
    )
    render(state.hue || 0)
  }
}

self.onmessage = (event) => {
  const request = event.data

  switch (request.type) {
    case 'initOffscreenChromaCanvas':
      chromaCtx = request.canvas?.getContext('2d')
      console.log('initOffscreenChromaCanvas')
      break
    case 'paintChroma':
      state.hue = request.hue
      if (!state.busy) {
        console.log('switch - idle, schedule', request.hue)
        state.busy = true

        requestAnimationFrame(() => {
          render(request.hue)
          state.busy = false
        })
      } else console.log('switch - busy, skip', request.hue)
      break
    default:
      console.log(`uncaught switch case: ${event.data.type}`)
      break
  }
}
