export const universalYellowChromaLimit = 97.2

export const isYellow = (hue: number) => isBetween(hue, 98.05, 106.6)

/**
 * If this particular hue produces ayellow that has a dip in the top,
 * then we can't use a binary search to get the max chroma. This set
 * of if statements dramatically narrows the cases where we need to use
 * a linear search by narrow in on the smaller bracket of luminances
 * within each hue bracket where that luminance row intersects "the dip".
 * If the luminance row is outside of the bracketed problem area, It returns
 * null, indicating that binary search is safe. If it is in the problem area,
 * then return a chroma value indicating the highest chroma for that bracket.
 * Linear search can use that chroma value as the starting point from which
 * it can search from right to left for the first non-clipped color.
 *
 * The overall problem area is:
 *   H > 98.1 &&
 *   H < 106.6 &&
 *   L > 92.5 &&
 *   L < 98.3
 *
 * The overall max chroma for this area is 97.2.
 *
 *
 */
export const parseYellowProblem = (L: number, H: number): null | number => {
  if (!isBetween(H, 98.05, 106.6)) return null
  if (!isBetween(L, 92.45, 98.3)) return null

  if (H <= 98.5) {
    if (L > 92.95) return null
    else return 92.5
  }

  if (H <= 99) {
    if (L > 93.4 || L < 92.8) return null
    else return 93.05
  }

  if (H <= 99.5) {
    if (L > 93.85 || L < 93.2) return null
    else return 93.65
  }

  if (H <= 100) {
    if (L > 94.35 || L < 93.6) return null
    else return 94.0
  }

  if (H <= 100.5) {
    if (L > 94.8 || L < 94.0) return null
    else return 94.6
  }

  if (H <= 101) {
    if (L > 95.3 || L < 94.35) return null
    else return 95.05
  }

  if (H <= 101.5) {
    if (L > 95.8 || L < 94.7) return null
    else return 95.55
  }

  if (H <= 102) {
    if (L > 96.3 || L < 95.1) return null
    else return 96.15
  }

  if (H <= 102.5) {
    if (L > 96.8 || L < 95.45) return null
    else return 96.75
  }

  if (H <= 103) {
    if (L > 97.2 || L < 95.75) return null
    else return 97.0
  }

  if (H <= 103.5) {
    if (L > 97.3 || L < 96.1) return null
    else return 97.05
  }

  if (H <= 104) {
    if (L > 97.4 || L < 96.4) return null
    else return 97.05
  }

  if (H <= 104.5) {
    if (L > 97.55 || L < 96.7) return null
    else return 97.05
  }

  if (H <= 105) {
    if (L > 97.65 || L < 97.0) return null
    else return 97.1
  }

  if (H <= 105.5) {
    if (L > 97.8 || L < 97.3) return null
    else return 78
  }

  if (H <= 106) {
    if (L > 98.0 || L < 97.55) return null
    else return 70
  }

  if (H <= 106.5) {
    if (L > 98.15 || L < 97.8) return null
    else return 60
  }

  if (H <= 106.6) {
    if (L > 98.2 || L < 98.05) return null
    else return 52.55
  }

  return 97.2
}

const isBetween = (val: number, num1: number, num2: number) => {
  const min = Math.min(num1, num2)
  const max = Math.max(num1, num2)
  if (val < max && val > min) return true
  return false
}
