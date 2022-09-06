import { atom } from 'recoil'

export const showCanvasesAtom = atom({
  key: 'showCanvases',
  default: true,
})

export const showTextColorPlotsAtom = atom({
  key: 'showTextColorPlots',
  default: false,
})

export const isFullscreenAtom = atom({
  key: 'isFullscreen',
  default: false,
})
