import chromajs from 'chroma-js'
import { AugmentedColor } from 'ThemeGenerator/types'
import { canvasBaseHeight, canvasBaseWidth } from 'ThemeGenerator/config'

const getColorDetails = (l: number, c: number, h: number) => {
  const color = chromajs.lch(l, c, h) as AugmentedColor

  return {
    hex: color.hex(),
    lch: { l, c, h },
    rgb: color.rgb(),
    clipped_lch: chromajs(color.css()).lch(),
    contrastOnWhite: chromajs.contrast(color, 'white'),
    isClipped: color.clipped(),
  }
}

const resolution = 0.05
const size = 1 / resolution
const height = size * canvasBaseHeight
const width = size * canvasBaseWidth

export const hueRangeHasSkips = (startHue: number, endHue: number) => {
  let hasSkips = false
  for (let hue = startHue; hue <= endHue; hue = hue + 0.1) {
    if (hueHasSkips(hue)) {
      hasSkips = true
    }
  }
  console.log('done')
  return hasSkips
}

const hueHasSkips = (hue: number) => {
  let prevColor = {
    hex: '#ffffff',
    lch: {
      l: 100,
      c: 0,
      h: 0,
    },
    rgb: [255, 255, 255],
    isClipped: false,
  }

  let hasSkips = false

  for (let L = height; L >= 0; L--) {
    for (let C = 0; C < width; C++) {
      const color = getColorDetails(L / size, C / size, hue)

      if (!color.isClipped) {
        if (
          C > 0 &&
          (Math.abs(color.rgb[0] - prevColor.rgb[0]) > 1 ||
            Math.abs(color.rgb[1] - prevColor.rgb[1]) > 1 ||
            Math.abs(color.rgb[2] - prevColor.rgb[2]) > 1)
        ) {
          hasSkips = true
        }
      } else break

      prevColor = color
    }
  }
  if (hasSkips) {
    console.log(`hue: ${hue} -------------------------- HAS SKIPS!!!`)
    return true
  } else {
    console.log(`hue: ${hue} - no skips`)
    return false
  }
}
