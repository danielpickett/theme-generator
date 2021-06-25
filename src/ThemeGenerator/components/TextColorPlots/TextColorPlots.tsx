import React, { useState } from 'react'
import './TextColorPlots.scss'
import { useRecoilValue } from 'recoil'
import {
  textColorsPlotSizeAtom,
  colorDataSelector,
  textColorsSelector,
  safeLums,
} from 'ThemeGenerator/state'
import { LCHObjType, ShadeType } from 'ThemeGenerator/types'
import { Canvas } from 'ThemeGenerator/components'
import { MovableColorDot } from './components'

export const TextColorPlots = ({ shade }: { shade: ShadeType }) => {
  const size = useRecoilValue(textColorsPlotSizeAtom)
  const { lch: swatch } = useRecoilValue(colorDataSelector(shade))
  const textColors = useRecoilValue(textColorsSelector(shade))
  const [movableColor, setMovableColor] = useState<LCHObjType>({
    l: textColors.regular.lch.l,
    c: textColors.regular.lch.c,
    h: textColors.regular.lch.h,
  })

  const safeLum = safeLums[shade.shadeName]

  const textLumsArr = Object.values(textColors).map(({ lch }) => lch.l)
  const problem = textLumsArr.some((l) => l < safeLum.lum)

  return (
    <div className="TextColorPlots">
      <Canvas hue={swatch.h} size={size} />
      {/* <div
        className="TextColorPlots__safe-line"
        style={{ bottom: safeLums[shade.shadeName].lum * size }}
      /> */}
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
      <MovableColorDot
        color={movableColor}
        size={size}
        onColorChange={setMovableColor}
      />
    </div>
  )
}
