import { atom, atomFamily, selectorFamily } from 'recoil'
import { defaultTheme } from './themes'
import {
  defaultLuminances,
  defaultChromas,
  defaultHue,
  getColorData,
  ColorDataType,
  ShadeType,
  ScaleNameType,
} from 'internal'

export const scaleIdsAtom = atom({
  key: 'scaleIds',
  default: defaultTheme.map((scale) => scale.id),
})

export const hueAtom = atomFamily<number, ScaleNameType>({
  key: 'hue',
  default: (scaleName) =>
    defaultTheme.find((scale) => scale.id === scaleName)?.hue || defaultHue,
})

export const chromaAtom = atomFamily<number, ShadeType>({
  key: 'chroma',
  default: (shade) =>
    defaultTheme
      .find((scale) => scale.id === shade.scaleName)
      ?.shades.find((_shade) => _shade.id === shade.shadeName)?.chroma ||
    defaultChromas[shade.shadeName],
})

export const colorDataSelector = selectorFamily<ColorDataType, ShadeType>({
  key: 'hexColor',
  get: (shade) => ({ get }) => {
    const luminance = defaultLuminances[shade.shadeName]
    const chroma = get(chromaAtom(shade))
    const hue = get(hueAtom(shade.scaleName))

    return getColorData(luminance, chroma, hue)
  },
})
