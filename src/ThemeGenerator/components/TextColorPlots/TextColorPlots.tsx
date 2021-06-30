import React, { useRef, useState } from 'react'
import './TextColorPlots.scss'
import chromajs from 'chroma-js'
import { useRecoilValue } from 'recoil'
import {
  textColorsPlotSizeAtom,
  colorDataSelector,
  regularTextColorsSelector,
  vividTextColorsSelector,
} from 'ThemeGenerator/state'
import { LCHObjType, ShadeType } from 'ThemeGenerator/types'
import { Canvas } from 'ThemeGenerator/components'
import { MovableColorDot } from './components'
import {
  getColorData,
  getMaxChroma,
  getMostChromaticSafeColor,
} from 'ThemeGenerator/utils'

export const TextColorPlots = ({ shade }: { shade: ShadeType }) => {
  const size = useRecoilValue(textColorsPlotSizeAtom)
  const { lch: shadeColor } = useRecoilValue(colorDataSelector(shade))
  const regularTextColors = useRecoilValue(regularTextColorsSelector(shade))
  const vividTextColors = useRecoilValue(vividTextColorsSelector(shade))
  const [movableColor, setMovableColor] = useState<LCHObjType>({
    l: regularTextColors['regular'].lch.l,
    c: regularTextColors['regular'].lch.c,
    h: regularTextColors['regular'].lch.h,
  })
  const ref = useRef<HTMLDivElement>(null)

  const handleChange = ({ l, c, h }: LCHObjType) => {
    const maxChroma = getMaxChroma(l, h)
    setMovableColor({ l, c: c > maxChroma ? maxChroma : c, h })
  }

  const textColorsArr = Object.entries({
    ...regularTextColors,
    ...vividTextColors,
  })

  const mostChromaticSafeColor = getMostChromaticSafeColor(movableColor)

  return (
    <div className="TextColorPlots" ref={ref}>
      <Canvas hue={shadeColor.h} size={size} />
      {textColorsArr.map(([title, { lch: color }]) => (
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
      <div
        className="TextColorPlots__point TextColorPlots__point--black"
        style={{
          bottom: mostChromaticSafeColor.l * size,
          left: mostChromaticSafeColor.c * size,
        }}
      >
        <div className="TextColorPlots__tooltip">
          <div>L: {mostChromaticSafeColor.l.toFixed(2)}</div>
          <div>
            {chromajs
              .contrast(
                getColorData(movableColor).hex,
                getColorData(mostChromaticSafeColor).hex
              )
              .toFixed(2)}
          </div>
        </div>
      </div>
      <MovableColorDot
        color={movableColor}
        size={size}
        onColorChange={handleChange}
        sliderAreaRef={ref}
      >
        <div className="TextColorPlots__movable-dot">
          <div className="TextColorPlots__tooltip">
            <div>L: {movableColor.l} </div>
            <div>
              {chromajs
                .contrast(
                  getColorData(movableColor).hex,
                  getColorData(shadeColor).hex
                )
                .toFixed(2)}
            </div>
          </div>
        </div>
      </MovableColorDot>
    </div>
  )
}
