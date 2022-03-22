import { useRef } from 'react'
import { useRecoilValue } from 'recoil'
import {
  SHADE_NAMES,
  DEFAULT_LUMINANCES,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DEFAULT_CANVAS_SIZE,
} from 'ThemeGenerator/constants'
import { ChromaSlider } from 'ThemeGenerator/components'

import './CanvasPointsOverlay.scss'
import { ShadeType } from 'ThemeGenerator/types'
import { chromaAtom } from 'ThemeGenerator/state'

export const CanvasPointsOverlay = ({ scaleName }: { scaleName: string }) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className="CanvasPointsOverlay"
      style={{
        height: `${CANVAS_HEIGHT}px`,
        width: `${CANVAS_WIDTH}px`,
      }}
    >
      {SHADE_NAMES.slice(1).map((shadeName) => (
        <div
          key={shadeName}
          className="CanvasPointsOverlay__chroma-slider"
          style={{
            bottom: DEFAULT_LUMINANCES[shadeName] * DEFAULT_CANVAS_SIZE,
          }}
        >
          <TargetChromaDot shade={{ shadeName, scaleName }} />
          <ChromaSlider shade={{ scaleName, shadeName }} />
        </div>
      ))}
    </div>
  )
}

const TargetChromaDot = ({ shade }: { shade: ShadeType }) => {
  const targetChroma = useRecoilValue(chromaAtom(shade))
  return (
    <div
      className="CanvasPointsOverlay__target-chroma"
      style={{ left: targetChroma * DEFAULT_CANVAS_SIZE }}
    />
  )
}
