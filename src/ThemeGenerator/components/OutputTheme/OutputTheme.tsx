import React from 'react'
import { useRecoilValue } from 'recoil'
import {
  regularTextColorsSelector,
  scaleNamesAtom,
  shadeColorSelector,
  vividTextColorsOnGreyShadeSelector,
  vividTextColorsSelector,
} from 'ThemeGenerator/state'
import { shadeNames } from 'ThemeGenerator/config'
import './OutputTheme.scss'
import { ShadeType } from 'ThemeGenerator/types'
import { getColorData } from 'ThemeGenerator/utils'
import { Fragment } from 'react'

export const OutputTheme = () => {
  const scaleNames = useRecoilValue(scaleNamesAtom)

  return (
    <div className="OutputTheme">
      {':root {\n'}
      {scaleNames.map((scaleName) => (
        <Fragment key={scaleName}>
          {shadeNames.map((shadeName) => (
            <ShadeColorTokens
              key={shadeName}
              shade={{ scaleName, shadeName }}
            />
          ))}
        </Fragment>
      ))}
      {'}\n\n'}
    </div>
  )
}

const COLUMN_WIDTH = 50

const ShadeColorTokens = ({ shade }: { shade: ShadeType }) => {
  const regularTextColors = useRecoilValue(regularTextColorsSelector(shade))
  const vividTextColorsOnGreyShade = useRecoilValue(
    vividTextColorsOnGreyShadeSelector(shade)
  )

  const textColorHex = regularTextColors.regular.hex
  const subduedTextColorHex = regularTextColors.subdued.hex

  const vividTextColors = useRecoilValue(vividTextColorsSelector(shade))

  const vividTextColorHex = vividTextColors.vivid.hex
  const vividSubduedTextColorHex = vividTextColors['vivid-subdued'].hex

  return (
    /* prettier-ignore */
    <>
      {getTokenString('color', shade, '', vividSubduedTextColorHex)}
      {'\n'}
      {getTokenString('text-on', shade, '', textColorHex)}
      {getTokenString('text-on', shade, '--subdued', subduedTextColorHex)}
      {getTokenString('text-on', shade, '--vivid', vividTextColorHex)}
      {getTokenString('text-on', shade, '--vivid-subdued', vividSubduedTextColorHex)}
      {'\n'}
      {shade.scaleName === 'grey' && vividTextColorsOnGreyShade.map(vividTextColors=>{
        return (
          <Fragment>
          {getTokenString('text-on', shade, `--${vividTextColors.scaleName}`, vividTextColors.vivid.hex)}
          {getTokenString('text-on', shade, `--${vividTextColors.scaleName}-subdued`, vividTextColors['vivid-subdued'].hex)}
          </Fragment>
          )
      })}
      {'\n'}
    </>
  )
}

const getTokenString = (
  prefix: string,
  shade: ShadeType,
  suffix: string,
  value: string
) => {
  const columnWidth = 50
  const tokenName = `  --${prefix}-${shade.scaleName}-${shade.shadeName}${suffix}`
  const lineLength = tokenName.length + value.length
  const gap =
    lineLength < columnWidth ? ' '.repeat(columnWidth - lineLength) : ''
  return `${tokenName}: ${gap}${value};\n`
}
