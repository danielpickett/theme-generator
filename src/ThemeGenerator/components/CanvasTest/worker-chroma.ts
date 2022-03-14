import {
  getColorData,
  getMaxChroma,
  parseYellowProblem,
} from 'ThemeGenerator/utils'
import {
  MAX_POSSIBLE_LUMINANCE,
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
} from 'ThemeGenerator/constants'
import { RequestMessageEvent } from './worker-types'

declare const self: {
  onmessage: (event: RequestMessageEvent) => void
  postMessage: (...args: any) => void
}

const cache: Record<number, ImageBitmap> = {}

const sizeDivisor = 2

const state: { hue: number; size: number; hasRenderPending: boolean } = {
  hue: 0,
  size: 2,
  hasRenderPending: false,
}

const canvas = new OffscreenCanvas(
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * (state.size / sizeDivisor),
  MAX_POSSIBLE_LUMINANCE * (state.size / sizeDivisor),
)

const canvasCtx = canvas.getContext('2d')
if (!canvasCtx) throw new Error('Could not get canvas context')

self.onmessage = ({ data }) => {
  const { hue, size } = data

  if (cache[hue]) {
    console.log('hit <<<')
    self.postMessage(cache[hue])
  } else {
    const bitmap = renderChroma(hue)
    cache[hue] = bitmap
    self.postMessage(bitmap)
  }
}

const renderChroma = (hue: number) => {
  if (canvasCtx) {
    // resize(size)
    const H = hue

    const size = state.size / sizeDivisor

    const width = MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size
    const height = MAX_POSSIBLE_LUMINANCE * size

    console.time('MISS ---------------> chroma')
    canvasCtx.clearRect(0, 0, width, height)

    for (let L = height; L >= 0; L--) {
      const yellowException = parseYellowProblem(L / size, H)
      for (let C = 0; C < width; C++) {
        const color = getColorData({ l: L / size, c: C / size, h: H })

        canvasCtx.fillStyle = color.hex
        if (!color.isClipped) {
          canvasCtx.fillRect(C, height - L, 1, 1)
        } else {
          // uncomment to see the yellow dip
          canvasCtx.fillStyle = 'black' // <------------- comment this back out
          // canvasCtx.fillRect(C, height - L, 1, 1)
          if (yellowException !== null && C < yellowException * size) {
            canvasCtx.fillRect(C, height - L, 1, 1)
          } else {
            canvasCtx.fillRect(C, height - L, width - C, 1)
            break
          }
        }
      }
    }
    console.timeEnd('MISS ---------------> chroma')
  }
  state.hasRenderPending = false
  const bitmap = canvas.transferToImageBitmap()
  return bitmap
}
