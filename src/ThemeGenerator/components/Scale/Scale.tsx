import React from 'react'
import { Canvas, hueAtom, Shade, shadeNames } from 'internal'
import './Scale.scss'
import { useRecoilState } from 'recoil'

export const Scale = ({ scaleName }: { scaleName: string }) => {
  const [hue, setHue] = useRecoilState(hueAtom(scaleName))

  return (
    <div className="Scale">
      <div className="Scale__controls">
        <input
          type="range"
          min={0}
          max={360}
          value={hue}
          onChange={(e) => setHue(+e.target.value)}
        />
        <div>
          {scaleName} - hue: {hue}
        </div>
        <Canvas hue={hue} />
      </div>
      <div className="Scale__shades">
        {shadeNames.map((shadeName) => (
          <Shade key={shadeName} shade={{ scaleName, shadeName }} />
        ))}
      </div>
    </div>
  )
}
