import { selectorFamily } from 'recoil'

import { defaultLuminances } from 'ThemeGenerator/config'
import { LCHObjType, ShadeType } from 'ThemeGenerator/types'
import {
  ColorDataType,
  getColorData,
  mix,
  getMaxChroma,
  isDark,
} from 'ThemeGenerator/utils'
import { hueAtom, chromaAtom } from 'ThemeGenerator/state'

export const vividLums = {
  '000': 45,
  '050': 39,
  '100': 35,
  '200': 32,
  '300': 30,
  '400': 18.2,
  '500': 100,
  '600': 95,
  '700': 90,
  '800': 85,
  '900': 80,
}

const mixRatio = 0.25

type RegularTextColorsType = {
  regular: ColorDataType
  subdued: ColorDataType
}

type VividTextColorsType = {
  vivid: ColorDataType
  'vivid-subdued': ColorDataType
}

export const regularTextColorsSelector = selectorFamily<
  RegularTextColorsType,
  ShadeType
>({
  key: 'textColor',
  get:
    (shade) =>
    ({ get }) => {
      const { scaleName, shadeName } = shade
      const hue = get(hueAtom(scaleName))

      const shadeColor = getColorData(
        defaultLuminances[shadeName],
        get(chromaAtom(shade)),
        hue
      )

      const srcShadeName = isDark(shadeColor.lch.l) ? '000' : '900'

      const regularText = getColorData(
        defaultLuminances[srcShadeName],
        get(chromaAtom({ scaleName, shadeName: srcShadeName })),
        hue
      )

      const subduedText = mix(regularText.hex, shadeColor.hex, mixRatio)

      return {
        regular: regularText,
        subdued: subduedText,
      }
    },
})

export const vividTextColorsSelector = selectorFamily<
  VividTextColorsType,
  ShadeType
>({
  key: 'textColor',
  get:
    (shade) =>
    ({ get }) => {
      const { scaleName, shadeName } = shade
      const defaultL = defaultLuminances[shadeName]
      const l = vividLums[shadeName]
      const h = get(hueAtom(scaleName))
      const c = getMaxChroma(l, h)

      const shadeColor = getColorData(defaultL, get(chromaAtom(shade)), h)

      const vividText = getColorData(l, c, h)
      const vividSubduedText = mix(vividText.hex, shadeColor.hex, mixRatio)

      return {
        vivid: vividText,
        'vivid-subdued': vividSubduedText,
      }
    },
})

export const mostChromaticSafeColorSelector = selectorFamily<
  LCHObjType,
  ShadeType
>({
  key: 'mostChromaticSafeColor',
  get:
    (shade) =>
    ({ get }) => {
      // const l = defaultLuminances[shade.shadeName]
      const h = get(hueAtom(shade.scaleName))
      // const c = get(chromaAtom(shade))

      return { l: 0, c: 0, h }
      // return getMostChromaticSafeColor({ l, c, h })
    },
})
