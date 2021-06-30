import chromajs from 'chroma-js'
import { maxPossibleLuminance, safeContrast } from 'ThemeGenerator/config'
import { LCHObjType, LCHUnionType } from 'ThemeGenerator/types'
import {
  getColorData,
  toLCHObj,
  isDark,
  getMaxChroma,
} from 'ThemeGenerator/utils'

export const getMostChromaticSafeColor = (bgColor: LCHObjType) => {
  return isDark(bgColor.l)
    ? getMostChromaticSafeColor__DARK(bgColor)
    : getMostChromaticSafeColor__LIGHT(bgColor)
}

const resolution = 0.01

const getMostChromaticSafeColor__DARK = (bgColor: LCHObjType) => {
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
      l: currentL + nextStep,
      c: getMaxChroma(currentL + nextStep, h),
      h,
    }

    const nextContrast = chromajs.contrast(
      getColorData(nextColor).hex,
      getColorData(bgColor).hex
    )
    if (nextContrast >= 4.5) {
      step = nextStep
    } else {
      currentL = nextColor.l
    }
  }

  const result = { ...nextColor }
  const finalContrast = chromajs.contrast(
    getColorData(result).hex,
    getColorData(bgColor).hex
  )
  console.log(finalContrast)
  return result
}

const getMostChromaticSafeColor__LIGHT = (bgColor: LCHObjType) => {
  return { l: 0, c: 0, h: bgColor.h }
}
