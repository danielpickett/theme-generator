export * from './color-utils'

// import chromajs, { Color } from 'chroma-js'

// export type LCHColor = { l: number; c: number; h: number }

// export type ColorExtended = Color & {
//   _rgb: {
//     0: number
//     1: number
//     2: number
//     3: number
//     _clipped: boolean
//     _unclipped: {
//       0: number
//       1: number
//       2: number
//       3: number
//     }
//   }
// }

// type LCHTuple = [number, number, number]

// export function lch(lch: LCHTuple): LCHColor
// export function lch(lch: LCHColor): ColorExtended

// export function lch(lch: LCHTuple | LCHColor) {
//   if (Array.isArray(lch)) {
//     return { l: lch[0], c: lch[1], h: isNaN(lch[2]) ? 0 : lch[2] } as LCHColor
//   } else {
//     return chromajs.lch(lch.l, lch.c, lch.h) as ColorExtended
//   }
// }
