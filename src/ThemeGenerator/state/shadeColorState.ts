import { atomFamily, selectorFamily } from 'recoil'
import { defaultTheme } from 'ThemeGenerator/themes'
import { ColorDataType, getColorData, getMaxChroma } from 'ThemeGenerator/utils'
import {
  defaultHue,
  defaultChromas,
  defaultLuminances,
} from 'ThemeGenerator/config'
import { LCHObjType, ScaleNameType, ShadeType } from 'ThemeGenerator/types'

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

export const chromaSelector = selectorFamily<number, ShadeType>({
  key: 'clampedChroma',
  get:
    (shade) =>
    ({ get }) => {
      const chroma = get(chromaAtom(shade))
      const maxChroma = get(maxChromaSelector(shade))
      return chroma > maxChroma ? maxChroma : chroma
    },
  set:
    (shade) =>
    ({ set }, newValue) =>
      set(chromaAtom(shade), newValue),
})

export const shadeColorSelector = selectorFamily<LCHObjType, ShadeType>({
  key: 'shadeColor',
  get:
    (shade) =>
    ({ get }) => ({
      l: defaultLuminances[shade.shadeName],
      c: get(chromaSelector(shade)),
      h: get(hueAtom(shade.scaleName)),
    }),
})

export const colorDataSelector = selectorFamily<ColorDataType, ShadeType>({
  key: 'colorData',
  get:
    (shade) =>
    ({ get }) =>
      getColorData({
        l: defaultLuminances[shade.shadeName],
        c: get(chromaSelector(shade)),
        h: get(hueAtom(shade.scaleName)),
      }),
})
