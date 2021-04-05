import React from 'react'
import './Shade.scss'
import { useRecoilState } from 'recoil'
import { ChromaSlider } from 'ThemeGenerator/components'
import { ColorShadeType } from 'ThemeGenerator/types'
import { shadeAtomFamily } from 'ThemeGenerator/state'
import chromajs from 'chroma-js'

export const Shade = ({
  shade,
  luminance,
  hue,
}: {
  shade: ColorShadeType
  luminance: number
  hue: number
}) => {
  const [shadeState, setShadeState] = useRecoilState(shadeAtomFamily(shade))

  const bgColor = [luminance, shadeState.chroma, hue] as const
  const style = { backgroundColor: chromajs.lch(...bgColor).hex() }

  return (
    <div className="Shade" style={style}>
      {shade.id}
      <ChromaSlider shade={shadeState} onChromaChange={setShadeState} />
    </div>
  )
}
