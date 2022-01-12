import { atomFamily, selectorFamily } from 'recoil'
import {
  DEFAULT_LUMINANCES,
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
} from 'ThemeGenerator/constants'
import { FirstOrLastShadeType, ShadeType } from 'ThemeGenerator/types'
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

const MIX_RATIO = 0.25

type RegularTextColorsType = {
  regular: ColorDataType
  subdued: ColorDataType
}

export const regularTextColorsSelector = selectorFamily<
  RegularTextColorsType,
  ShadeType
>({
  key: 'textColor',
  get:
    (shade) =>
    ({ get }) => {
      const hue = get(hueAtom(shade.scaleName))

      const shadeColor = getColorData({
        l: DEFAULT_LUMINANCES[shade.shadeName],
        c: get(chromaSelector(shade)),
        h: hue,
      })

      const isOnDark = isDark(shadeColor.lch.l)
      const regularText = getColorData({
        l: isOnDark ? 99.99 : 5,
        c: isOnDark ? 0 : 5,
        h: hue,
      })

      return {
        regular: regularText,
        subdued: mix(regularText.hex, shadeColor.hex, MIX_RATIO),
      }
    },
})

export const vividTextChromaAtom = atomFamily<number, FirstOrLastShadeType>({
  key: 'vividTextChroma',
  default: MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
})

export const vividTextLuminanceAtom = atomFamily<number, FirstOrLastShadeType>({
  key: 'vividTextLuminace',
  default: (shade) => DEFAULT_LUMINANCES[shade.shadeName],
})

type VividTextColorsType = {
  vivid: ColorDataType
  'vivid-subdued': ColorDataType
}

export const vividTextColorsSelector = selectorFamily<
  VividTextColorsType,
  ShadeType
>({
  key: 'textColor',
  get:
    (shade) =>
    ({ get }) => {
      const shadeL = DEFAULT_LUMINANCES[shade.shadeName]
      const shadeC = get(chromaSelector(shade))
      const shadeH = get(hueAtom(shade.scaleName))
      const shadeColor = {
        l: shadeL,
        c: shadeC,
        h: shadeH,
      }

      const textColorShadeID = {
        scaleName: shade.scaleName,
        shadeName: (isDark(shadeL) ? '900' : '000') as '900' | '000',
      }

      const textL = get(vividTextLuminanceAtom(textColorShadeID))
      const textC = get(vividTextChromaAtom(textColorShadeID))
      const maxTextChroma = getMaxChroma(textL, shadeH)

      let vividText = getColorData({
        l: textL,
        c: textC > maxTextChroma ? maxTextChroma : textC,
        h: shadeH,
      })

      if (!isSafe(vividText.hex, shadeColor)) {
        vividText = getColorData(getNearestSafeColor(shadeColor, textC))
      }

      const vividSubduedText = mix(
        vividText.hex,
        getColorData(shadeColor).hex,
        MIX_RATIO,
      )

      return {
        vivid: vividText,
        'vivid-subdued': vividSubduedText,
      }
    },
})

type VividTextColorsOnGreyType = {
  scaleName: string
  vivid: ColorDataType
  'vivid-subdued': ColorDataType
}

export const vividTextColorsOnGreyShadeSelector = selectorFamily<
  VividTextColorsOnGreyType,
  ShadeType
>({
  key: 'vividTextColorsOnGrey2',
  get:
    ({ shadeName, scaleName }) =>
    ({ get }) => {
      const greyShadeColor = getColorData({
        l: DEFAULT_LUMINANCES[shadeName],
        c: get(chromaSelector({ scaleName: 'grey', shadeName: shadeName })),
        h: get(hueAtom('grey')),
      })

      const vividTextColors = get(
        vividTextColorsSelector({ shadeName, scaleName }),
      )

      const vivid = isSafe(vividTextColors.vivid.hex, greyShadeColor.hex)
        ? vividTextColors.vivid
        : getColorData(
            getNearestSafeColor(
              greyShadeColor.lch,
              vividTextColors.vivid.lch.c,
              vividTextColors.vivid.lch.h,
            ),
          )

      const vividSubdued = mix(vivid.hex, greyShadeColor.hex, MIX_RATIO, 'rgb')

      return {
        scaleName,
        vivid: vivid,
        'vivid-subdued': vividSubdued,
      }
    },
})
