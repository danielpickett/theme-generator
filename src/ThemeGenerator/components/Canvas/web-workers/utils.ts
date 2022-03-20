import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'ThemeGenerator/constants'
import { WorkerState } from '../types'

export const getInitialState = (): WorkerState => ({
  hue: 0,
  hasRenderPending: false,
})

export const createCanvas = () => {
  const canvas = new OffscreenCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)

  const canvasContext = canvas.getContext('2d')
  if (!canvasContext) throw new Error('Could not get canvas context')

  return { canvas, canvasContext }
}
