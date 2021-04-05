import React, { Fragment } from 'react'
import { useRecoilValue } from 'recoil'
import {
  scaleHueAtomFamily,
  shadeAtomFamily,
  ColorScaleType,
  ColorShadeType,
  luminances,
  makeColor,
} from 'internal'

export const RawCSSVarsOutput = ({
  scales,
  columnWidth,
}: {
  scales: ColorScaleType[]
  columnWidth?: number
}) => {
  return (
    <>
      {':root {\n'}
      {scales.map((scale, index) => (
        <Fragment key={scale.id}>
          <ScaleOutput scale={scale} columnWidth={columnWidth} />
          {index < scales.length - 1 && '\n'}
        </Fragment>
      ))}
      {'}\n'}
    </>
  )
}

const ScaleOutput = ({
  scale,
  columnWidth,
}: {
  scale: ColorScaleType
  columnWidth?: number
}) => {
  const scaleState = useRecoilValue(
    scaleHueAtomFamily({ id: scale.id, hue: scale.hue })
  )
  return (
    <>
      {scale.shades.map((shade, index) => (
        <ShadeOutput
          key={shade.id}
          shade={shade}
          hue={scaleState.hue}
          luminance={luminances[index]}
          columnWidth={columnWidth}
        />
      ))}
    </>
  )
}

const ShadeOutput = ({
  shade,
  hue,
  luminance,
  columnWidth,
}: {
  shade: ColorShadeType
  hue: number
  luminance: number
  columnWidth?: number
}) => {
  const shadeState = useRecoilValue(shadeAtomFamily(shade))
  const color = makeColor(luminance, shadeState.chroma, hue)

  const spaces = columnWidth
    ? ' '.repeat(
        columnWidth -
          shade.id.length -
          (color.hex ? color.hex.length : 'null'.length)
      )
    : ''

  return <span>{`  --${shade.id}:${spaces}${color.hex}; \n`}</span>
}
