import React from 'react'
import { Canvas, hueAtom, Shade, shadeNames } from 'internal'
import './Scale.scss'
import { useRecoilState } from 'recoil'
import { CanvasPointsOverlay } from '../CanvasPointsOverlay'

export const Scale = ({ scaleName }: { scaleName: string }) => {
  const [hue, setHue] = useRecoilState(hueAtom(scaleName))

  return (
    <div className="Scale">
      <div className="Scale__controls">
        <div>
          <input
            type="range"
            step={10}
            min={0}
            max={360}
            value={hue}
            onChange={(e) => setHue(+e.target.value)}
          />
          <input
            type="number"
            step={0.1}
            min={0}
            max={360}
            value={hue}
            onChange={(e) => setHue(+e.target.value)}
          />
          <div>
            {scaleName} - hue: {hue}
          </div>
        </div>

        <div className="Scale__canvas">
          <Canvas hue={hue} />
          <div className="Scale__canvas-points-overlay">
            <CanvasPointsOverlay scaleName={scaleName} />
          </div>
        </div>
      </div>
      <div className="Scale__shades">
        {shadeNames.map((shadeName) => (
          <Shade key={shadeName} shade={{ scaleName, shadeName }} />
        ))}
      </div>
    </div>
  )
}
