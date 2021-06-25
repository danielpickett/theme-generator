import { canvasBaseWidth } from 'ThemeGenerator/config'
import { brightShadeNames } from 'ThemeGenerator/state'
import { LCHUnionType, ShadeNameType } from 'ThemeGenerator/types'
import { isClipped, toLCHObj } from 'ThemeGenerator/utils'

export const getSafeLuminance = (
  lch: LCHUnionType,
  shadeName: ShadeNameType
) => {
  let { l, c, h } = toLCHObj(lch)

  const resolution = 0.01
  const sign = shadeName in brightShadeNames ? -1 : 1
  let step = 100

  while (step >= resolution) {
    if (!isClipped({ l, h, c: c + step / 2 })) c = c + step / 2
    else step = step / 2
  }
  return null
}

const getMaxChroma = (luminance: number, hue: number) => {
  // 0.01 confirmed to be accurate across all hues
  const resolution = 0.01
  let chroma = 0
  let step = canvasBaseWidth

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
