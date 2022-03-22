import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'ThemeGenerator/constants'
import { WorkerState } from '../types'

export const getInitialState = (): WorkerState => ({
  hue: 0,
  hasRenderPending: false,
})

export const createCanvas = (height: number, width: number) => {
  const canvas = new OffscreenCanvas(height, width)

  const canvasContext = canvas.getContext('2d')
  if (!canvasContext) throw new Error('Could not get canvas context')

  return canvasContext
}
