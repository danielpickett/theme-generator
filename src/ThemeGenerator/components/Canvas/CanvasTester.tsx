import { useCallback, useState } from 'react'
import { DEFAULT_CANVAS_SIZE } from 'ThemeGenerator/constants'
import { Canvas } from '.'
import { HueSlider } from '..'
import { OnBitmapResponseData } from './types'

export const CanvasTester = () => {
  const [hue, setHue] = useState(0)
  const [size, setSize] = useState(DEFAULT_CANVAS_SIZE)
  const [recentChromaPaint, setRecentChromaPaint] =
    useState<{ hue: number; size: number }>()
  const [recentMaskPaint, setRecentMaskPaint] =
    useState<{ hue: number; size: number }>()

  const handleBitmapResponse = useCallback(
    ({ type, ...rest }: OnBitmapResponseData) => {
      type === 'chroma' ? setRecentChromaPaint(rest) : setRecentMaskPaint(rest)
    },
    [],
  )

  return (
    <div className="Canvas__tester  dark-blue-theme">
      <div>{`recent chroma paint: ${recentChromaPaint?.hue}, ${recentChromaPaint?.size}`}</div>
      <div>{`recent mask paint: ${recentMaskPaint?.hue}, ${recentMaskPaint?.size}`}</div>
      <div style={{ width: '30rem' }}>
        <HueSlider
          hue={hue}
          onHueChange={(newHue) => {
            setHue(newHue)
          }}
        />
      </div>
      <div>{hue}</div>
      <div>
        {'size: '}
        <input
          type="number"
          value={size}
          onChange={(event) => setSize(+event.target.value)}
        />
      </div>
      <Canvas hue={hue} size={size} onBitmapResponse={handleBitmapResponse} />
    </div>
  )
}
