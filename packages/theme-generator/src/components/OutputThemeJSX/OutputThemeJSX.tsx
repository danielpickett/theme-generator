import { Fragment } from 'react'
import { useRecoilValue } from 'recoil'
import {
  regularTextColorsSelector,
  vividTextColorsOnGreyShadeSelector,
  vividTextColorsSelector,
  chromaSelector,
  hueAtom,
} from 'src/state'
import {
  DEFAULT_LUMINANCES,
  IS_EXPECTED_TO_BE_SAFE_CONFIG,
  SHADE_NAMES,
} from 'src/constants'
import { ScaleNameType, ShadeType } from 'src/types'
import { staticTokens } from 'src/constants/staticTokens'
import { DEFAULT_THEME_SCALE_NAMES } from 'src/themes'
import { getColorData } from 'src/utils'

const columnWidth = 82

export const OutputThemeJSX = () => {
  return (
    <>
      {':root {\n'}
      {DEFAULT_THEME_SCALE_NAMES.map((scaleName) => (
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
  const shadeL = DEFAULT_LUMINANCES[shade.shadeName]
  const shadeC = useRecoilValue(chromaSelector(shade))
  const shadeH = useRecoilValue(hueAtom(shade.scaleName))
  const shadeColorData = getColorData([shadeL, shadeC, shadeH])

  const regularTextColors = useRecoilValue(regularTextColorsSelector(shade))

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

  /* prettier-ignore */
  return (
    <>
      {`${nameComment}\n`}
      {getTokenString('color', shade, '', shadeColorData.hex)}
      {'\n'}
      {getTokenString('text-on', shade, '', textColorHex)}
      {getTokenString('text-on', shade, 'subdued', subduedTextColorHex)}
      {getTokenString('text-on', shade, 'vivid', vividTextColorHex)}
      {getTokenString(
        'text-on',
        shade,
        `vivid-subdued`,
        vividSubduedTextColorHex,
      )}
      {'\n'}
      {shade.scaleName === 'grey' &&
        DEFAULT_THEME_SCALE_NAMES.map((scaleName) => (
          <TextOnGreyTokens
            shade={shade}
            scaleName={scaleName}
            key={`${scaleName}`}
          />
        ))}
      {'\n'}
    </>
  )
}

const TextOnGreyTokens = ({
  shade,
  scaleName,
}: {
  shade: ShadeType
  scaleName: ScaleNameType
}) => {
  const vividTextOnGrey = useRecoilValue(
    vividTextColorsOnGreyShadeSelector(shade),
  )
  /* prettier-ignore */
  return (
    <>
      {getTokenString('text-on', shade, `${scaleName}`, vividTextOnGrey.vivid.hex)}
      {getTokenString('text-on', shade, `${scaleName}-subdued`, vividTextOnGrey['vivid-subdued'].hex)}
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
