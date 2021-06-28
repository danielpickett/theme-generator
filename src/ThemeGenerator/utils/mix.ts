import chromajs from 'chroma-js'
import { getColorData } from 'ThemeGenerator/utils'

export const mix = (textColor: string, shadeColor: string, ratio: number) =>
  getColorData(...chromajs.mix(textColor, shadeColor, ratio, 'lch').lch())
