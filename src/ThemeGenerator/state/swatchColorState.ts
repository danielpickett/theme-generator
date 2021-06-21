import { atomFamily, selectorFamily } from 'recoil'
import { defaultTheme } from '../themes'
import {
  defaultLuminances,
  defaultChromas,
  defaultHue,
  getColorData,
  getColorDataPlus,
  ColorDataType,
  ShadeType,
  ScaleNameType,
  ColorDataPlusType,
} from 'ThemeGenerator'
import { getMaxChroma } from 'ThemeGenerator/utils'

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

export const maxChromaSelector = selectorFamily<number, ShadeType>({
  key: 'maxChroma',
  get:
    (shade) =>
    ({ get }) =>
      getMaxChroma(
        defaultLuminances[shade.shadeName],
        get(hueAtom(shade.scaleName))
      ),
})

export const colorDataSelector = selectorFamily<ColorDataType, ShadeType>({
  key: 'colorData',
  get:
    (shade) =>
    ({ get }) =>
      getColorData(
        defaultLuminances[shade.shadeName],
        get(chromaAtom(shade)),
        get(hueAtom(shade.scaleName))
      ),
})

export const colorDataPlusSelector = selectorFamily<
  ColorDataPlusType,
  ShadeType
>({
  key: 'colorDataPlus',
  get:
    (shade) =>
    ({ get }) =>
      getColorDataPlus(
        defaultLuminances[shade.shadeName],
        get(chromaAtom(shade)),
        get(hueAtom(shade.scaleName))
      ),
})
