import {
  // getColorData,
  getMaxChroma,
  // parseYellowProblem,
} from 'ThemeGenerator/utils'
import {
  MAX_POSSIBLE_LUMINANCE,
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
} from 'ThemeGenerator/constants'

declare const self: {
  onmessage: (event: MessageEvent<number>) => void
  postMessage: (...args: any) => void
}

const cache: Record<number, ImageBitmap> = {}

const state: { hue: number; size: number; hasRenderPending: boolean } = {
  hue: 0,
  size: 2,
  hasRenderPending: false,
}

const canvas = new OffscreenCanvas(
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * state.size,
  MAX_POSSIBLE_LUMINANCE * state.size,
)

const canvasCtx = canvas.getContext('2d')
if (!canvasCtx) throw new Error('Could not get canvas context')

self.onmessage = ({ data: hue }) => {
  console.time('mask')
  if (cache[hue]) {
    console.log('hit', hue)
    self.postMessage(cache[hue])
  } else {
    const bitmap = renderMask(hue)
    console.log('miss', hue)
    cache[hue] = bitmap
    self.postMessage(bitmap)
  }
  console.timeEnd('mask')
}

const renderMask = (hue: number) => {
  if (canvasCtx) {
    // resize(size)
    const width = MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * state.size
    const height = MAX_POSSIBLE_LUMINANCE * state.size

    canvasCtx.clearRect(0, 0, width, height)
    for (let L = height; L >= 0; L--) {
      const maxChroma = getMaxChroma(L / state.size, hue)

      canvasCtx.fillStyle = 'rgba(0, 0, 0, 1)'
      canvasCtx.fillRect(
        maxChroma * state.size,
        MAX_POSSIBLE_LUMINANCE * state.size - L,
        MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * state.size - maxChroma,
        1,
      )
    }
  }
  state.hasRenderPending = false
  const bitmap = canvas.transferToImageBitmap()

  return bitmap
}
