import chromajs, { Color } from 'chroma-js'

type AugmentedColor = Color & { clipped: () => boolean }

export const getColorData = (l: number, c: number, h: number) => {
  const color = chromajs.lch(l, c, h) as AugmentedColor
  const isClipped = color.clipped()

  return {
    hex: color.hex(),
    lch: { l, c, h },
    isClipped,
  }
}
