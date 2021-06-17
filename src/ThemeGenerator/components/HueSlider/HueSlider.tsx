import React, { useState } from 'react'
import classNames from 'classnames'
import { Slider } from 'ThemeGenerator'
import './HueSlider.scss'
import sliderBackground from './lch-hue-picker-background.png'
import { useRecoilState } from 'recoil'
import { hueAtom } from 'ThemeGenerator/state'

export const HueSlider = ({ scaleName }: { scaleName: string }) => {
  const [hue, setHue] = useRecoilState(hueAtom(scaleName))
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false)
  return (
    <div
      className="HueSlider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Slider
        value={hue}
        onChange={setHue}
        max={360}
        microStep={0.1}
        macroStep={5}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onKeyboardFocus={() => setHasKeyboardFocus(true)}
        onKeyboardBlur={() => setHasKeyboardFocus(false)}
        track={
          <div
            className={classNames('HueSlider__track', {
              'HueSlider__track--tall':
                hasKeyboardFocus || isDragging || isHovered,
            })}
            style={{ backgroundImage: `url(${sliderBackground})` }}
          />
        }
      >
        <div
          className={classNames('HueSlider__thumb', {
            'HueSlider__thumb--tall':
              hasKeyboardFocus || isDragging || isHovered,
            'HueSlider__thumb--has-keyboard-focus': hasKeyboardFocus,
          })}
        />
      </Slider>
    </div>
  )
}
