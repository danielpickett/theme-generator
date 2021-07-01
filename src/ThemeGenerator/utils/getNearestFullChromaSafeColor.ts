import { LCHObjType } from 'ThemeGenerator/types'
import { contrast, isDark, getMaxChroma } from '.'
import { getColorData } from './getColorData'

export const getNearestFullChromaSafeColor = (color: LCHObjType) => {
  const { l, h } = color
  const sign = isDark(l) ? 1 : -1

  let step = sign === 1 ? 100 - color.l : color.l
  let currColor = { l, c: getMaxChroma(l, h), h }
  let safeColor = { l: isDark(l) ? 100 : 0, c: 0, h }

  while (true) {
    const nextColor = {
      l: currColor.l + step * sign,
      c: getMaxChroma(currColor.l + step * sign, h),
      h,
    }

    const nextIsSame =
      getColorData(currColor).hex === getColorData(nextColor).hex

    const nextIsSafe = contrast(nextColor, color) >= 4.5

    if (nextIsSame) break
    if (nextIsSafe) {
      safeColor = { ...nextColor }
      step = step / 2
    } else {
      currColor = { ...nextColor }
    }
  }

  return safeColor
}
