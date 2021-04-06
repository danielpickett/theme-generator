import React from 'react'
import { hueAtom, Shade, shadeNames } from 'internal'
import './Scale.scss'
import { useRecoilState } from 'recoil'

export const Scale = ({ scaleName }: { scaleName: string }) => {
  const [hue, setHue] = useRecoilState(hueAtom(scaleName))

  return (
    <div className="Scale">
      <div>
        {scaleName} - hue: {hue}
      </div>
      <input
        type="range"
        min={0}
        max={360}
        value={hue}
        onChange={(e) => setHue(+e.target.value)}
      />
      <div className="Scale__shades">
        {shadeNames.map((shadeName) => (
          <Shade key={shadeName} shade={{ scaleName, shadeName }} />
        ))}
        <br />
      </div>
    </div>
  )
}
