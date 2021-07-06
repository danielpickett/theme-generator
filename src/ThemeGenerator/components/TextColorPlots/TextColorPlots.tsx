import React, { useMemo, useRef, useState } from 'react'
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
  getNearestSafeColor,
} from 'ThemeGenerator/utils'
import {
  maxPossibleChromaForAnyHue,
  maxPossibleLuminance,
} from 'ThemeGenerator/config'
import classNames from 'classnames'
import { isSafe } from 'ThemeGenerator/utils/isSafe'

export const TextColorPlots = ({ shade }: { shade: ShadeType }) => {
  const size = useRecoilValue(textColorsPlotSizeAtom)
  const { lch: shadeColor } = useRecoilValue(colorDataSelector(shade))
  const regularTextColors = useRecoilValue(regularTextColorsSelector(shade))
  const vividTextColors = useRecoilValue(vividTextColorsSelector(shade))

  const { l, c, h } = shadeColor
  const nearestSafeColor = useMemo(
    () => getNearestSafeColor({ l, c, h }),
    [l, c, h]
  )

  const [movableColor, setMovableColor] = useState<LCHObjType>({
    ...nearestSafeColor,
  })
  const ref = useRef<HTMLDivElement>(null)

  console.log()

  const handleChange = (changeColor: LCHObjType, debug?: boolean) => {
    const _changeColor = { ...changeColor }
    if (debug) debugger

    if (_changeColor.l > 100) _changeColor.l = 100
    if (_changeColor.l < 0) _changeColor.l = 0

    const maxChroma = getMaxChroma(_changeColor.l, _changeColor.h)
    if (_changeColor.c > maxChroma) _changeColor.c = maxChroma

    console.log('change', _changeColor)
    const _isSafe = isSafe(_changeColor, shadeColor)
    if (_isSafe) {
      setMovableColor(_changeColor)
    } else {
      const _nearestSafeColor = getNearestSafeColor(shadeColor, _changeColor.c)
      console.log('nearest', _nearestSafeColor)
      setMovableColor(_nearestSafeColor)
    }
  }

  const textColorsArr = Object.entries({
    ...regularTextColors,
    ...vividTextColors,
  })

  return (
    <div
      className="TextColorPlots"
      ref={ref}
      style={{
        height: `${maxPossibleLuminance * size}px`,
        width: `${maxPossibleChromaForAnyHue * size}px`,
      }}
    >
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
          bottom: nearestSafeColor.l * size,
          left: nearestSafeColor.c * size,
        }}
      >
        <div className="TextColorPlots__tooltip">
          <div>L: {nearestSafeColor.l.toFixed(2)}</div>
          <div>C: {nearestSafeColor.c.toFixed(2)}</div>
          <div>H: {nearestSafeColor.h.toFixed(2)}</div>
        </div>
      </div>
      <MovableColorDot
        color={movableColor}
        size={size}
        onColorChange={handleChange}
        sliderAreaRef={ref}
      >
        {(hasKeyboardFocus) => (
          <div
            className={classNames('TextColorPlots__movable-dot', {
              'TextColorPlots__movable-dot--has-keyboard-focus':
                hasKeyboardFocus,
            })}
          >
            <div className="TextColorPlots__tooltip">
              <div>L: {movableColor.l.toFixed(2)}</div>
              <div>C: {movableColor.c.toFixed(2)}</div>
              <div>H: {movableColor.h.toFixed(2)}</div>
              <div>
                con:{' '}
                {chromajs
                  .contrast(
                    getColorData(movableColor).hex,
                    getColorData(shadeColor).hex
                  )
                  .toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </MovableColorDot>
    </div>
  )
}
