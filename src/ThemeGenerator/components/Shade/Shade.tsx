import React from 'react'
import './Shade.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
import { colorDataSelector, chromaAtom, ShadeType } from 'internal'
import { maxChromaSelector } from 'ThemeGenerator/state'

export const Shade = ({ shade }: { shade: ShadeType }) => {
  const [chroma, setChroma] = useRecoilState(chromaAtom(shade))
  const colorData = useRecoilValue(colorDataSelector(shade))
  const maxChroma = useRecoilValue(maxChromaSelector(shade))
  const backgroundColor = colorData.isClipped ? 'black' : colorData.hex

  const handleChromaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value
    setChroma(value < maxChroma ? value : maxChroma)
  }

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
          {`l: ${colorData.lch.l}\n`}
          {`c: ${colorData.lch.c}\n`}
          {`h: ${colorData.lch.h}\n`}
          {`${colorData.hex}\n`}
          {`${colorData.rgb.join()}`}
          {/* {`maxChroma: ${maxChroma.toFixed(3)}`} */}
          <br />
          <input
            type="range"
            min={0}
            max={150}
            step={0.1}
            value={chroma}
            onChange={handleChromaChange}
          />
        </pre>
      </div>
    </div>
  )
}
