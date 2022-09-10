import { Fragment } from 'react'
import './Shade.scss'
import { useRecoilValue, useRecoilState } from 'recoil'
import { ShadeType } from 'src/types'
import {
  regularTextColorsSelector,
  vividTextColorsSelector,
  vividTextColorsOnGreyShadeSelector,
  hueAtom,
  chromaSelector,
  defaultScaleShadeAtom,
  showTextColorPlotsAtom,
} from 'src/state'
import { Spacer } from 'src/components'
import { DEFAULT_LUMINANCES } from 'src/constants'
import { TextSample, TextColorPlots } from 'src/components'
import { getColorData } from 'src/utils'
import { DEFAULT_THEME_SCALE_NAMES } from 'src/themes'
import { ShadeCheckmark } from './components/ShadeCheckmark'

export const Shade = ({ shade }: { shade: ShadeType }) => {
  const [defaultShade, setDefaultShade] = useRecoilState(
    defaultScaleShadeAtom(shade.scaleName),
  )
  const showTextColorPlots = useRecoilValue(showTextColorPlotsAtom)
  const shadeL = DEFAULT_LUMINANCES[shade.shadeName]
  const shadeC = useRecoilValue(chromaSelector(shade))
  const shadeH = useRecoilValue(hueAtom(shade.scaleName))

  const shadeColorData = getColorData([shadeL, shadeC, shadeH])
  const backgroundColor = shadeColorData.isClipped
    ? 'black'
    : shadeColorData.hex

  const isDefaultShade = defaultShade === shade.shadeName

  return (
    <div
      className="Shade"
      style={{
        backgroundColor,
        color: parseInt(shade.shadeName) < 500 ? 'black' : 'white',
      }}
    >
      <div className="Shade__header">
        <div className="Shade__token-name">
          {shade.shadeName === '000'
            ? 'white'
            : `${shade.scaleName}-${shade.shadeName}`}
        </div>
        {shade.shadeName !== '000' && (
          <div
            className="Shade__checkmark"
            style={{ opacity: isDefaultShade ? 1 : undefined }}
          >
            <ShadeCheckmark
              shade={shade}
              checked={isDefaultShade}
              onChange={() => setDefaultShade(shade.shadeName)}
            />
          </div>
        )}
      </div>
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
