import React, { Fragment } from 'react'
import './Shade.scss'
import { useRecoilValue, useRecoilState } from 'recoil'
import { ShadeType } from 'ThemeGenerator/types'
import {
  showTextColorPlotsAtom,
  regularTextColorsSelector,
  vividTextColorsSelector,
  hueAtom,
  chromaSelector,
  showAllTextColorPlotsAtom,
  vividTextColorsOnGreyShadeSelector,
  defaultScaleShadeAtom,
} from 'ThemeGenerator/state'
import { Spacer } from 'ThemeGenerator/component-library'
import { defaultLuminances, isExpectedToBeSafe } from 'ThemeGenerator/config'
import { TextSample, TextColorPlots } from 'ThemeGenerator/components'
import { getColorData } from 'ThemeGenerator/utils'

export const Shade = ({ shade }: { shade: ShadeType }) => {
  const [defaultShade, setDefaultShade] = useRecoilState(
    defaultScaleShadeAtom(shade.scaleName),
  )
  const shadeL = defaultLuminances[shade.shadeName]
  const shadeC = useRecoilValue(chromaSelector(shade))
  const shadeH = useRecoilValue(hueAtom(shade.scaleName))

  // const regularTextColors = useRecoilValue(regularTextColorsSelector(shade))
  // const vividTextColors = useRecoilValue(vividTextColorsSelector(shade))
  // const vividTextOnGrey = useRecoilValue(
  //   vividTextColorsOnGreyShadeSelector(shade),
  // )

  const showTextColorPlots = useRecoilValue(showTextColorPlotsAtom)
  const showAllTextColorPlots = useRecoilValue(showAllTextColorPlotsAtom)
  const shadeColorData = getColorData([shadeL, shadeC, shadeH])
  const backgroundColor = shadeColorData.isClipped
    ? 'black'
    : shadeColorData.hex

  const definitelyShowTextColorPlots =
    (showTextColorPlots &&
      (shade.shadeName === '000' || shade.shadeName === '900')) ||
    (showAllTextColorPlots && showTextColorPlots)

  const showCheckbox =
    shade.scaleName !== 'grey' &&
    shade.shadeName !== '000' &&
    shade.shadeName !== '900'

  return (
    <div
      className="Shade"
      style={{
        backgroundColor,
        // color: regularTextColors['regular'].hex,
        color: 'black',
      }}
    >
      <div className="Shade__header">
        <div className="Shade__token-name">
          {`${shade.scaleName}-${shade.shadeName}`}
        </div>
        {showCheckbox && (
          <input
            type="checkbox"
            onChange={() => setDefaultShade(shade.shadeName)}
            checked={defaultShade === shade.shadeName}
          />
        )}
      </div>
      {/* <TextSample
        label={`text-on-${shade.scaleName}-${shade.shadeName}`}
        shadeColor={shadeColorData.hex}
        textColor={regularTextColors['regular'].hex}
        isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].regular}
      />
      <TextSample
        label={`text-on-${shade.scaleName}-${shade.shadeName}--subdued`}
        shadeColor={shadeColorData.hex}
        textColor={regularTextColors['subdued'].hex}
        isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].subdued}
      /> */}

      <Spacer />

      {/* <TextSample
        label={`text-on-${shade.scaleName}-${shade.shadeName}--vivid`}
        shadeColor={shadeColorData.hex}
        textColor={vividTextColors['vivid'].hex}
        isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].vivid}
      />
      <TextSample
        label={`text-on-${shade.scaleName}-${shade.shadeName}--vivid-subdued`}
        shadeColor={shadeColorData.hex}
        textColor={vividTextColors['vivid-subdued'].hex}
        isExpectedToBeSafe={
          isExpectedToBeSafe[shade.shadeName]['vivid-subdued']
        }
      /> */}

      {/* {shade.scaleName === 'grey' &&
        vividTextOnGrey.map((vividTextColor) => {
          return (
            <Fragment key={vividTextColor.scaleName}>
              <Spacer />
              <TextSample
                label={`text-on-${shade.scaleName}-${shade.shadeName}--vivid`}
                shadeColor={shadeColorData.hex}
                textColor={vividTextColor.vivid.hex}
                isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].vivid}
              />
              <TextSample
                label={`text-on-${shade.scaleName}-${shade.shadeName}--vivid-subdued`}
                shadeColor={shadeColorData.hex}
                textColor={vividTextColor['vivid-subdued'].hex}
                isExpectedToBeSafe={
                  isExpectedToBeSafe[shade.shadeName]['vivid-subdued']
                }
              />
            </Fragment>
          )
        })} */}
      <Spacer />
      {definitelyShowTextColorPlots && <TextColorPlots shade={shade} />}
      {/* {showTextColorPlots && <TextColorPlots shade={shade} />} */}
    </div>
  )
}
