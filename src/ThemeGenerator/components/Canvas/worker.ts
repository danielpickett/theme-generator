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
  const rowColors: { hex: string; hue: number }[] = []
  for (let C = 0; C < 150 * reducedSize; C++) {
    const color = getColorData(L / reducedSize, C / reducedSize, hue)
    if (!color.isClipped) rowColors.push({ hex: color.hex, hue })
    else break
  }

  return rowColors
}

// const getRowColorsAsync = (L: number, hue: number) => {
//   return new Promise<{ hex: string; hue: number }[]>((resolve, reject) => {
//     if (state.hue !== hue) {
//       console.log(`rejecting - L:${L}`)
//       reject('work became stale')
//     }
//     const rowColors: { hex: string; hue: number }[] = []
//     for (let C = 0; C < 150 * reducedSize; C++) {
//       const color = getColorData(L / reducedSize, C / reducedSize, hue)
//       if (!color.isClipped) {
//         rowColors.push({ hex: color.hex, hue })
//       } else break
//     }

//     setTimeout(() => {
//       resolve(rowColors)
//     }, 0)
//   })
// }

const getRows = (argsArr: { L: number; hue: number }[]) => {
  return argsArr.reduce((rows: { hex: string; hue: number }[][], currArgs) => {
    const row = getRowColors(currArgs.L, currArgs.hue)
    return [...rows, row]
  }, [])
}

// const recursiveChain = (
//   argsArr: { L: number; hue: number }[],
//   data?: { hex: string; hue: number }[][]
// ): Promise<{ hex: string; hue: number }[][]> => {
//   const currArgs = argsArr.shift()
//   return currArgs
//     ? getRowColorsAsync(currArgs.L, currArgs.hue).then((res) =>
//         recursiveChain(
//           argsArr,
//           data ? [...data, res] : [[{ hex: '#ffffff', hue: NaN }]]
//         )
//       )
//     : Promise.resolve(data ? data : [[{ hex: 'error', hue: NaN }]])
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
      console.log(
        `${+new Date() - reqTime}ms - hue: ${state.hue} - received request`
      )
      if (offscreenCtx) {
        const arrayOfArguments: { L: number; hue: number }[] = []
        for (let L = 100 * reducedSize; L >= 0; L--) {
          arrayOfArguments.push({ L, hue: state.hue })
        }
        console.log(
          `${+new Date() - reqTime}ms - hue: ${state.hue} - built arguments`
        )

        const rows = getRows(arrayOfArguments)

        // const res = recursiveChain(arrayOfArguments)
        // console.log(
        //   `${+new Date() - reqTime}ms - hue: ${state.hue} - built promise chain`
        // )

        // res
        //   .then((rows) => {
        console.log(
          `${+new Date() - reqTime}ms - hue: ${rows[1][1].hue} - resolved rows`
          // } - resolved promise chain`
        )

        rows.forEach((row, y) => {
          row.forEach((color, x) => {
            offscreenCtx.fillStyle = color.hex
            offscreenCtx.fillRect(x, y, 1, 1)
          })
        })

        console.log(
          `${+new Date() - reqTime}ms - hue: ${
            state.hue
          } - painted offscreen canvas`
        )
        self.postMessage({
          type: 'chromaBitmap',
          bitmap: offscreen.transferToImageBitmap(),
          requestTime: data.requestTime,
        })
        console.log(
          `${+new Date() - reqTime}ms - hue: ${state.hue} - posted bitmap`
        )
        //   })
        //   .catch((reason) => console.log(reason))
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
