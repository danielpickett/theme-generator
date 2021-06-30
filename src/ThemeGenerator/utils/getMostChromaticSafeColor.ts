import { LCHObjType } from 'ThemeGenerator/types'
import { contrast, isDark, getMaxChroma } from '.'

const resolution = 0.01

export const getMostChromaticSafeColor = (bgColor: LCHObjType) => {
  const sign = isDark(bgColor.l) ? 1 : -1
  const h = bgColor.h

  let step = 100 - bgColor.l
  let currentL = bgColor.l
  let nextColor = {
    l: bgColor.l,
    c: getMaxChroma(bgColor.l, h),
    h,
  }

  while (step >= resolution) {
    if (currentL > 100 || currentL < 0) {
      console.log('big problem')
      break
    }
    const nextStep = step / 2
    nextColor = {
      l: currentL + nextStep * sign,
      c: getMaxChroma(currentL + nextStep * sign, h),
      h,
    }

    const nextContrast = contrast(nextColor, bgColor)
    if (nextContrast >= 4.5) {
      step = nextStep
    } else {
      currentL = nextColor.l
    }
  }

  return nextColor
}
