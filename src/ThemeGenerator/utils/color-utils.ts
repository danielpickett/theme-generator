import chromajs, { Color } from 'chroma-js'

type AugmentedColor = Color & { clipped: () => boolean }

export const makeColor = (l: number, c: number, h: number) => {
  const color = chromajs.lch(l, c, h) as AugmentedColor
  const isClipped = color.clipped()
  return {
    hex: isClipped ? null : color.hex(),
    lch: [l, c, h],
    isClipped,
  }
}

export const isClipped = (l: number, c: number, h: number) => {
  return (chromajs.lch(l, c, h) as AugmentedColor).clipped()
}
