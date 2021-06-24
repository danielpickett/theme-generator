import chromajs from 'chroma-js'
import { getColorData } from 'ThemeGenerator/utils'

export const mix = (textColor: string, swatchColor: string, ratio: number) =>
  getColorData(...chromajs.mix(textColor, swatchColor, ratio, 'lch').lch())
