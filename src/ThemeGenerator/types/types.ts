import { getColorData, getColorDataPlus } from 'internal'

export type ShadeNameType =
  | '000'
  | '050'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'

export type ColorShadeType = {
  id: string
  chroma: number
}

export type ColorScaleStateType = {
  id: string
  hue: number
}

export type ColorScaleType = {
  id: string
  hue: number
  shades: ColorShadeType[]
}

export type ColorDataType = ReturnType<typeof getColorData>
export type ColorDataPlusType = ReturnType<typeof getColorDataPlus>

export type ShadeType = {
  scaleName: string
  shadeName: ShadeNameType
}

export type ScaleNameType = string
