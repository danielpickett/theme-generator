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

const getMostChromaticSafeColor__DARK = (bgColor: LCHObjType) => {
  const h = bgColor.h
  const bgL = bgColor.l
  const bgHex = getColorData(bgColor).hex

  const resolution = 0.01

  let currentL = bgL
  let step = 100 - bgL

  while (step >= resolution) {
    if (currentL > 100 || currentL < 0) debugger
    const nextStep = step / 2
    const nextL = currentL + nextStep
    const nextC = getMaxChroma(nextL, h)
    const nextColor = { l: nextL, c: nextC, h }

    const nextContrast = chromajs.contrast(getColorData(nextColor).hex, bgHex)
    if (nextContrast >= 4.5) {
      step = nextStep
    } else {
      currentL = nextL
    }
  }

  const result = { l: currentL, c: getMaxChroma(currentL, h), h }
  const finalContrast = chromajs.contrast(getColorData(result).hex, bgHex)
  console.log(finalContrast)
  return result
}

const getMostChromaticSafeColor__LIGHT = (bgColor: LCHObjType) => {
  return { l: 0, c: 0, h: bgColor.h }
}
