import chromajs from 'chroma-js'
import { LCHUnionType } from 'ThemeGenerator/types'
import { toLCHArr } from './toLCHArr'

export const isSameColor = (
  color1: LCHUnionType | string,
  color2: LCHUnionType | string
) => {
  const hex1 =
    typeof color1 === 'string' ? color1 : chromajs(...toLCHArr(color1)).hex

  const hex2 =
    typeof color2 === 'string' ? color2 : chromajs(...toLCHArr(color2)).hex

  return hex1 === hex2
}
