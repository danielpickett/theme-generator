import { atomFamily, selectorFamily } from 'recoil'
import {
  defaultLuminances,
  maxPossibleChromaForAnyHue,
} from 'ThemeGenerator/config'
import { ShadeType } from 'ThemeGenerator/types'
import {
  ColorDataType,
  getColorData,
  mix,
  isDark,
  getNearestSafeColor,
  getMaxChroma,
  isSafe,
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

export const vividTextChromaAtom = atomFamily<number, ShadeType>({
  key: 'vividTextChroma',
  default: maxPossibleChromaForAnyHue,
})

export const vividTextLuminanceAtom = atomFamily<number, ShadeType>({
  key: 'vividTextLuminace',
  default: (shade) => defaultLuminances[shade.shadeName],
})

export const vividTextHueAtom = atomFamily<number | null, ShadeType>({
  key: 'vividTextLuminace',
  default: null,
})

export const vividTextColorsSelector = selectorFamily<
  VividTextColorsType,
  ShadeType
>({
  key: 'textColor',
  get:
    (shade) =>
    ({ get }) => {
      const h = get(hueAtom(shade.scaleName))
      const shadeColor = {
        l: defaultLuminances[shade.shadeName],
        c: get(chromaSelector(shade)),
        h,
      }

      const l = get(vividTextLuminanceAtom(shade))
      const c = get(vividTextChromaAtom(shade))
      const maxChroma = getMaxChroma(l, h)

      let vividText = getColorData({ l, c: c > maxChroma ? maxChroma : c, h })

      if (!isSafe(vividText.hex, shadeColor)) {
        vividText = getColorData(
          getNearestSafeColor(shadeColor, maxPossibleChromaForAnyHue)
        )
      }

      const vividSubduedText = mix(
        vividText.hex,
        getColorData(shadeColor).hex,
        mixRatio
      )

      return {
        vivid: vividText,
        'vivid-subdued': vividSubduedText,
      }
    },
})
