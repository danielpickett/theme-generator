import React from 'react'
import { useSetRecoilState } from 'recoil'
import {
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
  sliderAreaRef,
}: {
  shade: ShadeType
  title: string
  color: LCHObjType
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
      aria-label={title}
      sliderAreaRef={sliderAreaRef}
      onChange={handleChange}
    />
  )
}
