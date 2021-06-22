import { atom } from 'recoil'

export const canvasSizeAtom = atom({
  key: 'canvasSize',
  default: 1,
})

export const showCanvasesAtom = atom({
  key: 'showCanvases',
  default: true,
})
