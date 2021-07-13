import React from 'react'
import { useRecoilValue } from 'recoil'
import {
  regularTextColorsSelector,
  scaleNamesAtom,
  vividTextColorsOnGreyShadeSelector,
  vividTextColorsSelector,
} from 'ThemeGenerator/state'
import { isExpectedToBeSafe, shadeNames } from 'ThemeGenerator/config'
import './OutputTheme.scss'
import { ShadeNameType, ShadeType } from 'ThemeGenerator/types'
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

  /* prettier-ignore */
  return (
    <>
      {getTokenString('color', shade, '', vividSubduedTextColorHex)}
      {'\n'}
      {getTokenString('text-on', shade, '', textColorHex)}
      {getTokenString('text-on', shade, 'subdued', subduedTextColorHex)}
      {getTokenString('text-on', shade, 'vivid', vividTextColorHex)}
      {getTokenString('text-on', shade, `vivid-subdued`, vividSubduedTextColorHex)}
      {'\n'}
      {shade.scaleName === 'grey' && vividTextColorsOnGreyShade.map((txtColors) => (
        <Fragment key={`${txtColors.scaleName}`}>
          {getTokenString('text-on', shade, `${txtColors.scaleName}`, txtColors.vivid.hex)}
          {getTokenString('text-on', shade, `${txtColors.scaleName}-subdued`, txtColors['vivid-subdued'].hex)}
         </Fragment>
      ))}
      {'\n'}
    </>
  )
}

const getTokenString = (
  prefix: string,
  shade: ShadeType,
  textKind: string,
  value: string
) => {
  const { scaleName, shadeName } = shade
  const columnWidth = 60
  // prettier-ignore
  const tokenName = `  --${prefix}-${scaleName}-${shadeName}` //${!!textKind ? `--${textKind}` : ''}
  const suffix = getSuffix(textKind, shade)

  const charCount = tokenName.length + value.length + suffix.length
  const gap = charCount < columnWidth ? ' '.repeat(columnWidth - charCount) : ''
  return `${tokenName}${suffix}: ${gap}${value};\n`
}

const textKindModifiers = ['', 'subdued', 'vivid', 'vivid-subdued']

//
// subdued
// vivid
// vivid-subdued
// success
// success-subdued
// danger
// danger-subdued

const getSuffix = (textKind: string, shade: ShadeType) => {
  const unsafeLookupKey = (() => {
    if (textKind === '') return 'regular'
    if (textKindModifiers.includes(textKind)) return textKind
    const isSubdued = !!textKind.match('subdued')
    if (isSubdued) return 'vivid-subdued'
    return 'vivid'
  })() as unknown as 'regular' | 'subdued' | 'vivid' | 'vivid-subdued'
  console.table({ textKind, shade, unsafeLookupKey })
  const isSafe = isExpectedToBeSafe[shade.shadeName][unsafeLookupKey]
  return !!textKind ? `--${textKind}${isSafe ? '' : '--UNSAFE'}` : ''
}
