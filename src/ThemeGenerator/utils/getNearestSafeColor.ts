import { LCHObjType } from 'ThemeGenerator/types'
import { getMaxChroma, isDark, isSameColor } from '.'

export const getNearestSafeColor = (
  color: LCHObjType,
  maximizeChroma?: boolean
) => {
  const { l, c, h } = color
  const sign = isDark(l) ? 1 : -1

  let step = sign === 1 ? 100 - color.l : color.l
  let currColor = { l, c: getMaxChroma(l, h), h }
  let safeColor = { l: isDark(l) ? 100 : 0, c: 0, h }

  while (true) {
    const nextColor = {
      l: currColor.l + step * sign,
      c: maximizeChroma ? getMaxChroma(currColor.l + step * sign, h) : c,
      h,
    }

    if (isSameColor(currColor, nextColor)) break

    if (isSameColor(nextColor, color)) {
      safeColor = { ...nextColor }
      step = step / 2
    } else {
      currColor = { ...nextColor }
    }
  }

  return safeColor
}
