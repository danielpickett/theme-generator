import React from 'react'
import './Shade.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
import { colorDataPlusSelector, chromaAtom, ShadeType } from 'ThemeGenerator'
import { maxChromaSelector } from 'ThemeGenerator/state'

export const Shade = ({ shade }: { shade: ShadeType }) => {
  const [chroma, setChroma] = useRecoilState(chromaAtom(shade))
  const colorData = useRecoilValue(colorDataPlusSelector(shade))
  const maxChroma = useRecoilValue(maxChromaSelector(shade))
  const backgroundColor = chroma > maxChroma ? 'black' : colorData.hex
  // const backgroundColor = colorData.hex

  const handleChromaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value
    setChroma(value < maxChroma ? value : maxChroma)
  }

  return (
    <div
      className="Shade"
      style={{
        backgroundColor,
        color: colorData.lch.l > 65 ? 'black' : 'white',
        fontSize: '.75rem',
      }}
    >
      <div>{`${shade.scaleName}-${shade.shadeName}`}</div>
      <div>
        <pre>
          {`l: ${colorData.lch.l.toFixed(2)}\n`}
          {`c: ${colorData.lch.c.toFixed(2)}\n`}
          {`h: ${colorData.lch.h.toFixed(2)}\n`}
          {`${colorData.hex}\n`}
          {`${colorData.rgb.join()}\n`}
          {`${colorData.contrastOnWhite.toFixed(2)}\n`}
          {`${colorData.clipped_lch.map((n) => n.toFixed(2)).join()}\n`}

          {`maxChroma: ${maxChroma.toFixed(3)}`}
          <br />
          <input
            type="range"
            min={0}
            max={150}
            step={0.05}
            value={chroma}
            onChange={handleChromaChange}
          />
          <div style={{ height: '3rem', backgroundColor: colorData.hex }}>
            {colorData.rgb.join(' ')}
          </div>
        </pre>
      </div>
    </div>
  )
}
