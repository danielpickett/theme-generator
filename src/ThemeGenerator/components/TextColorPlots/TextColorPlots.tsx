import React, { useMemo, useRef } from 'react'
import './TextColorPlots.scss'
import { useRecoilValue } from 'recoil'
import {
  textColorsPlotSizeAtom,
  colorDataSelector,
  regularTextColorsSelector,
  vividTextColorsSelector,
} from 'ThemeGenerator/state'
import { ShadeType } from 'ThemeGenerator/types'
import { Canvas } from 'ThemeGenerator/components'

import { getNearestSafeColor } from 'ThemeGenerator/utils'
import {
  maxPossibleChromaForAnyHue,
  maxPossibleLuminance,
} from 'ThemeGenerator/config'
import { TextColorEditor } from './components'

export const TextColorPlots = ({ shade }: { shade: ShadeType }) => {
  const size = useRecoilValue(textColorsPlotSizeAtom)
  const { lch: shadeColor } = useRecoilValue(colorDataSelector(shade))
  const regularTextColors = useRecoilValue(regularTextColorsSelector(shade))
  const vividTextColors = useRecoilValue(vividTextColorsSelector(shade))

  const nearestSafeColor = useMemo(
    () =>
      // passing each value individual so the dependency array can watch each
      // value instead of just watching the reference value of the object itself.
      // I'm not 100% sure this is necessary, but I did confirm that the useMemo
      // is impactful
      getNearestSafeColor({
        l: shadeColor.l,
        c: shadeColor.c,
        h: shadeColor.h,
      }),
    [shadeColor.l, shadeColor.c, shadeColor.h]
  )

  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="TextColorPlots"
      ref={ref}
      style={{
        height: `${maxPossibleLuminance * size}px`,
        width: `${maxPossibleChromaForAnyHue * size}px`,
      }}
    >
      <Canvas hue={shadeColor.h} size={size} />
      <div
        className="TextColorPlots__line"
        style={{ bottom: nearestSafeColor.l * size }}
      />

      <TextColorEditor
        shade={shade}
        title={'regular text color'}
        color={vividTextColors.vivid.lch}
        sliderAreaRef={ref}
      />

      <div
        className="TextColorPlots__point"
        title={`regular subdued text color`}
        style={{
          left: vividTextColors['vivid-subdued'].lch.c * size,
          bottom: vividTextColors['vivid-subdued'].lch.l * size,
        }}
      >
        <div className="TextColorPlots__tooltip">
          <div>{`h: ${vividTextColors['vivid-subdued'].lch.h.toFixed(2)}`}</div>
        </div>
      </div>

      <div
        className={[
          'TextColorPlots__point',
          'TextColorPlots__point--large',
        ].join(' ')}
        title={`regular subdued text color`}
        style={{
          left: regularTextColors.regular.lch.c * size,
          bottom: regularTextColors.regular.lch.l * size,
        }}
      >
        <div className="TextColorPlots__tooltip">
          <div>{`h: ${regularTextColors.regular.lch.h.toFixed(2)}`}</div>
        </div>
      </div>

      <div
        className="TextColorPlots__point"
        title={`regular subdued text color`}
        style={{
          left: regularTextColors.subdued.lch.c * size,
          bottom: regularTextColors.subdued.lch.l * size,
        }}
      >
        <div className="TextColorPlots__tooltip">
          <div>{`h: ${regularTextColors.subdued.lch.h.toFixed(2)}`}</div>
        </div>
      </div>

      <div
        className="TextColorPlots__point TextColorPlots__point--diamond  TextColorPlots__point--large"
        title="shade color"
        style={{ bottom: shadeColor.l * size, left: shadeColor.c * size }}
      />
    </div>
  )
}
