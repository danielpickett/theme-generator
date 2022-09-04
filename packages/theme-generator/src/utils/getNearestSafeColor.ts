import { LCHObjType } from 'src/types'
import { getMaxChroma, isDark, isSameHex, isSafe } from '.'

/**
 * Finds the color nearest to the 'color' param that will meet the
 * minimum WCAG contrast requirement of 4.5:1 (Level AA).
 * @link https://www.w3.org/TR/WCAG20-TECHS/G18.html}
 *
 * @param color - The background color for which you'd like to find
 * an accessible text color
 *
 * @param targetChroma - If provided, the resulting color will try to
 * match this chroma in its output color, or as close to it as possible.
 * If omitted, the resulting color will have the same chroma as the
 * input/background 'color' param, or as close to it as possible.
 *
 * @param targetHue - If provided, the resulting color will be of this hue.
 * If omitted, the resulting color will be the same hue as teh input/background
 * 'color' param.
 */

export const getNearestSafeColor = (
  color: LCHObjType,
  targetChroma?: number,
  targetHue?: number,
): LCHObjType => {
  const { l } = color
  const h = targetHue ? targetHue : color.h
  const sign = isDark(l) ? 1 : -1

  let step = isDark(l) ? 100 - color.l : color.l
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
