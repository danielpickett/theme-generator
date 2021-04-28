import React from 'react'
import './Shade.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
import { colorDataPlusSelector, chromaAtom, ShadeType } from 'internal'
import { maxChromaSelector } from 'ThemeGenerator/state'

export const Shade = ({ shade }: { shade: ShadeType }) => {
  const [chroma, setChroma] = useRecoilState(chromaAtom(shade))
  const colorData = useRecoilValue(colorDataPlusSelector(shade))
  const maxChroma = useRecoilValue(maxChromaSelector(shade))
  // const backgroundColor = colorData.isClipped ? 'black' : colorData.hex
  const backgroundColor = colorData.hex

  const handleChromaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value
    setChroma(value < maxChroma ? value : maxChroma)
    // setChroma(value)
  }

  return (
    <div
      className="Shade"
      style={{
        backgroundColor,
        color: colorData.lch.l > 65 ? 'black' : 'white',
        fontSize: '1rem',
      }}
    >
      <div>{`${shade.scaleName}-${shade.shadeName}`}</div>
      <div>
        <pre>
          {`l: ${colorData.lch.l.toFixed(3)}\n`}
          {`c: ${colorData.lch.c.toFixed(3)}\n`}
          {`h: ${colorData.lch.h.toFixed(3)}\n`}
          {`${colorData.hex}\n`}
          {`${colorData.rgb.join()}\n`}
          {`${colorData.contrastOnWhite.toFixed(3)}\n`}

          {`maxChroma: ${maxChroma.toFixed(3)}`}
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
