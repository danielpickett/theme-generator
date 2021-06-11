import React, { useRef, useState } from 'react'
import './HueSlider.scss'
import { useRecoilState } from 'recoil'
import { hueAtom, SliderThumb } from 'ThemeGenerator'
import sliderBackground from './lch-hue-picker-background.png'
import classNames from 'classnames'

export const HueSlider = ({ scaleName }: { scaleName: string }) => {
  const sliderTrackRef = useRef<HTMLDivElement>(null)
  const [hasKeyboardFocusWithin, setHasKeyboardFocusWithin] = useState(false)
  const [isDraggingWithin, setIsDraggingWithin] = useState(false)
  const [hue, setHue] = useRecoilState(hueAtom(scaleName))

  return (
    <div
      className={classNames('HueSlider', {
        'HueSlider--has-keyboard-focus-within': hasKeyboardFocusWithin,
        'HueSlider--is-dragging-within': isDraggingWithin,
      })}
    >
      <div
        className="HueSlider__track"
        ref={sliderTrackRef}
        style={{ backgroundImage: `url(${sliderBackground})` }}
      >
        <SliderThumb
          value={hue}
          min={0}
          max={360}
          step={1}
          microStepMultiplier={0.1}
          macroStepMultiplier={10}
          sliderTrackRef={sliderTrackRef}
          aria-label="my slider"
          onChange={(newValue) => setHue(newValue)}
          onKeyboardFocus={() => setHasKeyboardFocusWithin(true)}
          onKeyboardBlur={() => setHasKeyboardFocusWithin(false)}
          onDragStart={() => setIsDraggingWithin(true)}
          onDragEnd={() => setIsDraggingWithin(false)}
        >
          {({ hasKeyboardFocus }) => {
            return (
              <div
                className={classNames('HueSlider__thumb', {
                  'HueSlider__thumb--has-keyboard-focus': hasKeyboardFocus,
                })}
              />
            )
          }}
        </SliderThumb>
      </div>
    </div>
  )
}
