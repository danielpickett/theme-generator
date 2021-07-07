import React, { useRef } from 'react'
import classNames from 'classnames'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { SliderThumb2DOld } from 'ThemeGenerator/components'
import {
  textColorsPlotSizeAtom,
  vividTextChromaAtom,
  vividTextLuminanceAtom,
} from 'ThemeGenerator/state'
import { LCHObjType, ShadeType } from 'ThemeGenerator/types'
import './TextColorEditor.scss'
import { SliderThumb2D } from 'ThemeGenerator/component-library'
import {
  maxPossibleChromaForAnyHue,
  maxPossibleLuminance,
} from 'ThemeGenerator/config'

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
  const setTextChroma = useSetRecoilState(vividTextChromaAtom(shade))
  const setTextLuminance = useSetRecoilState(vividTextLuminanceAtom(shade))

  const handleChange = ([chroma, luminance]: [number, number]) => {
    setTextChroma(chroma)
    setTextLuminance(luminance)
  }

  return (
    <SliderThumb2D
      maxXY={[maxPossibleChromaForAnyHue, maxPossibleLuminance]}
      xy={[color.c, color.l]}
      aria-label="text color adjustment"
      sliderAreaRef={sliderAreaRef}
      onChange={handleChange}
    />
  )
}
