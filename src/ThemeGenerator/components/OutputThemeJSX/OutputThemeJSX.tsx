import React, { Fragment } from 'react'
import { useRecoilValue } from 'recoil'
import {
  regularTextColorsSelector,
  scaleNamesAtom,
  vividTextColorsOnGreyShadeSelector,
  vividTextColorsSelector,
} from 'ThemeGenerator/state'
import {
  IS_EXPECTED_TO_BE_SAFE_CONFIG,
  SHADE_NAMES,
} from 'ThemeGenerator/constants'
import { ShadeType } from 'ThemeGenerator/types'
import { staticTokens } from 'ThemeGenerator/constants/staticTokens'

const columnWidth = 82

export const OutputThemeJSX = () => {
  const scaleNames = useRecoilValue(scaleNamesAtom)

  return (
    <>
      {':root {\n'}
      {scaleNames.map((scaleName) => (
        <Fragment key={scaleName}>
          {SHADE_NAMES.map((shadeName) => (
            <ShadeColorTokens
              key={shadeName}
              shade={{ scaleName, shadeName }}
            />
          ))}
        </Fragment>
      ))}
      {staticTokens}
      {'}\n\n'}
    </>
  )
}

const ShadeColorTokens = ({ shade }: { shade: ShadeType }) => {
  const regularTextColors = useRecoilValue(regularTextColorsSelector(shade))
  const vividTextColorsOnGreyShade = useRecoilValue(
    vividTextColorsOnGreyShadeSelector(shade),
  )

  const textColorHex = regularTextColors.regular.hex
  const subduedTextColorHex = regularTextColors.subdued.hex

  const vividTextColors = useRecoilValue(vividTextColorsSelector(shade))

  const vividTextColorHex = vividTextColors.vivid.hex
  const vividSubduedTextColorHex = vividTextColors['vivid-subdued'].hex

  const nameComment = `  /* ${shade.scaleName.toUpperCase()} ${
    shade.shadeName
  } ${'*'.repeat(
    columnWidth - 13 - shade.scaleName.length + shade.shadeName.length,
  )} */`
  // {`  /* ${shade.scaleName.toUpperCase()} ${shade.shadeName} */\n\n`}

  /* prettier-ignore */
  return (
    <>
      {`${nameComment}\n`}
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
  value: string,
) => {
  const { scaleName, shadeName } = shade
  const tokenName = `  --${prefix}-${scaleName}-${shadeName}`
  const suffix = getSuffix(textKind, shade)

  const charCount = tokenName.length + value.length + suffix.length
  const gap = charCount < columnWidth ? ' '.repeat(columnWidth - charCount) : ''
  return `${tokenName}${suffix}: ${gap}${value};\n`
}

const textKindModifiers = ['', 'subdued', 'vivid', 'vivid-subdued']

const getSuffix = (textKind: string, shade: ShadeType) => {
  const unsafeLookupKey = (() => {
    if (textKind === '') return 'regular'
    if (textKindModifiers.includes(textKind)) return textKind
    const isSubdued = !!textKind.match('subdued')
    if (isSubdued) return 'vivid-subdued'
    return 'vivid'
  })() as unknown as 'regular' | 'subdued' | 'vivid' | 'vivid-subdued'
  const isSafe = IS_EXPECTED_TO_BE_SAFE_CONFIG[shade.shadeName][unsafeLookupKey]
  return !!textKind ? `--${textKind}${isSafe ? '' : '--UNSAFE'}` : ''
}
