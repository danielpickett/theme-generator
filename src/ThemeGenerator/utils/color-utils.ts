import chromajs, { Color } from 'chroma-js'

type AugmentedColor = Color & { clipped: () => boolean }

export const getColorData = (l: number, c: number, h: number) => {
  const color = chromajs.lch(l, c, h) as AugmentedColor

  return {
    hex: color.hex(),
    lch: { l, c, h },
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
export const getMaxChroma = (
  luminance: number,
  hue: number,
  resolution: number = 0.005
) => {
  let chroma = 0
  let step = 150

  while (step >= resolution) {
    if (!isClipped({ l: luminance, h: hue, c: chroma + step / 2 }))
      chroma = chroma + step / 2
    else step = step / 2
  }

  return chroma
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
