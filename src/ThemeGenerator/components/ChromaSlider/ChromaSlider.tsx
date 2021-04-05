import React, { ChangeEvent } from 'react'
import './ChromaSlider.scss'
import { ColorShadeType } from 'ThemeGenerator/types'

export const ChromaSlider = ({
  shade,
  onChromaChange,
}: {
  shade: ColorShadeType
  onChromaChange: (newShade: ColorShadeType) => void
}) => {
  const handleChromaChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChromaChange({ ...shade, chroma: +e.target.value })
  }

  return (
    <div className="ChromaSlider">
      <input
        type="range"
        min={0}
        max={150}
        value={shade.chroma}
        onChange={handleChromaChange}
      />
    </div>
  )
}
