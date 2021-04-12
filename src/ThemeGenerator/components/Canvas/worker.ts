import { getColorData, getMaxChroma } from 'ThemeGenerator/utils/color-utils'

type ActionType = 'mask' | 'chroma' | 'pause' | 'unpause'

export type RequestMessageType = {
  type: ActionType
  hue: number
  requestTime: number
}
export type ResponseMessageType = {
  type: ActionType
  hue: number
  bitmap: ImageBitmap
  requestTime: number
}

declare const self: {
  postMessage: (message: ResponseMessageType) => void
  onmessage: (event: MessageEvent<RequestMessageType>) => void
}

const size = 4
const halfSize = size / 3
const offscreen = new OffscreenCanvas(150 * size, 100 * size)
const offscreenCtx = offscreen.getContext('2d')

let isPaused: boolean

self.onmessage = (event) => {
  const { type, hue, requestTime } = event.data

  switch (type) {
    case 'mask':
      if (offscreenCtx) {
        for (let L = 100 * size; L >= 0; L--) {
          const maxChroma = getMaxChroma(L / size, hue)
          offscreenCtx.fillStyle = 'rgba(255, 0, 0, .1)'
          offscreenCtx.fillRect(
            maxChroma * size,
            100 * size - L,
            150 * size - maxChroma,
            1
          )
        }
      }
      console.log(`posting: ${type}`)
      self.postMessage({
        hue,
        bitmap: offscreen.transferToImageBitmap(),
        requestTime,
        type,
      })
      break

    case 'chroma':
      if (offscreenCtx) {
        for (let L = 100 * halfSize; L >= 0; L--) {
          for (let C = 0; C < 150 * halfSize; C++) {
            const color = getColorData(L / halfSize, C / halfSize, hue)
            offscreenCtx.fillStyle = color.hex
            if (!color.isClipped) {
              offscreenCtx.fillRect(C, 100 * halfSize - L, 1, 1)
            } else {
              // offscreenCtx.fillStyle = 'white'
              offscreenCtx.fillRect(
                C,
                100 * halfSize - L,
                150 * halfSize - C,
                1
              )
              break
            }
          }
        }
      }
      console.log(`posting: ${type}`)
      self.postMessage({
        hue,
        bitmap: offscreen.transferToImageBitmap(),
        requestTime,
        type,
      })
      break
    default:
      break
  }
}
