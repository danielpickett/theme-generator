import { atom } from 'recoil'
import { DEFAULT_CANVAS_SIZE } from 'ThemeGenerator/constants'

export const canvasSizeAtom = atom({
  key: 'canvasSize',
  default: DEFAULT_CANVAS_SIZE,
})

export const showCanvasesAtom = atom({
  key: 'showCanvases',
  default: true,
})

export const textColorsPlotSizeAtom = atom({
  key: 'textColorsPlotSize',
  default: 1,
})

export const showTextColorPlotsAtom = atom({
  key: 'showTextColorPlots',
  default: false,
})
