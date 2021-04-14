import { getColorData, getMaxChroma } from 'ThemeGenerator/utils/color-utils'
import { RequestMessageType, ResponseMessageType } from './worker-types'
import { size, reducedSize } from './sizeSetting'

declare const self: {
  postMessage: (message: ResponseMessageType) => void
  onmessage: (event: MessageEvent<RequestMessageType>) => void
}

const offscreen = new OffscreenCanvas(150 * size, 100 * size)
const offscreenCtx = offscreen.getContext('2d')

const state = { hue: 0 }

const getRowColors = (L: number, hue: number) => {
  return new Promise<{ hex: string; hue: number }[]>((resolve, reject) => {
    // console.log(`new row: L = ${L}`)
    // console.log(
    //   `L: ${L} ${' '.repeat(50)} state ->   ${state.hue} v ${hue}   <- WIP    ${
    //     state.hue !== hue ? 'stale' : ''
    //   }`
    // )
    const rowColors: { hex: string; hue: number }[] = []
    for (let C = 0; C < 150 * reducedSize; C++) {
      // console.log(
      //   `${' '.repeat(50)} state ->   ${state.hue} v ${hue}   <- WIP    ${
      //     state.hue !== hue ? 'stale' : ''
      //   }`
      // )
      if (state.hue !== hue) {
        console.log('')
        reject('work became stale')
      }
      const color = getColorData(L / reducedSize, C / reducedSize, hue)
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
        for (let L = 100 * reducedSize; L >= 0; L--) {
          arrayOfArguments.push({ L, hue: state.hue })
        }

        recursiveChain(arrayOfArguments)
          .then((res) => {
            console.log(' - * - * - DONE - * - * - ')
          })
          .catch((reason) => console.log(reason))
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
