import { LCHObjType } from 'ThemeGenerator/types'
import { getMaxChroma, isDark, isSameHex, isSafe } from '.'

export const getNearestSafeColor = (
  color: LCHObjType,
  targetChroma?: number
) => {
  const { l, h } = color
  const sign = isDark(l) ? 1 : -1

  let step = sign === 1 ? 100 - color.l : color.l
  let currColor = { l, c: getMaxChroma(l, h), h }
  let safeColor = { l: isDark(l) ? 90 : 10, c: 0, h }

  while (true) {
    const maxChroma = getMaxChroma(currColor.l + step * sign, h)
    const _c =
      targetChroma !== undefined && targetChroma < maxChroma
        ? targetChroma
        : maxChroma

    const nextColor = {
      l: currColor.l + step * sign,
      c: _c,
      h,
    }

    const _isSameHex = isSameHex(currColor, nextColor)
    if (_isSameHex) break

    if (isSafe(nextColor, color)) {
      safeColor = { ...nextColor }
      step = step / 2
    } else {
      currColor = { ...nextColor }
    }
  }

  return safeColor
}
