import { selector } from 'recoil'
import { isExpectedToBeSafe, shadeNames } from 'ThemeGenerator/config'
import { ShadeType } from 'ThemeGenerator/types'
import { scaleNamesAtom } from './scaleNamesState'
import {
  regularTextColorsSelector,
  vividTextColorsOnGreyShadeSelector,
  vividTextColorsSelector,
} from 'ThemeGenerator/state'
import { staticTokens } from 'ThemeGenerator/config/staticTokens'

const columnWidth = 82

export const allTokensSelector = selector({
  key: 'allTokens',
  get: ({ get }) => {
    const scaleNames = get(scaleNamesAtom)

    const getShadeColorTokens = (shade: ShadeType) => {
      const regularTextColors = get(regularTextColorsSelector(shade))
      const vividTextColorsOnGreyShade = get(
        vividTextColorsOnGreyShadeSelector(shade)
      )

      const textColorHex = regularTextColors.regular.hex
      const subduedTextColorHex = regularTextColors.subdued.hex

      const vividTextColors = get(vividTextColorsSelector(shade))

      const vividTextColorHex = vividTextColors.vivid.hex
      const vividSubduedTextColorHex = vividTextColors['vivid-subdued'].hex

      const nameComment = `  /* ${shade.scaleName.toUpperCase()} ${
        shade.shadeName
      } ${'*'.repeat(
        columnWidth - 13 - shade.scaleName.length + shade.shadeName.length
      )} */`

      return (
        `${nameComment}\n` +
        getTokenString('color', shade, '', vividSubduedTextColorHex) +
        '\n' +
        getTokenString('text-on', shade, '', textColorHex) +
        getTokenString('text-on', shade, 'subdued', subduedTextColorHex) +
        getTokenString('text-on', shade, 'vivid', vividTextColorHex) +
        getTokenString(
          'text-on',
          shade,
          `vivid-subdued`,
          vividSubduedTextColorHex
        ) +
        '\n' +
        (shade.scaleName === 'grey'
          ? vividTextColorsOnGreyShade
              .map(
                (txtColors) =>
                  getTokenString(
                    'text-on',
                    shade,
                    `${txtColors.scaleName}`,
                    txtColors.vivid.hex
                  ) +
                  getTokenString(
                    'text-on',
                    shade,
                    `${txtColors.scaleName}-subdued`,
                    txtColors['vivid-subdued'].hex
                  )
              )
              .join('') + '\n'
          : '')
      )
    }

    const allTokens = scaleNames
      .map((scaleName) => {
        const result = shadeNames
          .map((shadeName) => {
            const shade = { scaleName, shadeName }
            const result = getShadeColorTokens(shade)
            return result
          })
          .join('')
        return result
      })
      .join('')

    return allTokens + '\n' + staticTokens
  },
})

const getTokenString = (
  prefix: string,
  shade: ShadeType,
  textKind: string,
  value: string
) => {
  const { scaleName, shadeName } = shade
  // prettier-ignore
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
  const isSafe = isExpectedToBeSafe[shade.shadeName][unsafeLookupKey]
  return !!textKind ? `--${textKind}${isSafe ? '' : '--UNSAFE'}` : ''
}
