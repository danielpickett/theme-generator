import './ChromaSlider.scss'
import { useState } from 'react'
import classNames from 'classnames'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Slider } from 'src/component-library'
import { MAX_POSSIBLE_CHROMA_FOR_ANY_HUE } from 'src/app-constants'
import { maxChromaSelector, chromaSelector } from 'src/state'
import { ShadeType } from 'src/types'

export const ChromaSlider = ({ shade }: { shade: ShadeType }) => {
  const maxChroma = useRecoilValue(maxChromaSelector(shade))
  const [chroma, setChroma] = useRecoilState(chromaSelector(shade))
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false)

  const handleChange = (newValue: number) => {
    if (newValue < maxChroma) setChroma(newValue)
    else setChroma(maxChroma)
  }
  return (
    <div
      className="ChromaSlider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Slider
        value={chroma}
        onChange={handleChange}
        max={MAX_POSSIBLE_CHROMA_FOR_ANY_HUE}
        microStep={0.1}
        macroStep={5}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onKeyboardFocus={() => setHasKeyboardFocus(true)}
        onKeyboardBlur={() => setHasKeyboardFocus(false)}
        track={
          <div
            className={classNames('ChromaSlider__track', {
              'ChromaSlider__track--dark':
                hasKeyboardFocus || isDragging || isHovered,
            })}
          />
        }
      >
        <div
          className={classNames('ChromaSlider__thumb', {
            'ChromaSlider__thumb--tall':
              hasKeyboardFocus || isDragging || isHovered,
          })}
        />
      </Slider>
    </div>
  )
}
