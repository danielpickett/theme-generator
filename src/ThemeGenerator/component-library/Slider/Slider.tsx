import React from 'react'
import { SliderThumb, SliderTrack } from '..'
import { SliderBar } from '../SliderBar'
import { SliderBarFill } from '../SliderBarFill'
import './Slider.scss'
import { defaultSliderThumbSizeInRem } from '../SliderThumb'

export const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  microStepMultiplier,
  macroStepMultiplier,
  'aria-label': ariaLabel,
}: {
  value: number
  onChange: (newValue: number) => void
  min?: number
  max?: number
  step?: number
  microStepMultiplier?: number
  macroStepMultiplier?: number
  'aria-label': string
}) => {
  return (
    <div
      className="Slider"
      style={{ padding: `calc(${defaultSliderThumbSizeInRem}rem / 2)` }}
    >
      <SliderTrack
        min={min}
        max={max}
        bar={({ valueToPercent }) => {
          // This offset solves a visual bug where the ends of the fill bar
          // don't stay lined up with the center of the thumb. This visual
          // bug shows up when using a round thumb and causes the ends of the
          // fill bar to become visible outside of the thumb when at the ends
          // of the range. To see the bug, try removing the 'offsetInRem'
          // value from the CSS calc below, then set the thumb opacity to 0.5.
          // It'll be pretty obvious then. This only happens in sliders that
          // use the negative margin technique to keep the thumb from over-
          // hanging the ends of the track.
          const valuePct = valueToPercent(value)
          const offset = ((valuePct - 50) / 100) * -1
          const offsetInRem = offset * defaultSliderThumbSizeInRem

          return (
            <div
              className="Slider__bar"
              style={{
                margin: `0 calc(${defaultSliderThumbSizeInRem}rem / 2 * -1)`,
              }}
            >
              <SliderBar>
                <SliderBarFill
                  width={`calc(${valuePct}% + ${offsetInRem}rem)`}
                />
              </SliderBar>
            </div>
          )
        }}
      >
        {(props) => (
          <SliderThumb
            value={value}
            min={min}
            max={max}
            step={step}
            microStepMultiplier={microStepMultiplier}
            macroStepMultiplier={macroStepMultiplier}
            aria-label={ariaLabel}
            sliderTrackRef={props.sliderTrackRef}
            onChange={onChange}
          />
        )}
      </SliderTrack>
    </div>
  )
}
