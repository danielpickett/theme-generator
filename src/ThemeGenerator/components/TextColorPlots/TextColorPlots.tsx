import { useMemo, useRef } from 'react'
import './TextColorPlots.scss'
import { useRecoilValue } from 'recoil'
import {
  // textColorsPlotSizeAtom,
  colorDataSelector,
  regularTextColorsSelector,
  vividTextColorsSelector,
  canvasSizeAtom,
} from 'ThemeGenerator/state'
import { FirstOrLastShadeType, ShadeType } from 'ThemeGenerator/types'
import { Canvas } from 'ThemeGenerator/components'

import { getNearestSafeColor } from 'ThemeGenerator/utils'
import {
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE,
  MAX_POSSIBLE_LUMINANCE,
} from 'ThemeGenerator/constants'
import { TextColorEditor } from './components'
import classNames from 'classnames'

export const TextColorPlots = ({ shade }: { shade: ShadeType }) => {
  // const size = useRecoilValue(textColorsPlotSizeAtom)
  const size = useRecoilValue(canvasSizeAtom)
  const { lch: shadeColor } = useRecoilValue(colorDataSelector(shade))
  const regularTextColors = useRecoilValue(regularTextColorsSelector(shade))
  const vividTextColors = useRecoilValue(vividTextColorsSelector(shade))

  const nearestSafeColor = useMemo(
    () =>
      // I'm not 100% sure this is necessary, but I
      // did confirm that the useMemo is impactful
      getNearestSafeColor({
        l: shadeColor.l,
        c: shadeColor.c,
        h: shadeColor.h,
      }),
    [shadeColor.l, shadeColor.c, shadeColor.h],
  )

  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="TextColorPlots"
      ref={ref}
      style={{
        height: `${MAX_POSSIBLE_LUMINANCE * size}px`,
        width: `${MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * size}px`,
      }}
    >
      <Canvas hue={shadeColor.h} />
      <div
        className="TextColorPlots__line"
        style={{ bottom: nearestSafeColor.l * size }}
      />

      <ColorPoint
        color={shadeColor}
        title="background color"
        size={size}
        diamond
      />
      <ColorPoint
        color={regularTextColors.regular.lch}
        title="regular text color"
        size={size}
        large
      />

      <ColorPoint
        color={regularTextColors.subdued.lch}
        title="subdued text color"
        size={size}
      />

      {shade.shadeName === '000' || shade.shadeName === '900' ? (
        <TextColorEditor
          shade={shade as FirstOrLastShadeType}
          title={'vivid text color'}
          color={vividTextColors.vivid.lch}
          sliderAreaRef={ref}
        />
      ) : (
        <ColorPoint
          color={vividTextColors.vivid.lch}
          title="vivid text color"
          size={size}
        />
      )}

      <ColorPoint
        color={vividTextColors['vivid-subdued'].lch}
        title="vivid-subdued text color"
        size={size}
      />
    </div>
  )
}

const ColorPoint = ({
  color,
  size,
  title,
  large = false,
  diamond = false,
}: {
  color: { l: number; c: number; h?: number }
  size: number
  title?: string
  large?: boolean
  diamond?: boolean
}) => {
  return (
    <div
      className={classNames('TextColorPlots__point', {
        'TextColorPlots__point--large': large,
        'TextColorPlots__point--diamond': diamond,
      })}
      title={title}
      style={{
        left: color.c * size,
        bottom: color.l * size,
      }}
    />
  )
}
