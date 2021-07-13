import chromajs from 'chroma-js'
import { getColorData } from 'ThemeGenerator/utils'
import { ColorDataType } from './getColorData'

export const mix = (
  textColor: string,
  shadeColor: string,
  ratio: number,
  colorSpace: 'lch' | 'rgb' = 'lch'
): ColorDataType =>
  getColorData([
    ...chromajs.mix(textColor, shadeColor, ratio, colorSpace).lch(),
  ])
