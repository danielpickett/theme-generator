import React from 'react'
import {
  Canvas,
  CanvasKnockoutAttempt,
  hueAtom,
  Shade,
  shadeNames,
} from 'internal'
import './Scale.scss'
import { useRecoilState } from 'recoil'

export const Scale = ({ scaleName }: { scaleName: string }) => {
  const [hue, setHue] = useRecoilState(hueAtom(scaleName))

  return (
    <div className="Scale">
      <div className="Scale__controls">
        <div>
          {scaleName} - hue: {hue}
        </div>
        <Canvas hue={hue} />
        <div style={{ marginBottom: '0.5rem' }} />
        <CanvasKnockoutAttempt hue={hue} />
        <input
          type="range"
          min={0}
          max={360}
          value={hue}
          onChange={(e) => setHue(+e.target.value)}
        />
      </div>
      <div className="Scale__shades">
        {shadeNames.map((shadeName) => (
          <Shade key={shadeName} shade={{ scaleName, shadeName }} />
        ))}
        <br />
      </div>
    </div>
  )
}
