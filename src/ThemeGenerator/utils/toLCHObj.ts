import { LCHObjType, LCHUnionType } from 'ThemeGenerator/types'

interface toLCHObjInterface {
  (lch: LCHUnionType): LCHObjType
  (l: number, c: number, h: number): LCHObjType
}

export const toLCHObj: toLCHObjInterface = (...args: any) => {
  if (Array.isArray(args[0]))
    return { l: args[0][0], c: args[0][1], h: args[0][2] }
  if (typeof args[0] === 'object')
    return { l: args[0].l, c: args[0].c, h: args[0].h }
  return { l: args[0], c: args[1], h: args[2] }
}
