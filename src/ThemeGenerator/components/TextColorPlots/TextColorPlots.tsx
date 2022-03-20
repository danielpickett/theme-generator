import { useMemo, useRef } from 'react'
import './TextColorPlots.scss'
import { useRecoilValue } from 'recoil'
import {
  colorDataSelector,
  regularTextColorsSelector,
  vividTextColorsSelector,
} from 'ThemeGenerator/state'
import { FirstOrLastShadeType, ShadeType } from 'ThemeGenerator/types'
import { Canvas } from 'ThemeGenerator/components'

import { getNearestSafeColor } from 'ThemeGenerator/utils'
import {
  DEFAULT_CANVAS_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from 'ThemeGenerator/constants'
import { TextColorEditor } from './components'
import classNames from 'classnames'

export const TextColorPlots = ({ shade }: { shade: ShadeType }) => {
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
        height: `${CANVAS_HEIGHT}px`,
        width: `${CANVAS_WIDTH}px`,
      }}
    >
      <Canvas hue={shadeColor.h} />
      <div
        className="TextColorPlots__line"
        style={{ bottom: nearestSafeColor.l * DEFAULT_CANVAS_SIZE }}
      />

      <ColorPoint color={shadeColor} title="background color" diamond />
      <ColorPoint
        color={regularTextColors.regular.lch}
        title="regular text color"
        large
      />

      <ColorPoint
        color={regularTextColors.subdued.lch}
        title="subdued text color"
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
        />
      )}

      <ColorPoint
        color={vividTextColors['vivid-subdued'].lch}
        title="vivid-subdued text color"
      />
    </div>
  )
}

const ColorPoint = ({
  color,

  title,
  large = false,
  diamond = false,
}: {
  color: { l: number; c: number; h?: number }

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
        left: color.c * DEFAULT_CANVAS_SIZE,
        bottom: color.l * DEFAULT_CANVAS_SIZE,
      }}
    />
  )
}
