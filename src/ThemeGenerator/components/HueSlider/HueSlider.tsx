import React from 'react'
import './HueSlider.scss'
import { useRecoilState } from 'recoil'
import { hueAtom } from 'ThemeGenerator'

export const HueSlider = ({ scaleName }: { scaleName: string }) => {
  const [hue, setHue] = useRecoilState(hueAtom(scaleName))
  return (
    <div className="HueSlider">
      <p style={{ backgroundColor: 'tomato', color: 'white' }}>
        Hello from the HueSlider component
      </p>
    </div>
  )
}
