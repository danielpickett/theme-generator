import { atomFamily } from 'recoil'
import { ShadeNameType, ScaleNameType } from 'src/types'

export const defaultScaleShadeAtom = atomFamily<ShadeNameType, ScaleNameType>({
  key: 'defaultScaleShade',
  default: '500',
})
