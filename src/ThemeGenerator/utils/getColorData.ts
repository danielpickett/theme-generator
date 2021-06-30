import chromajs from 'chroma-js'
import { AugmentedColor } from 'ThemeGenerator/types'

export type ColorDataType = {
  hex: string
  lch: {
    l: number
    c: number
    h: number
  }
  isClipped: boolean
}

interface getColorDataInterface {
  (lch: [number, number, number]): ColorDataType
  (lch: { l: number; c: number; h: number }): ColorDataType
}

export const getColorData: getColorDataInterface = (...args: any) => {
  const { l, c, h } = (() => {
    if (Array.isArray(args[0]))
      return { l: args[0][0], c: args[0][1], h: args[0][2] }
    return { ...args[0] }
  })() as { l: number; c: number; h: number }

  const color = chromajs.lch(l, c, h) as AugmentedColor

  return {
    hex: color.hex(),
    lch: { l, c, h },
    isClipped: color.clipped(),
  }
}
