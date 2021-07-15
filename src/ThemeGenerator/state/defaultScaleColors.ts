import { atomFamily } from 'recoil'
import { ShadeNameType, ScaleNameType } from 'ThemeGenerator/types'

export const defaultScaleColorAtom = atomFamily<ShadeNameType, ScaleNameType>({
  key: 'defaultScale',
  default: '500',
})
