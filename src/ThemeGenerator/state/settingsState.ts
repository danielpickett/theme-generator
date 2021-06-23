import { atom } from 'recoil'

export const canvasSizeAtom = atom({
  key: 'canvasSize',
  default: 2,
})

export const showCanvasesAtom = atom({
  key: 'showCanvases',
  default: true,
})
