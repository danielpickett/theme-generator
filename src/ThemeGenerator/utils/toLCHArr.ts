import { LCHArrayType, LCHUnionType } from 'ThemeGenerator/types'

interface toLCHObjInterface {
  (lch: LCHUnionType): LCHArrayType
  (l: number, c: number, h: number): LCHArrayType
}

export const toLCHArr: toLCHObjInterface = (...args: any) => {
  if (Array.isArray(args[0])) return [args[0][0], args[0][1], args[0][2]] as LCHArrayType
  if (typeof args[0] === 'object') return [args[0].l, args[0].c, args[0].h] as LCHArrayType
  return [args[0], args[1], args[2]] as LCHArrayType
}
