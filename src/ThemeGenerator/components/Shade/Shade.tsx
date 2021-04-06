import React from 'react'
import './Shade.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
import { colorDataSelector, chromaAtom, ShadeType } from 'internal'

export const Shade = ({ shade }: { shade: ShadeType }) => {
  const [chroma, setChroma] = useRecoilState(chromaAtom(shade))
  const colorData = useRecoilValue(colorDataSelector(shade))
  const backgroundColor = colorData.isClipped ? 'black' : colorData.hex

  return (
    <div
      className="Shade"
      style={{
        backgroundColor,
        color: 'grey',
        fontSize: '1rem',
      }}
    >
      <div>{`${shade.scaleName}-${shade.shadeName}`}</div>
      <div>
        <pre>
          {colorData.lch.l}
          {'\n'}
          {colorData.lch.c}
          {'\n'}
          {colorData.lch.h}
          {'\n'}
          {colorData.hex}
          {'\n'}
          {chroma}
          <br />
          <input
            type="range"
            min={0}
            max={150}
            value={chroma}
            onChange={(e) => setChroma(+e.target.value)}
          />
        </pre>
      </div>
    </div>
  )
}
