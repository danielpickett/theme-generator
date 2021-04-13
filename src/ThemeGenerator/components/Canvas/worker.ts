import { getColorData, getMaxChroma } from 'ThemeGenerator/utils/color-utils'

type ActionType = 'mask' | 'chroma' | 'pause' | 'unpause'

export type RequestMessageType = {
  type: ActionType
  hue?: number
  requestTime?: number
}
export type ResponseMessageType = {
  type: ActionType
  hue?: number
  bitmap?: ImageBitmap
  requestTime?: number
}

declare const self: {
  postMessage: (message: ResponseMessageType) => void
  onmessage: (event: MessageEvent<RequestMessageType>) => void
}

const size = 1
const halfSize = size / 1
const offscreen = new OffscreenCanvas(150 * size, 100 * size)
const offscreenCtx = offscreen.getContext('2d')

let isPaused = false

const getRowColors = (L: number, hue: number) => {
  return new Promise<string[]>((resolve, reject) => {
    const rowColors: string[] = []
    for (let C = 0; C < 150 * halfSize; C++) {
      const color = getColorData(L / halfSize, C / halfSize, hue)
      if (!color.isClipped) rowColors.push(color.hex)
      else break
    }
    console.log('paused', isPaused)
    if (isPaused) reject('paused')
    setTimeout(() => {
      console.log('tick')
      resolve(rowColors)
    }, 0)
  })
}

self.onmessage = (event) => {
  const { type, hue, requestTime } = event.data

  switch (type) {
    case 'chroma':
      if (offscreenCtx && typeof hue !== 'undefined') {
        const rowColorPromises: Promise<string[]>[] = []
        for (let L = 100 * halfSize; L >= 0; L--) {
          rowColorPromises.push(getRowColors(L, hue))
        }
        Promise.all(rowColorPromises)
          .then((rows) => {
            console.log(`rows`, hue)
            rows.forEach((row, y) =>
              row.forEach((color, x) => {
                offscreenCtx.fillStyle = color
                offscreenCtx.fillRect(x, y, 1, 1)
              })
            )
            self.postMessage({
              hue,
              bitmap: offscreen.transferToImageBitmap(),
              requestTime,
              type,
            })
          })
          .catch((err) => console.log('err', err))
      }

      break

    case 'mask':
      if (offscreenCtx && hue) {
        for (let L = 100 * size; L >= 0; L--) {
          const maxChroma = getMaxChroma(L / size, hue)
          offscreenCtx.fillStyle = 'rgba(255, 255, 255, .1)'
          offscreenCtx.fillRect(
            maxChroma * size,
            100 * size - L,
            150 * size - maxChroma,
            1
          )
        }
      }
      self.postMessage({
        hue,
        bitmap: offscreen.transferToImageBitmap(),
        requestTime,
        type,
      })
      break

    case 'pause':
      isPaused = true
      console.log('isPaused: ', isPaused)
      break
    case 'unpause':
      isPaused = false
      console.log('isPaused: ', isPaused)
      break
    default:
      break
  }
}
