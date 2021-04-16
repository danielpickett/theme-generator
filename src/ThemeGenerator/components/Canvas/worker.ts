import { getColorData } from 'ThemeGenerator/utils/color-utils'
import { RequestMessageType, ResponseMessageType } from './worker-types'
import { size, reducedSize } from './sizeSetting'

declare const self: {
  postMessage: (message: ResponseMessageType) => void
  onmessage: (event: MessageEvent<RequestMessageType>) => void
}

const offscreen = new OffscreenCanvas(150 * size, 100 * size)
const offscreenCtx = offscreen.getContext('2d')

const state = { hue: 0 }

const logTime = (time: number, message: string) => {
  console.log(`${+new Date() - time}ms - ${message}`)
}

const getRowColors = (L: number, hue: number) => {
  const rowColors: { hex: string; hue: number }[] = []
  for (let C = 0; C < 150 * reducedSize; C++) {
    if (L === 100 * reducedSize) {
    }
    const color =
      L === 100 * reducedSize && C === 0
        ? { hex: '#ffffff', isClipped: false }
        : getColorData(L / reducedSize, C / reducedSize, hue)

    if (!color.isClipped) rowColors.push({ hex: color.hex, hue })
    else break
  }

  return rowColors
}

const getRowsRecursively = (
  argsArr: { L: number; hue: number }[],
  data: { hex: string; hue: number }[][],
  requestTimestamp: number
) => {
  const currArgs = argsArr.shift()
  if (currArgs) {
    const rowColors = getRowColors(currArgs.L, currArgs.hue)
    const newData = [...data, rowColors]
    // getRowsRecursively(argsArr, newData, requestTimestamp)
    setTimeout(() => getRowsRecursively(argsArr, newData, requestTimestamp))
  } else {
    // logTime(requestTimestamp, 'finished processing colors synchronously')
    logTime(requestTimestamp, 'finished processing colors with setTimeout')
    console.log(data)
  }
}

// const paint = (reqTime: number) => {
//   const arrayOfArguments: { L: number; hue: number }[] = []
//   for (let L = 100 * reducedSize; L >= 0; L--) {
//     arrayOfArguments.push({ L, hue: state.hue })
//   }
//   logTime(reqTime, 'built arguments')
//   getRowsRecursively(arrayOfArguments, [], reqTime)
// }

self.onmessage = (event) => {
  const { data } = event

  switch (data.type) {
    case 'updateHue':
      state.hue = data.hue
      console.log(`hue --> ${state.hue}°`)
      break

    case 'getChroma':
      const reqTime = data.requestTime
      logTime(reqTime, 'received request')
      if (offscreenCtx) {
        // paint(reqTime)
        // const arrayOfArguments: { L: number; hue: number }[] = []
        // for (let L = 100 * reducedSize; L >= 0; L--) {
        //   arrayOfArguments.push({ L, hue: state.hue })
        // }
        // logTime(reqTime, 'built arguments')
        // const rows = getRows(arrayOfArguments)
        // logTime(reqTime, 'processed rows')
        // rows.forEach((row, y) => {
        //   row.forEach((color, x) => {
        //     offscreenCtx.fillStyle = color.hex
        //     offscreenCtx.fillRect(x, y, 1, 1)
        //   })
        // })
        // logTime(reqTime, 'painted offscreen canvas')
        // self.postMessage({
        //   type: 'chromaBitmap',
        //   bitmap: offscreen.transferToImageBitmap(),
        //   requestTime: data.requestTime,
        // })
        // logTime(reqTime, 'posted bitmap')
      }

      if (offscreenCtx) {
        for (let L = 100 * reducedSize; L >= 0; L--) {
          for (let C = 0; C < 150 * reducedSize; C++) {
            const color = getColorData(
              L / reducedSize,
              C / reducedSize,
              state.hue
            )
            offscreenCtx.fillStyle = color.hex
            if (!color.isClipped) {
              offscreenCtx.fillRect(C, 100 * reducedSize - L, 1, 1)
            } else {
              offscreenCtx.fillStyle = 'white'
              offscreenCtx.fillRect(
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
      logTime(reqTime, 'finished processing and painting')
      self.postMessage({
        bitmap: offscreen.transferToImageBitmap(),
        requestTime: reqTime,
        type: 'chromaBitmap',
      })

      break

    default:
      console.log(`uncaught switch case: ${event.data.type}`)
      break
  }
}
