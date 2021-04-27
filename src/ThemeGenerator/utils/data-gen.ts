import { getColorDataPlus } from 'internal'

const resolution = 0.05
const size = 1 / resolution
const height = size * 100
const width = size * 150

export const checkHueRangeForSKips = () => {
  for (let hue = 98; hue <= 107; hue = hue + 0.1) {
    checkHueForSkips(hue)
  }
  console.log('done')
}

const checkHueForSkips = (hue: number) => {
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
    // if (L % 100 === 0) console.log(hue, L)
    for (let C = 0; C < width; C++) {
      const color = getColorDataPlus(L / size, C / size, hue)

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
  if (hasSkips)
    console.log(`hue: ${hue} -------------------------- HAS SKIPS!!!`)
  else console.log(`hue: ${hue} - no skips`)
}
