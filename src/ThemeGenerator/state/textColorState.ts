import { selectorFamily } from 'recoil'
import {
  ShadeType,
  defaultLuminances,
  chromaAtom,
  hueAtom,
  getColorData,
  ColorDataType,
  // maxChromaSelector,
  mix,
} from 'ThemeGenerator'
import { getMaxChroma } from 'ThemeGenerator/utils'

const regularTextConfig = {
  '000': { srcShadeName: '900', subduedMix: 0.25 },
  '050': { srcShadeName: '900', subduedMix: 0.25 },
  '100': { srcShadeName: '900', subduedMix: 0.25 },
  '200': { srcShadeName: '900', subduedMix: 0.25 },
  '300': { srcShadeName: '900', subduedMix: 0.25 },
  '400': { srcShadeName: '900', subduedMix: 0.25 },
  '500': { srcShadeName: '000', subduedMix: 0.25 },
  '600': { srcShadeName: '000', subduedMix: 0.25 },
  '700': { srcShadeName: '000', subduedMix: 0.25 },
  '800': { srcShadeName: '000', subduedMix: 0.25 },
  '900': { srcShadeName: '000', subduedMix: 0.25 },
} as const

export const vividTextColorConfig = {
  '000': { lum: 45, maxLum: 50, mix: 0.25 },
  '050': { lum: 39, maxLum: 50, mix: 0.25 },
  '100': { lum: 35, maxLum: 50, mix: 0.25 },
  '200': { lum: 32, maxLum: 50, mix: 0.25 },
  '300': { lum: 30, maxLum: 50, mix: 0.25 },
  '400': { lum: 18.2, minLum: 100, mix: 0.25 },
  '500': { lum: 100, minLum: 100, mix: 0.25 },
  '600': { lum: 95, minLum: 100, mix: 0.25 },
  '700': { lum: 90, minLum: 71, mix: 0.25 },
  '800': { lum: 85, minLum: 59.1, mix: 0.25 },
  '900': { lum: 80, minLum: 52.5, mix: 0.25 },
} as const

type TextColorsType = {
  regular: ColorDataType
  subdued: ColorDataType
  vivid: ColorDataType
}

export const textColorsSelector = selectorFamily<TextColorsType, ShadeType>({
  key: 'textColor',
  get:
    (shade) =>
    ({ get }) => {
      const { scaleName, shadeName } = shade
      const { srcShadeName } = regularTextConfig[shade.shadeName]
      const hue = get(hueAtom(scaleName))

      const swatch = getColorData(
        defaultLuminances[shadeName],
        get(chromaAtom(shade)),
        hue
      )

      const regularText = getColorData(
        defaultLuminances[srcShadeName],
        get(chromaAtom({ scaleName, shadeName: srcShadeName })),
        hue
      )

      const subduedText = mix(
        regularText.hex,
        swatch.hex,
        regularTextConfig[shadeName].subduedMix
      )

      const lum = vividTextColorConfig[shadeName].lum
      const chroma = getMaxChroma(lum, hue)

      const vividText = getColorData(lum, chroma, hue)

      return {
        regular: regularText,
        subdued: subduedText,
        vivid: vividText,
      }
    },
})

export {}
