import React from 'react'
import classNames from 'classnames'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { SliderThumb2D } from 'ThemeGenerator/components'
import {
  textColorsPlotSizeAtom,
  vividTextChromaAtom,
  vividTextLuminanceAtom,
} from 'ThemeGenerator/state'
import { LCHObjType, ShadeType } from 'ThemeGenerator/types'
import './TextColorEditor.scss'
import { getColorData } from 'ThemeGenerator/utils'

export const TextColorEditor = ({
  shade,
  title,
  color,
  onColorChange,
  sliderAreaRef,
}: {
  shade: ShadeType
  title: string
  color: LCHObjType
  onColorChange: (color: LCHObjType) => void
  sliderAreaRef:
    | React.RefObject<HTMLDivElement>
    | React.MutableRefObject<HTMLDivElement>
}) => {
  const size = useRecoilValue(textColorsPlotSizeAtom)

  const setTextChroma = useSetRecoilState(vividTextChromaAtom(shade))
  const setTextLuminance = useSetRecoilState(vividTextLuminanceAtom(shade))

  const handleChange = (color: LCHObjType) => {
    setTextChroma(color.c)
    setTextLuminance(color.l)
  }

  return (
    <SliderThumb2D
      key={title}
      color={color}
      size={size}
      onColorChange={handleChange}
      sliderAreaRef={sliderAreaRef}
    >
      {(hasKeyboardFocus) => (
        <div
          className={classNames('TextColorEditor', {
            'TextColorEditor--has-keyboard-focus': hasKeyboardFocus,
          })}
        >
          <div className="TextColorEditor__tooltip">
            <div>{`h: ${color.h.toFixed(2)}`}</div>
          </div>
        </div>
      )}
    </SliderThumb2D>
  )
}
