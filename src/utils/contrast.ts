import chromajs from 'chroma-js'
import { LCHUnionType } from 'src/types'
import { getColorData } from '.'

export const contrast = (
  color1: LCHUnionType | string,
  color2: LCHUnionType | string,
) => {
  color1 = typeof color1 === 'string' ? color1 : getColorData(color1).hex
  color2 = typeof color2 === 'string' ? color2 : getColorData(color2).hex
  return chromajs.contrast(color1, color2)
}
