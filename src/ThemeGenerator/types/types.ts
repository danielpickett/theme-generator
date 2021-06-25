import { Color } from 'chroma-js'

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

export type ShadeType = {
  scaleName: string
  shadeName: ShadeNameType
}

export type ScaleNameType = string

// https://stackoverflow.com/questions/57683303/how-can-i-see-the-full-expanded-contract-of-a-typescript-type
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

export type AugmentedColor = Color & { clipped: () => boolean }
