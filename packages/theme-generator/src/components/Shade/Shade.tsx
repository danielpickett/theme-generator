import './Shade.scss'
import { Fragment, CSSProperties, useRef } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import classNames from 'classnames'
import { Checkmark as CheckmarkIcon } from '@danielpickett/icons'
import { ShadeType } from 'src/types'
import {
  regularTextColorsSelector,
  vividTextColorsSelector,
  vividTextColorsOnGreyShadeSelector,
  hueAtom,
  chromaSelector,
  defaultScaleShadeAtom,
  showTextColorPlotsAtom,
  showTextSamplesAtom,
  showShadeNamesAtom,
} from 'src/state'
import { Spacer } from 'src/components'
import { DEFAULT_LUMINANCES } from 'src/constants'
import { TextSample, TextColorPlots } from 'src/components'
import { getColorData } from 'src/utils'
import { DEFAULT_THEME_SCALE_NAMES } from 'src/themes'
import { useIsHovered } from '@danielpickett/hooks'

export const Shade = ({ shade }: { shade: ShadeType }) => {
  const [defaultShade, setDefaultShade] = useRecoilState(
    defaultScaleShadeAtom(shade.scaleName),
  )
  const showTextSamples = useRecoilValue(showTextSamplesAtom)
  const showTextColorPlots = useRecoilValue(showTextColorPlotsAtom)
  const showShadeNames = useRecoilValue(showShadeNamesAtom)

  const shadeL = DEFAULT_LUMINANCES[shade.shadeName]
  const shadeC = useRecoilValue(chromaSelector(shade))
  const shadeH = useRecoilValue(hueAtom(shade.scaleName))

  const shadeColorData = getColorData([shadeL, shadeC, shadeH])
  const backgroundColor = shadeColorData.isClipped
    ? 'black'
    : shadeColorData.hex

  const isDefaultShade = defaultShade === shade.shadeName

  const modifierClasses = {
    'Shade--is-default': isDefaultShade,
  }

  return (
    <div
      className={classNames('Shade', modifierClasses)}
      style={{
        backgroundColor,
        color: parseInt(shade.shadeName) < 500 ? 'black' : 'white',
      }}
    >
      {showShadeNames && (
        <>
          <div className="Shade__header">
            <div className="Shade__token-name">
              {shade.shadeName === '000'
                ? 'white'
                : `${shade.scaleName}-${shade.shadeName}`}
            </div>
          </div>
          {shade.shadeName !== '000' && (
            <Checkmark
              shade={shade}
              checked={isDefaultShade}
              onChange={() => setDefaultShade(shade.shadeName)}
            />
          )}
        </>
      )}
      {showTextSamples && (
        <>
          <TextSamplesRegular
            shade={{ shadeName: shade.shadeName, scaleName: shade.scaleName }}
            shadeColor={shadeColorData.hex}
          />
          <Spacer />
          {shade.scaleName !== 'grey' && (
            <TextSamplesVivid
              shade={{ shadeName: shade.shadeName, scaleName: shade.scaleName }}
              shadeColor={shadeColorData.hex}
            />
          )}
          {shade.scaleName === 'grey' &&
            DEFAULT_THEME_SCALE_NAMES.map((scaleName) => (
              <Fragment key={scaleName}>
                <Spacer />
                <TextSamplesOnGrey
                  shade={{ shadeName: shade.shadeName, scaleName }}
                  shadeColor={shadeColorData.hex}
                />
              </Fragment>
            ))}
          <Spacer />
        </>
      )}
      {showTextColorPlots && <TextColorPlots shade={shade} />}
    </div>
  )
}

type SampleTextPropsType = {
  shade: ShadeType
  shadeColor: string
}

const TextSamplesRegular = ({ shade, shadeColor }: SampleTextPropsType) => {
  const regularTextColors = useRecoilValue(regularTextColorsSelector(shade))

  return (
    <>
      {(['regular', 'subdued'] as const).map((kind) => (
        <TextSample
          key={kind}
          kind={kind}
          shade={shade}
          shadeColor={shadeColor}
          textColor={regularTextColors[kind].hex}
        />
      ))}
    </>
  )
}

const TextSamplesVivid = ({ shade, shadeColor }: SampleTextPropsType) => {
  const regularTextColors = useRecoilValue(vividTextColorsSelector(shade))

  return (
    <>
      {(['vivid', 'vivid-subdued'] as const).map((kind) => (
        <TextSample
          key={kind}
          kind={kind}
          shade={shade}
          shadeColor={shadeColor}
          textColor={regularTextColors[kind].hex}
        />
      ))}
    </>
  )
}

const TextSamplesOnGrey = ({ shade, shadeColor }: SampleTextPropsType) => {
  const vividTextOnGrey = useRecoilValue(
    vividTextColorsOnGreyShadeSelector(shade),
  )

  return (
    <>
      {(['vivid', 'vivid-subdued'] as const).map((kind) => (
        <TextSample
          key={kind}
          kind={kind}
          shade={shade}
          shadeColor={shadeColor}
          textColor={vividTextOnGrey[kind].hex}
        />
      ))}
    </>
  )
}

const Checkmark = ({
  shade,
  checked,
  onChange,
}: {
  shade: ShadeType
  checked: boolean
  onChange: (checked: boolean) => void
}) => {
  const textColor = `var(--text-on-${shade.scaleName}-${shade.shadeName}--vivid)`
  const shadeColor = `var(--color-${shade.scaleName}-${shade.shadeName})`

  const ref = useRef<HTMLInputElement>(null)
  const isHovered = useIsHovered(ref)

  const modifierClasses = {
    'Shade__checkmark--is-hovered': isHovered,
  }

  return (
    <div
      className={classNames('Shade__checkmark', modifierClasses)}
      style={
        {
          '--shade-color': shadeColor,
          '--text-color': textColor,
        } as CSSProperties
      }
    >
      <input
        ref={ref}
        className="Shade__checkbox_input"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />

      <div
        className="Shade__checkmark-icon"
        // style={{ color: checked ? textColor : shadeColor }}
      >
        <CheckmarkIcon size="1.25rem" />
      </div>
    </div>
  )
}
