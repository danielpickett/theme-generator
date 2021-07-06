import React, { useRef } from 'react'
import { useRecoilValue } from 'recoil'
import {
  maxPossibleLuminance,
  maxPossibleChromaForAnyHue,
  shadeNames,
  defaultLuminances,
} from 'ThemeGenerator/config'
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
        height: `${maxPossibleLuminance * size}px`,
        width: `${maxPossibleChromaForAnyHue * size}px`,
      }}
    >
      {shadeNames.slice(1).map((shadeName) => (
        <div
          key={shadeName}
          className="CanvasPointsOverlay__chroma-slider"
          style={{ bottom: defaultLuminances[shadeName] * size }}
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
