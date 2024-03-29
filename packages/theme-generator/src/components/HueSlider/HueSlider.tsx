import './HueSlider.scss'
import { useState } from 'react'
import classNames from 'classnames'
import { Slider } from 'src/components'
import sliderBackground from './lch-hue-picker-background.png'

export const HueSlider = ({
  hue,
  onHueChange,
}: {
  hue: number
  onHueChange: (newHue: number) => void
}) => {
  const [localHue, setLocalHue] = useState(hue)

  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false)
  return (
    <div className="HueSlider">
      <Slider
        value={localHue}
        onChange={(value) => {
          setLocalHue(value)
          onHueChange(value)
        }}
        max={360}
        microStep={0.1}
        macroStep={5}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onKeyboardFocus={() => setHasKeyboardFocus(true)}
        onKeyboardBlur={() => setHasKeyboardFocus(false)}
        track={
          <div
            className="HueSlider__track"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className={classNames('HueSlider__background', {
                'HueSlider__background--tall':
                  hasKeyboardFocus || isDragging || isHovered,
              })}
              style={{ backgroundImage: `url(${sliderBackground})` }}
            />
          </div>
        }
      >
        <div
          className={classNames('HueSlider__thumb', {
            'HueSlider__thumb--tall':
              hasKeyboardFocus || isDragging || isHovered,
            'HueSlider__thumb--has-keyboard-focus': hasKeyboardFocus,
          })}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </Slider>
    </div>
  )
}
