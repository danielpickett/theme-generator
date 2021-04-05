import React, { useState } from 'react'
import './ThemeImporter.scss'
import { useRecoilCallback } from 'recoil'
import { ColorScaleType, scales } from 'internal'

export const ThemeImporter = () => {
  const [configInput, setConfigInput] = useState('')

  const handleApplyConfigClick = () => {
    updateConfig(scales, JSON.parse(configInput))
  }

  const updateConfig = useRecoilCallback<
    [ColorScaleType[], ColorScaleType[]],
    void
  >(({ set }) => {
    return (scales, configInput) => {
      console.log(scales, configInput)
    }
  }, [])

  return (
    <div className="ThemeImporter">
      <textarea
        className="ThemeImporter__text-area"
        style={{ display: 'block' }}
        value={configInput}
        onChange={({ target: { value } }) => setConfigInput(value)}
      />
      <button
        disabled={configInput === ''}
        type="button"
        className="ThemeImporter__button"
        onClick={handleApplyConfigClick}
        style={{ display: 'block' }}
      >
        Apply config
      </button>
    </div>
  )
}
