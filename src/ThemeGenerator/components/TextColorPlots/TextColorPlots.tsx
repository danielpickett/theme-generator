import React, { useRef, useState } from 'react'
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
  const { lch: shadeColor } = useRecoilValue(colorDataSelector(shade))
  const textColors = useRecoilValue(textColorsSelector(shade))
  const [movableColor, setMovableColor] = useState<LCHObjType>({
    l: textColors['vivid-subdued'].lch.l,
    c: textColors['vivid-subdued'].lch.c,
    h: textColors['vivid-subdued'].lch.h,
  })
  const ref = useRef<HTMLDivElement>(null)

  const safeLum = safeLums[shade.shadeName]

  const textLumsArr = Object.values(textColors).map(({ lch }) => lch.l)
  const problem = textLumsArr.some((l) => l < safeLum.lum)

  return (
    <div className="TextColorPlots" ref={ref}>
      <Canvas hue={shadeColor.h} size={size} />
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
        style={{ bottom: shadeColor.l * size, left: shadeColor.c * size }}
      />
      <MovableColorDot
        color={movableColor}
        size={size}
        onColorChange={setMovableColor}
        sliderAreaRef={ref}
      >
        <div className="TextColorPlots__movable-dot" />
      </MovableColorDot>
    </div>
  )
}
