import { selector } from 'recoil'
import {
  IS_EXPECTED_TO_BE_SAFE_CONFIG,
  SHADE_NAMES,
} from 'ThemeGenerator/constants'
import { ShadeType } from 'ThemeGenerator/types'
import { scaleNamesAtom } from './scaleNamesState'
import {
  regularTextColorsSelector,
  vividTextColorsOnGreyShadeSelector,
  vividTextColorsSelector,
  defaultScaleShadeAtom,
} from 'ThemeGenerator/state'
import { staticTokens } from 'ThemeGenerator/constants/staticTokens'

const columnWidth = 82

export const allTokensSelector = selector({
  key: 'allTokens',
  get: ({ get }) => {
    const scaleNames = get(scaleNamesAtom)

    const getShadeColorTokens = (shade: ShadeType) => {
      const regularTextColors = get(regularTextColorsSelector(shade))
      const vividTextColorsOnGreyShade = get(
        vividTextColorsOnGreyShadeSelector(shade),
      )

      const textColorHex = regularTextColors.regular.hex
      const subduedTextColorHex = regularTextColors.subdued.hex

      const vividTextColors = get(vividTextColorsSelector(shade))

      const vividTextColorHex = vividTextColors.vivid.hex
      const vividSubduedTextColorHex = vividTextColors['vivid-subdued'].hex

      const nameComment =
        shade.shadeName === '000' && shade.scaleName !== 'grey'
          ? ''
          : `  /* ${shade.scaleName.toUpperCase()} ${
              shade.shadeName
            } ${'*'.repeat(
              columnWidth -
                13 -
                shade.scaleName.length +
                shade.shadeName.length,
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
          vividSubduedTextColorHex,
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
                    txtColors.vivid.hex,
                  ) +
                  getTokenString(
                    'text-on',
                    shade,
                    `${txtColors.scaleName}-subdued`,
                    txtColors['vivid-subdued'].hex,
                  ),
              )
              .join('') + '\n'
          : '')
      )
    }
    // TODO ADD HOVER CLASS NAMES FOR HOVER: LIGHTER && HOVER: DARKER //
    const getScaleColorAlias = (scaleName: string) => {
      if (scaleName === 'grey') return ''
      const defaultShade = get(defaultScaleShadeAtom(scaleName))
      const lighter =
        defaultShade === '050'
          ? '050'
          : SHADE_NAMES[SHADE_NAMES.indexOf(defaultShade) - 1]
      const darker =
        defaultShade === '050'
          ? '050'
          : SHADE_NAMES[SHADE_NAMES.indexOf(defaultShade) + 1]
      const sillyString = `  --color-${scaleName}-lighter:                                                   var(--color-${scaleName}-${lighter});
  --color-${scaleName}:                                                           var(--color-${scaleName}-${defaultShade});
  --color-${scaleName}-darker:                                                    var(--color-${scaleName}-${darker});
  --text-on-${scaleName}-lighter:                                                 var(--text-on-${scaleName}-${lighter});
  --text-on-${scaleName}-lighter--subdued--UNSAFE:                                var(--text-on-${scaleName}-${lighter}--subdued--UNSAFE);
  --text-on-${scaleName}-lighter--vivid:                                          var(--text-on-${scaleName}-${lighter}--vivid);
  --text-on-${scaleName}-lighter--vivid-subdued--UNSAFE:                          var(--text-on-${scaleName}-${lighter}--vivid-subdued--UNSAFE);
  --text-on-${scaleName}:                                                         var(--text-on-${scaleName}-${defaultShade});
  --text-on-${scaleName}--subdued--UNSAFE:                                        var(--text-on-${scaleName}-${defaultShade}--subdued--UNSAFE);
  --text-on-${scaleName}--vivid:                                                  var(--text-on-${scaleName}-${defaultShade}--vivid);
  --text-on-${scaleName}--vivid-subdued--UNSAFE:                                  var(--text-on-${scaleName}-${defaultShade}--vivid-subdued--UNSAFE);
  --text-on-${scaleName}-darker:                                                  var(--text-on-${scaleName}-${darker});
  --text-on-${scaleName}-darker--subdued--UNSAFE:                                 var(--text-on-${scaleName}-${darker}--subdued--UNSAFE);
  --text-on-${scaleName}-darker--vivid:                                           var(--text-on-${scaleName}-${darker}--vivid);
  --text-on-${scaleName}-darker--vivid-subdued--UNSAFE:                           var(--text-on-${scaleName}-${darker}--vivid-subdued--UNSAFE);\n\n`
      return sillyString
    }
    const allTokens = scaleNames
      .map((scaleName) => {
        const result = SHADE_NAMES.map((shadeName) => {
          const shade = { scaleName, shadeName }
          const result = getShadeColorTokens(shade)
          return result
        }).join('')
        return result.concat(getScaleColorAlias(scaleName))
      })
      .join('')

    return allTokens + '\n' + staticTokens
  },
})

const getTokenString = (
  prefix: string,
  shade: ShadeType,
  textKind: string,
  value: string,
) => {
  const { scaleName, shadeName } = shade
  // prettier-ignore

  const tokenName = `  --${prefix}-${
    scaleName === "grey" && shadeName === "000" ? "white" : scaleName
  }${shadeName === "000" ? "" : `-${shadeName}`}`;
  const suffix = getSuffix(textKind, shade)
  const charCount = tokenName.length + value.length + suffix.length
  const gap = charCount < columnWidth ? ' '.repeat(columnWidth - charCount) : ''
  if (scaleName !== 'grey' && shadeName === '000') {
    return ''
  }
  return scaleName === 'grey' && suffix.match('vivid')
    ? ''
    : `${tokenName}${suffix}: ${gap}${value};\n`
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
