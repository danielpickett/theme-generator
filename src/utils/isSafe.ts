import { LCHUnionType } from 'src/types'
import { contrast } from '.'

export const isSafe = (
  color1: LCHUnionType | string,
  color2: LCHUnionType | string,
) => contrast(color1, color2) >= 4.5
