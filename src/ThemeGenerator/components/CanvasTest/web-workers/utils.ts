import {
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
  MAX_POSSIBLE_LUMINANCE,
} from 'ThemeGenerator/constants'
import { WorkerState } from './types'

export const getInitialState = (size: number): WorkerState => ({
  size,
  hue: 0,
  hasRenderPending: false,
})

export const createCanvas = (size: number) => {
  const canvas = new OffscreenCanvas(
    MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size,
    MAX_POSSIBLE_LUMINANCE * size,
  )

  const canvasContext = canvas.getContext('2d')
  if (!canvasContext) throw new Error('Could not get canvas context')

  return { canvas, canvasContext }
}

export const resize = (canvas: OffscreenCanvas, size: number) => {
  canvas.height = MAX_POSSIBLE_LUMINANCE * size
  canvas.width = MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size
}
