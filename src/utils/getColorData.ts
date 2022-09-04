import chromajs from 'chroma-js'
import { AugmentedColor, LCHUnionType } from 'src/types'

export type ColorDataType = {
  hex: string
  lch: {
    l: number
    c: number
    h: number
  }
  isClipped: boolean
}

export const getColorData = (lch: LCHUnionType) => {
  const { l, c, h } = Array.isArray(lch)
    ? { l: lch[0], c: lch[1], h: lch[2] }
    : lch

  const color = chromajs.lch(l, c, h) as AugmentedColor

  return {
    hex: color.hex(),
    lch: { l, c, h },
    isClipped: color.clipped(),
  }
}
