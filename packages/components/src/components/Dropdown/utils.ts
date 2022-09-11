const ROOT_FONT_SIZE = Number.parseFloat(
  getComputedStyle(document.documentElement).fontSize
)

export const remToPixels = (rem: number) => rem * ROOT_FONT_SIZE
