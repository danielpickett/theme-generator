import { atomFamily, selectorFamily } from 'recoil'
import {
  defaultLuminances,
  maxPossibleChromaForAnyHue,
} from 'ThemeGenerator/config'
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
import { scaleNamesAtom } from './scaleNamesState'

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
      const hue = get(hueAtom(shade.scaleName))

      const shadeColor = getColorData({
        l: defaultLuminances[shade.shadeName],
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
        subdued: mix(regularText.hex, shadeColor.hex, mixRatio),
      }
    },
})

export const vividTextChromaAtom = atomFamily<number, FirstOrLastShadeType>({
  key: 'vividTextChroma',
  default: maxPossibleChromaForAnyHue,
})

export const vividTextLuminanceAtom = atomFamily<number, FirstOrLastShadeType>({
  key: 'vividTextLuminace',
  default: (shade) => defaultLuminances[shade.shadeName],
})

export const vividTextColorsSelector = selectorFamily<
  VividTextColorsType,
  ShadeType
>({
  key: 'textColor',
  get:
    (shade) =>
    ({ get }) => {
      const shadeL = defaultLuminances[shade.shadeName]
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
        mixRatio
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
  VividTextColorsOnGreyType[],
  ShadeType
>({
  key: 'vividTextColorsOnGrey',
  get:
    (shade) =>
    ({ get }) => {
      return get(scaleNamesAtom)
        .filter((shadeName) => shadeName !== 'grey')
        .map((scaleName) => {
          const vividShadeColor = getColorData({
            l: defaultLuminances[shade.shadeName],
            c: get(chromaSelector(shade)),
            h: get(hueAtom(shade.scaleName)),
          })

          const vividTextColors = get(
            vividTextColorsSelector({ shadeName: shade.shadeName, scaleName })
          )

          const vivid = isSafe(vividTextColors.vivid.hex, vividShadeColor.hex)
            ? vividTextColors.vivid
            : getColorData(
                getNearestSafeColor(
                  vividShadeColor.lch,
                  vividTextColors.vivid.lch.c,
                  vividTextColors.vivid.lch.h
                )
              )

          const vividSubdued = mix(vivid.hex, vividShadeColor.hex, mixRatio)

          return {
            scaleName,
            vivid: vivid,
            'vivid-subdued': vividSubdued,
          }
        })
    },
})
