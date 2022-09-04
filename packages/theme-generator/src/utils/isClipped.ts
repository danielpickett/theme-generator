import chromajs from 'chroma-js'
import { AugmentedColor } from 'src/types'

export const isClipped = (color: { l: number; c: number; h: number }) =>
  (chromajs.lch(color.l, color.c, color.h) as AugmentedColor).clipped()
