import React from 'react'
import './Scale.scss'
import { useRecoilState } from 'recoil'
import { Shade } from 'ThemeGenerator/components'
import { ColorScaleType } from 'ThemeGenerator/types'
import { scaleHueAtomFamily } from 'ThemeGenerator/state'
import { luminances } from 'ThemeGenerator/config'

export const Scale = ({ scale }: { scale: ColorScaleType }) => {
  const [scaleState, setScaleState] = useRecoilState(
    scaleHueAtomFamily({ id: scale.id, hue: scale.hue })
  )
  return (
    <div className="Scale">
      <input
        type="range"
        min={0}
        max={360}
        value={scaleState.hue}
        onChange={(e) => {
          console.log('hue change')
          setScaleState((prev) => ({ ...prev, hue: +e.target.value }))
        }}
      />
      <div className="Scale__shades">
        {scale.shades.map((shade, index) => (
          <Shade
            key={shade.id}
            shade={shade}
            hue={scaleState.hue}
            luminance={luminances[index]}
          />
        ))}
      </div>
    </div>
  )
}
