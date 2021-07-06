import React, { useMemo, useRef } from 'react'
import './TextColorPlots.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
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
  const [vividTextColors, setVividTextColors] = useRecoilState(
    vividTextColorsSelector(shade)
  )

  const nearestSafeColor = useMemo(
    () =>
      // passing each value individual so the dependency array can watch each value
      // instead of just watching the reference value of the object itself.
      // I'm not 100% sure this is necessary.
      getNearestSafeColor({
        l: shadeColor.l,
        c: shadeColor.c,
        h: shadeColor.h,
      }),
    [shadeColor.l, shadeColor.c, shadeColor.h]
  )

  const ref = useRef<HTMLDivElement>(null)

  const handleChange = (changeColor: LCHObjType, debug?: boolean) => {
    const _changeColor = { ...changeColor }
    if (debug) debugger

    if (_changeColor.l > 100) _changeColor.l = 100
    if (_changeColor.l < 0) _changeColor.l = 0

    const maxChroma = getMaxChroma(_changeColor.l, _changeColor.h)
    if (_changeColor.c > maxChroma) _changeColor.c = maxChroma

    const _isSafe = isSafe(_changeColor, shadeColor)
    if (_isSafe) {
      setVividTextColors((prev) => ({
        ...prev,
        vivid: getColorData(_changeColor),
      }))
    } else {
      const _nearestSafeColor = getNearestSafeColor(shadeColor, _changeColor.c)

      setVividTextColors((prev) => ({
        ...prev,
        vivid: getColorData(_nearestSafeColor),
      }))
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
      <div
        className="TextColorPlots__line"
        style={{ bottom: nearestSafeColor.l * size }}
      />
      <div
        className="TextColorPlots__point TextColorPlots__point--black"
        style={{
          bottom: nearestSafeColor.l * size,
          left: nearestSafeColor.c * size,
        }}
      />

      {textColorsArr.map(([title, { lch: color }]) =>
        title === 'vivid' ? (
          <MovableColorDot
            key={title}
            color={color}
            size={size}
            onColorChange={handleChange}
            sliderAreaRef={ref}
          >
            {(hasKeyboardFocus) => (
              <div
                className={classNames(
                  'TextColorPlots__point TextColorPlots__point--movable TextColorPlots__point--large',
                  {
                    'TextColorPlots____point--has-keyboard-focus':
                      hasKeyboardFocus,
                  }
                )}
              >
                <div className="TextColorPlots__tooltip">
                  <div>{`h: ${getColorData(color).lch.h.toFixed(2)}`}</div>
                </div>
              </div>
            )}
          </MovableColorDot>
        ) : (
          <div
            key={title}
            className={classNames('TextColorPlots__point', {
              'TextColorPlots__point--large': !/subdued/.test(
                title.toLowerCase()
              ),
            })}
            title={`${title} text color`}
            style={{ left: color.c * size, bottom: color.l * size }}
          >
            {' '}
            <div className="TextColorPlots__tooltip">
              <div>{`h: ${getColorData(color).lch.h.toFixed(2)}`}</div>
            </div>
          </div>
        )
      )}

      <div
        className="TextColorPlots__point TextColorPlots__point--diamond  TextColorPlots__point--large"
        title="shade color"
        style={{ bottom: shadeColor.l * size, left: shadeColor.c * size }}
      />
    </div>
  )
}
