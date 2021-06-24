import { atom } from 'recoil'

export const canvasSizeAtom = atom({
  key: 'canvasSize',
  default: 2,
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
  default: true,
})
