import { atomFamily } from 'recoil'
import { ColorScaleStateType, ColorShadeType } from 'ThemeGenerator/types'

export const shadeAtomFamily = atomFamily<ColorShadeType, ColorShadeType>({
  key: 'shade',
  default: (shade) => shade,
})

export const scaleHueAtomFamily = atomFamily<
  ColorScaleStateType,
  ColorScaleStateType
>({
  key: 'scaleHue',
  default: (scaleHue) => scaleHue,
})
