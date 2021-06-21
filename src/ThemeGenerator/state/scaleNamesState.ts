import { atom } from 'recoil'
import { defaultTheme } from '../themes'

export const scaleNamesAtom = atom({
  key: 'scaleNames',
  default: defaultTheme.map((scale) => scale.id),
})
