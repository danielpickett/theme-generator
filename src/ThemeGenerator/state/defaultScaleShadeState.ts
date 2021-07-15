import { atomFamily } from 'recoil'
import { ShadeNameType, ScaleNameType } from 'ThemeGenerator/types'

export const defaultScaleShadeAtom = atomFamily<ShadeNameType, ScaleNameType>({
  key: 'defaultScaleShade',
  default: '500',
})
