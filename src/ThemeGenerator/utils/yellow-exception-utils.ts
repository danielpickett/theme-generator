// H > 98.1 &&
// H < 106.6 &&
// L > 92.5 &&
// L < 98.3

export const isProblemYellow = (L: number, H: number): false | number => {
  if (!isBetween(H, 98.05, 106.6)) return false
  if (!isBetween(L, 92.45, 98.3)) return false

  if (H <= 98.5) {
    if (L > 92.95) return false
    else return 92.5
  }

  if (H <= 99) {
    if (L > 93.4 || L < 92.8) return false
    else return 93.05
  }

  if (H <= 99.5) {
    if (L > 93.85 || L < 93.2) return false
    else return 93.65
  }

  if (H <= 100) {
    if (L > 94.35 || L < 93.6) return false
    else return 94.0
  }

  if (H <= 100.5) {
    if (L > 94.8 || L < 94.0) return false
    else return 94.6
  }

  if (H <= 101) {
    if (L > 95.3 || L < 94.35) return false
    else return 95.05
  }

  if (H <= 101.5) {
    if (L > 95.8 || L < 94.7) return false
    else return 95.55
  }

  if (H <= 102) {
    if (L > 96.3 || L < 95.1) return false
    else return 96.15
  }

  if (H <= 102.5) {
    if (L > 96.8 || L < 95.45) return false
    else return 96.75
  }

  if (H <= 103) {
    if (L > 97.2 || L < 95.75) return false
    else return 97.0
  }

  if (H <= 103.5) {
    if (L > 97.3 || L < 96.1) return false
    else return 97.05
  }

  if (H <= 104) {
    if (L > 97.4 || L < 96.4) return false
    else return 97.05
  }

  if (H <= 104.5) {
    if (L > 97.55 || L < 96.7) return false
    else return 97.05
  }

  if (H <= 105) {
    if (L > 97.65 || L < 97.0) return false
    else return 97.1
  }

  if (H <= 105.5) {
    if (L > 97.8 || L < 97.3) return false
    else return 78
  }

  if (H <= 106) {
    if (L > 98.0 || L < 97.55) return false
    else return 70
  }

  if (H <= 106.5) {
    if (L > 98.15 || L < 97.8) return false
    else return 60
  }

  if (H <= 106.6) {
    if (L > 98.2 || L < 98.05) return false
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

//95.10
