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
  const regularTextColors = useRecoilValue(regularTextColorsSelector(shade))
  const vividTextColors = useRecoilValue(vividTextColorsSelector(shade))
  const showTextColorPlots = useRecoilValue(showTextColorPlotsAtom)
  const showAllTextColorPlots = useRecoilValue(showAllTextColorPlotsAtom)
  const vividTextOnGrey = useRecoilValue(
    vividTextColorsOnGreyShadeSelector(shade),
  )
  const shadeColorData = getColorData([shadeL, shadeC, shadeH])
  const backgroundColor = shadeColorData.isClipped
    ? 'black'
    : shadeColorData.hex

  const definitelyShowTextColorPlots =
    (showTextColorPlots &&
      (shade.shadeName === '000' || shade.shadeName === '900')) ||
    (showAllTextColorPlots && showTextColorPlots)
  if (shade.scaleName !== 'grey' && shade.shadeName === '000') {
    return <div></div>
  }

  return (
    <div
      className="Shade"
      style={{
        backgroundColor,
        color: regularTextColors['regular'].hex,
      }}
    >
      <div className="Shade__header">
        {shade.scaleName !== 'grey' &&
          shade.shadeName !== '000' &&
          shade.shadeName !== '900' && (
            <input
              type="checkbox"
              onChange={() => setDefaultShade(shade.shadeName)}
              checked={defaultShade === shade.shadeName}
            />
          )}{' '}
        <div className="Shade__token-name">
          {shade.scaleName === 'grey' && shade.shadeName === '000'
            ? 'White'
            : `${shade.scaleName}-${shade.shadeName}`}
        </div>
      </div>
      <TextSample
        shadeColor={shadeColorData.hex}
        textColor={regularTextColors['regular'].hex}
        isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].regular}
      />
      <TextSample
        shadeColor={shadeColorData.hex}
        textColor={regularTextColors['subdued'].hex}
        isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].subdued}
      />
      <Spacer />
      {shade.shadeName !== '000' && (
        <>
          {' '}
          {shade.scaleName !== 'grey' && (
            <>
              {' '}
              <TextSample
                shadeColor={shadeColorData.hex}
                textColor={vividTextColors['vivid'].hex}
                isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].vivid}
              />
              <TextSample
                shadeColor={shadeColorData.hex}
                textColor={vividTextColors['vivid-subdued'].hex}
                isExpectedToBeSafe={
                  isExpectedToBeSafe[shade.shadeName]['vivid-subdued']
                }
              />
            </>
          )}
        </>
      )}
      {shade.scaleName === 'grey' &&
        vividTextOnGrey.map((vividTextColor) => {
          return (
            <Fragment key={vividTextColor.scaleName}>
              <Spacer />
              <TextSample
                shadeColor={shadeColorData.hex}
                textColor={vividTextColor.vivid.hex}
                isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].vivid}
              />
              <TextSample
                shadeColor={shadeColorData.hex}
                textColor={vividTextColor['vivid-subdued'].hex}
                isExpectedToBeSafe={
                  isExpectedToBeSafe[shade.shadeName]['vivid-subdued']
                }
              />
            </Fragment>
          )
        })}
      <Spacer />
      {definitelyShowTextColorPlots && <TextColorPlots shade={shade} />}
    </div>
  )
}
