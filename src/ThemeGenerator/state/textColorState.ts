import { atomFamily, selectorFamily, DefaultValue } from 'recoil'

import { defaultLuminances } from 'ThemeGenerator/config'
import { ShadeType } from 'ThemeGenerator/types'
import {
  ColorDataType,
  getColorData,
  mix,
  isDark,
  getNearestSafeColor,
} from 'ThemeGenerator/utils'
import { hueAtom, chromaSelector } from 'ThemeGenerator/state'

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

      const shadeColor = getColorData({
        l: defaultLuminances[shadeName],
        c: get(chromaSelector(shade)),
        h: hue,
      })

      const srcShadeName = isDark(shadeColor.lch.l) ? '000' : '900'

      const regularText = getColorData({
        l: defaultLuminances[srcShadeName],
        c: get(chromaSelector({ scaleName, shadeName: srcShadeName })),
        h: hue,
      })

      const subduedText = mix(regularText.hex, shadeColor.hex, mixRatio)

      return {
        regular: regularText,
        subdued: subduedText,
      }
    },
})

const vividTextColorAtom = atomFamily<ColorDataType | undefined, ShadeType>({
  key: 'vividTextTargetColor',
  default: undefined,
})

const vividTextChromaAtom = atomFamily<number | undefined, ShadeType>({
  key: 'vividTextChroma',
  default: undefined,
})

const vividTextLuminaceAtom = atomFamily<number | undefined, ShadeType>({
  key: 'vividTextLuminace',
  default: undefined,
})

export const vividTextColorsSelector = selectorFamily<
  VividTextColorsType,
  ShadeType
>({
  key: 'textColor',
  get:
    (shade) =>
    ({ get }) => {
      const L = defaultLuminances[shade.shadeName]
      const H = get(hueAtom(shade.scaleName))

      let vividText = get(vividTextColorAtom(shade))

      const nearestSafeColor = getNearestSafeColor({
        l: L,
        c: get(chromaSelector(shade)),
        h: H,
      })

      if (!vividText) {
        vividText = getColorData(nearestSafeColor)
      }

      const shadeColor = getColorData({
        l: L,
        c: get(chromaSelector(shade)),
        h: H,
      })

      const vividSubduedText = mix(vividText.hex, shadeColor.hex, mixRatio)

      return {
        vivid: vividText,
        'vivid-subdued': vividSubduedText,
      }
    },
  set:
    (shade) =>
    ({ set }, newVividTextColors) => {
      const newValue =
        newVividTextColors instanceof DefaultValue
          ? newVividTextColors
          : newVividTextColors.vivid
      set(vividTextColorAtom(shade), newValue)
    },
})
