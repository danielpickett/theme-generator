import { Fragment } from 'react'
import './Shade.scss'
import { useRecoilValue, useRecoilState } from 'recoil'
import { ShadeType } from 'ThemeGenerator/types'
import {
  showTextColorPlotsAtom,
  regularTextColorsSelector,
  vividTextColorsSelector,
  hueAtom,
  chromaSelector,
  vividTextColorsOnGreyShadeSelector,
  defaultScaleShadeAtom,
} from 'ThemeGenerator/state'
import { Spacer } from 'ThemeGenerator/component-library'
import { DEFAULT_LUMINANCES } from 'ThemeGenerator/constants'
import { TextSample, TextColorPlots } from 'ThemeGenerator/components'
import { getColorData } from 'ThemeGenerator/utils'

export const Shade = ({ shade }: { shade: ShadeType }) => {
  const [defaultShade, setDefaultShade] = useRecoilState(
    defaultScaleShadeAtom(shade.scaleName),
  )
  const shadeL = DEFAULT_LUMINANCES[shade.shadeName]
  const shadeC = useRecoilValue(chromaSelector(shade))
  const shadeH = useRecoilValue(hueAtom(shade.scaleName))
  const regularTextColors = useRecoilValue(regularTextColorsSelector(shade))
  const vividTextColors = useRecoilValue(vividTextColorsSelector(shade))
  const showTextColorPlots = useRecoilValue(showTextColorPlotsAtom)
  const vividTextOnGrey = useRecoilValue(
    vividTextColorsOnGreyShadeSelector(shade),
  )
  const shadeColorData = getColorData([shadeL, shadeC, shadeH])
  const backgroundColor = shadeColorData.isClipped
    ? 'black'
    : shadeColorData.hex

  return (
    <div
      className="Shade"
      style={{
        backgroundColor,
        color: regularTextColors['regular'].hex,
      }}
    >
      <div className="Shade__header">
        <div className="Shade__token-name">
          {shade.scaleName === 'grey' && shade.shadeName === '000'
            ? 'White'
            : `${shade.scaleName}-${shade.shadeName}`}
        </div>
        <input
          type="checkbox"
          onChange={() => setDefaultShade(shade.shadeName)}
          checked={defaultShade === shade.shadeName}
        />
      </div>
      <TextSample
        kind="regular"
        shade={shade}
        shadeColor={shadeColorData.hex}
        textColor={regularTextColors['regular'].hex}
      />
      <TextSample
        kind="subdued"
        shade={shade}
        shadeColor={shadeColorData.hex}
        textColor={regularTextColors['subdued'].hex}
      />
      <Spacer />
      <TextSample
        kind="vivid"
        shade={shade}
        shadeColor={shadeColorData.hex}
        textColor={vividTextColors['vivid'].hex}
      />
      <TextSample
        kind="vivid-subdued"
        shade={shade}
        shadeColor={shadeColorData.hex}
        textColor={vividTextColors['vivid-subdued'].hex}
      />
      {shade.scaleName === 'grey' &&
        vividTextOnGrey.map((vividTextColor) => {
          return (
            <Fragment key={vividTextColor.scaleName}>
              <Spacer />
              <TextSample
                kind="vivid"
                shade={shade}
                shadeColor={shadeColorData.hex}
                textColor={vividTextColor.vivid.hex}
              />
              <TextSample
                kind="vivid-subdued"
                shade={shade}
                shadeColor={shadeColorData.hex}
                textColor={vividTextColor['vivid-subdued'].hex}
              />
            </Fragment>
          )
        })}
      <Spacer />
      {showTextColorPlots && <TextColorPlots shade={shade} />}
    </div>
  )
}
