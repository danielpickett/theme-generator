import React from 'react'
import { useRecoilValue } from 'recoil'
import {
  Canvas,
  colorDataSelector,
  ShadeType,
  textColorsPlotSizeAtom,
  textColorsSelector,
  safeLums,
} from 'ThemeGenerator'
import './TextColorPlots.scss'

export const TextColorPlots = ({ shade }: { shade: ShadeType }) => {
  const size = useRecoilValue(textColorsPlotSizeAtom)
  const { lch: swatch } = useRecoilValue(colorDataSelector(shade))
  const textColors = useRecoilValue(textColorsSelector(shade))

  const safeLum = safeLums[shade.shadeName]

  const textLumsArr = Object.values(textColors).map(({ lch }) => lch.l)
  const problem = textLumsArr.some((l) => l < safeLum.lum)

  return (
    <div className="TextColorPlots">
      <Canvas hue={swatch.h} size={size} />
      <div
        className="TextColorPlots__safe-line"
        style={{ bottom: safeLums[shade.shadeName].lum * size }}
      />
      <div className="TextColorPlots__problem-badge">
        {problem && 'problem'}
      </div>
      {Object.entries(textColors).map(([title, { lch: color }]) => (
        <div
          key={title}
          className="TextColorPlots__point"
          title={`${title} text color`}
          style={{ left: color.c * size, bottom: color.l * size }}
        />
      ))}

      <div
        className="TextColorPlots__point TextColorPlots__point--diamond"
        title="shade color"
        style={{ bottom: swatch.l * size, left: swatch.c * size }}
      />
    </div>
  )
}