import { LCHObjType } from 'ThemeGenerator/types'
import { contrast, isDark, getMaxChroma } from '.'
import { getColorData } from './getColorData'

const resolution = 0.01

export const getMostChromaticSafeColorBackup = (
  bgColor: LCHObjType,
  debugCount?: number
) => {
  const sign = isDark(bgColor.l) ? 1 : -1
  const h = bgColor.h

  let count = 0
  let step = sign === 1 ? 100 - bgColor.l : bgColor.l
  let currColor = {
    l: bgColor.l,
    c: getMaxChroma(bgColor.l, h),
    h,
  }
  let nextColor = {
    l: bgColor.l,
    c: getMaxChroma(bgColor.l, h),
    h,
  }

  while (step >= resolution) {
    if (debugCount === count) debugger
    count++
    if (currColor.l > 100 || currColor.l < 0) {
      console.log('big problem')
      break
    }
    const currColorContrast = contrast(currColor, bgColor)
    console.log(currColorContrast)
    const nextStep = step / 2
    nextColor = {
      l: currColor.l + nextStep * sign,
      c: getMaxChroma(currColor.l + nextStep * sign, h),
      h,
    }

    const currHex = getColorData(currColor).hex
    const nextHex = getColorData(nextColor).hex
    if (currHex === nextHex) {
      const currColorContrast = contrast(currColor, bgColor)
      const nextContrast = contrast(nextColor, bgColor)
      console.log(currColorContrast, nextContrast)
      break
    }
    const nextContrast = contrast(nextColor, bgColor)
    console.log(currColorContrast, nextContrast)
    if (nextContrast >= 4.5) {
      step = nextStep
    } else {
      currColor = { ...nextColor }
    }
  }
  console.log(count)
  const currColorHex = getColorData(currColor).hex
  const currColorContrast = contrast(currColor, bgColor)
  const nextColorHex = getColorData(nextColor).hex
  const nextColorContrast = contrast(nextColor, bgColor)
  const resultColor = sign === 1 ? nextColor : currColor
  const resContrast = contrast(resultColor, bgColor)

  console.log(resContrast)

  return resultColor
}
