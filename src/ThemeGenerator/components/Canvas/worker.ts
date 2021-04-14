import { getColorData, getMaxChroma } from 'ThemeGenerator/utils/color-utils'
import { RequestMessageType, ResponseMessageType } from './worker-types'
import { size } from './sizeSetting'

declare const self: {
  postMessage: (message: ResponseMessageType) => void
  onmessage: (event: MessageEvent<RequestMessageType>) => void
}

const halfSize = size / 1
const offscreen = new OffscreenCanvas(150 * size, 100 * size)
const offscreenCtx = offscreen.getContext('2d')

const state = { hue: 0 }

const getRowColors = (L: number, hue: number) => {
  return new Promise<{ hex: string; hue: number }[]>((resolve, reject) => {
    console.log(`new row: L = ${L}`)
    const rowColors: { hex: string; hue: number }[] = []
    for (let C = 0; C < 150 * halfSize; C++) {
      console.log(`${' '.repeat(50)} state ->   ${state.hue} v ${hue}   <- WIP`)
      const color = getColorData(L / halfSize, C / halfSize, hue)
      if (!color.isClipped) {
        rowColors.push({ hex: color.hex, hue })
      } else break
    }

    setTimeout(() => {
      resolve(rowColors)
    }, 0)
  })
}

const recursiveChain = (
  argsArr: { L: number; hue: number }[],
  data?: { hex: string; hue: number }[][]
): Promise<{ hex: string; hue: number }[][]> => {
  const currArgs = argsArr.shift()
  // console.log(data)
  return currArgs
    ? getRowColors(currArgs.L, currArgs.hue).then((res) =>
        recursiveChain(
          argsArr,
          data ? [...data, res] : [[{ hex: '#ffffff', hue: NaN }]]
        )
      )
    : Promise.resolve(data ? data : [[{ hex: 'error', hue: NaN }]])
}

self.onmessage = (event) => {
  const { data } = event

  switch (data.type) {
    case 'updateHue':
      state.hue = data.hue
      console.log(`state.hue updated --> ${state.hue}`)
      break

    case 'getChroma':
      if (offscreenCtx) {
        const arrayOfArguments: { L: number; hue: number }[] = []
        for (let L = 100 * halfSize; L >= 0; L--) {
          arrayOfArguments.push({ L, hue: state.hue })
        }

        recursiveChain(arrayOfArguments).then((res: any) =>
          console.log(' - * - * - DONE - * - * - ')
        )
      }

      break

    case 'getMask':
      if (offscreenCtx) {
        for (let L = 100 * size; L >= 0; L--) {
          const maxChroma = getMaxChroma(L / size, state.hue)
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
        bitmap: offscreen.transferToImageBitmap(),
        requestTime: data.requestTime,
        type: 'maskBitmap',
      })
      break

    default:
      console.log(`uncaught switch case: ${event.data.type}`)
      break
  }
}
