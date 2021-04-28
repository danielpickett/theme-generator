import chromajs, { Color } from 'chroma-js'
import { isYellow, parseYellowProblem } from './yellow-exception-utils'

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

export const getMaxChroma = (luminance: number, hue: number) => {
  if (isYellow(hue)) {
    const chromaLimit = parseYellowProblem(luminance, hue)
    if (chromaLimit !== null)
      // We have a yellow problem. Go to linear search
      return getYellowMaxChroma(luminance, hue, chromaLimit)
  }

  // 0.01 confirmed to be accurate through all hues
  const resolution = 0.01
  let chroma = 0
  let step = 150

  /**
   * BINARY SEARCH
   * If increasing the chroma by half of the step makes a non-clipped color,
   * then increase the chroma by half of the step.
   * Else, if that would make a clipped color, then leave the chroma alone,
   * but cut the step in half and try again.
   * Continue this until achieving the specified resolution.
   */
  while (step >= resolution) {
    if (!isClipped({ l: luminance, h: hue, c: chroma + step / 2 }))
      chroma = chroma + step / 2
    else step = step / 2
  }
  return chroma
}

const getYellowMaxChroma = (
  luminance: number,
  hue: number,
  chromaLimit: number
) => {
  // 0.05 confirmed to be accurate, but not excessive for yellow hues 98.1 to 106.6
  const resolution = 0.05

  /** LINEAR SEARCH
   * Search one at a time from right to left, starting from the
   * max chroma passed in. This value should be obtained from the
   * parseYellowProblem function.
   */
  for (let chroma = chromaLimit; chroma > 0; chroma = chroma - resolution) {
    if (!isClipped({ l: luminance, h: hue, c: chroma })) return chroma
  }

  return 0
}
