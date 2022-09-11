import { atom } from 'recoil'

export const showCanvasesAtom = atom({
  key: 'showCanvases',
  default: false,
})

export const showTextColorPlotsAtom = atom({
  key: 'showTextColorPlots',
  default: false,
})

export const showTextSamplesAtom = atom({
  key: 'showTextSamples',
  default: false,
})

export const showShadeNamesAtom = atom({
  key: 'showShadeNames',
  default: false,
})

export const isFullscreenAtom = atom({
  key: 'isFullscreen',
  default: false,
})
