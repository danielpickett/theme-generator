import React, { useRef } from 'react'
import { useRecoilValue } from 'recoil'
import {
  MAX_POSSIBLE_LUMINANCE,
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
  SHADE_NAMES,
  DEFAULT_LUMINANCES,
} from 'ThemeGenerator/constants'
import { ChromaSlider } from 'ThemeGenerator/components'

import './CanvasPointsOverlay.scss'
import { ShadeType } from 'ThemeGenerator/types'
import { chromaAtom } from 'ThemeGenerator/state'

export const CanvasPointsOverlay = ({
  scaleName,
  size,
}: {
  scaleName: string
  size: number
}) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className="CanvasPointsOverlay"
      style={{
        height: `${MAX_POSSIBLE_LUMINANCE * size}px`,
        width: `${MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size}px`,
      }}
    >
      {SHADE_NAMES.slice(1).map((shadeName) => (
        <div
          key={shadeName}
          className="CanvasPointsOverlay__chroma-slider"
          style={{ bottom: DEFAULT_LUMINANCES[shadeName] * size }}
        >
          <TargetChromaDot shade={{ shadeName, scaleName }} size={size} />
          <ChromaSlider shade={{ scaleName, shadeName }} />
        </div>
      ))}
    </div>
  )
}

const TargetChromaDot = ({
  shade,
  size,
}: {
  shade: ShadeType
  size: number
}) => {
  const targetChroma = useRecoilValue(chromaAtom(shade))
  return (
    <div
      className="CanvasPointsOverlay__target-chroma"
      style={{ left: targetChroma * size }}
    />
  )
}
