import './TextColorEditor.scss'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import {
  vividTextChromaAtom,
  vividTextLuminanceAtom,
} from 'ThemeGenerator/state'
import { FirstOrLastShadeType, LCHObjType } from 'ThemeGenerator/types'
import { SliderThumb2D } from 'ThemeGenerator/component-library'
import {
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
  MAX_POSSIBLE_LUMINANCE,
} from 'ThemeGenerator/constants'

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
      maxXY={[MAX_POSSIBLE_CHROMA_FOR_ANY_HUE, MAX_POSSIBLE_LUMINANCE]}
      allowFloat
      xy={[color.c, color.l]}
      aria-label={title}
      sliderAreaRef={sliderAreaRef}
      onChange={handleChange}
    />
  )
}
