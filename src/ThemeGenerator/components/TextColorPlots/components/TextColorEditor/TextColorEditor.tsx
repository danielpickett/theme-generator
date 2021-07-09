import React from 'react'
import { useSetRecoilState } from 'recoil'
import {
  vividTextChromaAtom,
  vividTextLuminanceAtom,
} from 'ThemeGenerator/state'
import { FirstOrLastShadeType, LCHObjType } from 'ThemeGenerator/types'
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
  shade: FirstOrLastShadeType
  title: string
  color: LCHObjType
  sliderAreaRef:
    | React.RefObject<HTMLDivElement>
    | React.MutableRefObject<HTMLDivElement>
}) => {
  const setTextChroma = useSetRecoilState(vividTextChromaAtom(shade))
  const setTextLuminance = useSetRecoilState(vividTextLuminanceAtom(shade))

  const handleChange = ([chroma, luminance]: [number, number]) => {
    requestAnimationFrame(() => {
      setTextChroma(chroma)
      setTextLuminance(luminance)
    })
  }

  return (
    <SliderThumb2D
      maxXY={[maxPossibleChromaForAnyHue, maxPossibleLuminance]}
      allowFloat
      xy={[color.c, color.l]}
      aria-label={title}
      sliderAreaRef={sliderAreaRef}
      onChange={handleChange}
    />
  )
}
