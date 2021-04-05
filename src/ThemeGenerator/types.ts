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
