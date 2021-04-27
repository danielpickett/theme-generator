import chromajs, { Color } from 'chroma-js'
import { smallSize } from 'ThemeGenerator/components/Canvas/sizes'

type AugmentedColor = Color & { clipped: () => boolean }

export const getColorData = (l: number, c: number, h: number) => {
  const color = chromajs.lch(l, c, h) as AugmentedColor

  return {
    hex: color.hex(),
    lch: { l, c, h },
    isClipped: color.clipped(),
  }
}

export const getColorDataPlus = (l: number, c: number, h: number) => {
  const color = chromajs.lch(l, c, h) as AugmentedColor

  return {
    hex: color.hex(),
    lch: { l, c, h },
    rgb: color.rgb(),
    contrastOnWhite: chromajs.contrast(color, 'white'),
    isClipped: color.clipped(),
  }
}

const isClipped = (color: { l: number; c: number; h: number }) =>
  (chromajs.lch(color.l, color.c, color.h) as AugmentedColor).clipped()

/*
If increasing the chroma by half of the step makes a non-clipped color,
then increase the chroma by half of the step.
Else, if that would make a clipped color, then leave the chroma alone,
but cut the step in half and try again.
Continue this until achieving the specified resolution.
*/
export const getMaxChroma = (luminance: number, hue: number) => {
  const resolution = 0.001

  let chroma = 0
  let step = 50

  while (step >= resolution) {
    if (!isClipped({ l: luminance, h: hue, c: chroma + step / 2 }))
      chroma = chroma + step / 2
    else step = step / 2
  }

  return chroma
}

export const isProblemYellow = (L: number, H: number) => {
  if (H > 98.1 && H < 106.6 && L > 92.5 * smallSize && L < 98.3 * smallSize)
    return true
  return false
}

export const getMaxChroma2 = (luminance: number, hue: number) => {
  const resolution = 0.001
  if (hue > 98.1 && hue < 106.6 && luminance > 92.5 && luminance < 98.3) {
    return getYellowMaxChroma(luminance, hue)
  }

  let chroma = 0
  let step = 50

  while (step >= resolution) {
    if (!isClipped({ l: luminance, h: hue, c: chroma + step / 2 }))
      chroma = chroma + step / 2
    else step = step / 2
  }
  return chroma
}

const getYellowMaxChroma = (luminance: number, hue: number) => {
  // C < 97.2

  const resolution = 0.01

  for (let chroma = 97.2; chroma > 0; chroma = chroma - resolution) {
    if (!isClipped({ l: luminance, h: hue, c: chroma })) return chroma
  }

  return 0
}

export const getMaxChromaSlow = (
  luminance: number,
  hue: number,
  resolution: number = 0.05
) => {
  let maxChroma = 0
  for (let chroma = 0; chroma <= 150; chroma = chroma + resolution) {
    if (!isClipped({ l: luminance, c: chroma, h: hue })) {
      maxChroma = chroma
    }
  }

  return maxChroma
}

// const getYellowMaxChroma = (
//   luminance: number,
//   hue: number,
//   resolution: number = 0.05
// ) => {}
