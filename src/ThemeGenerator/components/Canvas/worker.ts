import { getColorData, getMaxChroma } from 'ThemeGenerator/utils/color-utils'
import { RequestMessageType, ResponseMessageType } from './worker-types'
import { size, reducedSize } from './sizeSetting'

declare const self: {
  postMessage: (message: ResponseMessageType) => void
  onmessage: (event: MessageEvent<RequestMessageType>) => void
}

const maskCanvas = new OffscreenCanvas(150 * size, 100 * size)
const maskCtx = maskCanvas.getContext('2d') as OffscreenCanvasRenderingContext2D

const chromaCanvas = new OffscreenCanvas(150 * reducedSize, 100 * reducedSize)
const chromaCtx = chromaCanvas.getContext(
  '2d'
) as OffscreenCanvasRenderingContext2D

// const logTime = (time: number, message: string) => {
//   console.log(`${+new Date() - time}ms - ${message}`)
// }

self.onmessage = (event) => {
  const { data } = event

  switch (data.type) {
    case 'getChroma':
      // const { requestTime, hue } = data
      // logTime(data.requestTime, 'received request')

      for (let L = 100 * reducedSize; L >= 0; L--) {
        for (let C = 0; C < 150 * reducedSize; C++) {
          const color = getColorData(L / reducedSize, C / reducedSize, data.hue)
          chromaCtx.fillStyle = color.hex
          if (!color.isClipped) {
            chromaCtx.fillRect(C, 100 * reducedSize - L, 1, 1)
          } else {
            // chromaCtx.fillStyle = 'white'
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
      // logTime(data.requestTime, 'finished processing and painting')

      self.postMessage({
        bitmap: chromaCanvas.transferToImageBitmap(),
        requestTime: data.requestTime,
        hue: data.hue,
        type: 'chromaBitmap',
      })

      break

    case 'getMask':
      for (let L = 100 * size; L >= 0; L--) {
        const maxChroma = getMaxChroma(L / size, data.hue)
        maskCtx.fillStyle = 'rgba(255, 255, 255, 1)'
        maskCtx.fillRect(
          maxChroma * size,
          100 * size - L,
          150 * size - maxChroma,
          1
        )
      }

      self.postMessage({
        hue: data.hue,
        bitmap: maskCanvas.transferToImageBitmap(),
        requestTime: data.requestTime,
        type: 'maskBitmap',
      })
      break

    default:
      console.log(`uncaught switch case: ${event.data.type}`)
      break
  }
}
