import chromajs, { Color } from 'chroma-js'

type AugmentedColor = Color & { clipped: () => boolean }

export type ColorDataType = {
  hex: string
  lch: {
    l: number
    c: number
    h: number
  }
  isClipped: boolean
}

interface getColorDataInterface {
  (lch: [number, number, number]): ColorDataType
  (lch: { l: number; c: number; h: number }): ColorDataType
  (l: number, c: number, h: number): ColorDataType
}

export const getColorData: getColorDataInterface = (...args: any) => {
  const { l, c, h } = (() => {
    if (Array.isArray(args[0]))
      return { l: args[0][0], c: args[0][1], h: args[0][2] }
    if (typeof args[0] === 'object') return args[0]
    return { l: args[0], c: args[1], h: args[2] }
  })() as { l: number; c: number; h: number }

  const color = chromajs.lch(l, c, h) as AugmentedColor

  return {
    hex: color.hex(),
    lch: { l, c, h },
    isClipped: color.clipped(),
  }
}

export const mix = (textColor: string, swatchColor: string, ratio: number) =>
  getColorData(...chromajs.mix(textColor, swatchColor, ratio, 'lch').lch())

export const getColorDataPlus = (l: number, c: number, h: number) => {
  const color = chromajs.lch(l, c, h) as AugmentedColor

  return {
    hex: color.hex(),
    lch: { l, c, h },
    rgb: color.rgb(),
    clipped_lch: chromajs(color.css()).lch(),
    contrastOnWhite: chromajs.contrast(color, 'white'),
    isClipped: color.clipped(),
  }
}

const isClipped = (color: { l: number; c: number; h: number }) =>
  (chromajs.lch(color.l, color.c, color.h) as AugmentedColor).clipped()

export const getMaxChroma = (luminance: number, hue: number) => {
  const chromaLimit = parseYellowProblem(luminance, hue)
  if (chromaLimit !== null) {
    // We have a yellow problem. Go to LINEAR SEARCH
    return getYellowMaxChroma(luminance, hue, chromaLimit)
  }

  // 0.01 confirmed to be accurate across all hues
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

/**
 * If a particular hue produces a yellow that has a dip in the top,
 * then we can't use a binary search to get the max chroma. Take a look
 * at './the-yellow-dip-example.png' for an example of "the dip". The following
 * set of 'if' statements dramatically narrows the cases where we need to use
 * a linear search by narrow in on the smaller bracket of luminances
 * within each hue bracket where that luminance row intersects "the dip".
 * If the luminance row is outside of the bracketed problem area, It returns
 * null, indicating that binary search is safe. If it is in the problem area,
 * then return a chroma value indicating the highest chroma for that bracket.
 * Linear search can use that chroma value as the starting point from which
 * it can search from right to left for the first non-clipped color.
 *
 * The overall problem area is:
 *   H > 98.1 &&
 *   H < 106.6 &&
 *   L > 92.5 &&
 *   L < 98.3
 *
 * The overall max chroma for this area is 97.2.
 */
export const parseYellowProblem = (L: number, H: number): null | number => {
  if (!isBetween(H, 98.05, 106.6)) return null
  if (!isBetween(L, 92.45, 98.3)) return null

  if (H <= 98.5) {
    if (L > 92.95) return null
    else return 92.5
  }

  if (H <= 99) {
    if (L > 93.4 || L < 92.8) return null
    else return 93.05
  }

  if (H <= 99.5) {
    if (L > 93.85 || L < 93.2) return null
    else return 93.65
  }

  if (H <= 100) {
    if (L > 94.35 || L < 93.6) return null
    else return 94.0
  }

  if (H <= 100.5) {
    if (L > 94.8 || L < 94.0) return null
    else return 94.6
  }

  if (H <= 101) {
    if (L > 95.3 || L < 94.35) return null
    else return 95.05
  }

  if (H <= 101.5) {
    if (L > 95.8 || L < 94.7) return null
    else return 95.55
  }

  if (H <= 102) {
    if (L > 96.3 || L < 95.1) return null
    else return 96.15
  }

  if (H <= 102.5) {
    if (L > 96.8 || L < 95.45) return null
    else return 96.75
  }

  if (H <= 103) {
    if (L > 97.2 || L < 95.75) return null
    else return 97.0
  }

  if (H <= 103.5) {
    if (L > 97.3 || L < 96.1) return null
    else return 97.05
  }

  if (H <= 104) {
    if (L > 97.4 || L < 96.4) return null
    else return 97.05
  }

  if (H <= 104.5) {
    if (L > 97.55 || L < 96.7) return null
    else return 97.05
  }

  if (H <= 105) {
    if (L > 97.65 || L < 97.0) return null
    else return 97.1
  }

  if (H <= 105.5) {
    if (L > 97.8 || L < 97.3) return null
    else return 78
  }

  if (H <= 106) {
    if (L > 98.0 || L < 97.55) return null
    else return 70
  }

  if (H <= 106.5) {
    if (L > 98.15 || L < 97.8) return null
    else return 60
  }

  if (H <= 106.6) {
    if (L > 98.2 || L < 98.05) return null
    else return 52.55
  }

  return 97.2
}

const isBetween = (val: number, num1: number, num2: number) => {
  const min = Math.min(num1, num2)
  const max = Math.max(num1, num2)
  if (val < max && val > min) return true
  return false
}
