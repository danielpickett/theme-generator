import { atomFamily, selectorFamily } from 'recoil'
import { ShadeNameType, ScaleNameType, ShadeType } from 'ThemeGenerator/types'



export const defaultScaleColorAtom = atomFamily<ShadeNameType, ScaleNameType>({
    key: 'defaultScale',
    default: '500',
})
