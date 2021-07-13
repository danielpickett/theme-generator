import React from 'react'
import './Shade.scss'
import { useRecoilValue } from 'recoil'
import { ShadeType } from 'ThemeGenerator/types'
import {
  showTextColorPlotsAtom,
  regularTextColorsSelector,
  vividTextColorsSelector,
  hueAtom,
  chromaSelector,
  showAllTextColorPlotsAtom,
  vividTextColorsOnGreyShadeSelector,
} from 'ThemeGenerator/state'
import { Spacer } from 'ThemeGenerator/component-library'
import { defaultLuminances, isExpectedToBeSafe } from 'ThemeGenerator/config'
import { TextSample, TextColorPlots } from 'ThemeGenerator/components'
import { getColorData } from 'ThemeGenerator/utils'

export const Shade = ({ shade }: { shade: ShadeType }) => {
  console.log(shade)
  const shadeL = defaultLuminances[shade.shadeName]
  const shadeC = useRecoilValue(chromaSelector(shade))
  const shadeH = useRecoilValue(hueAtom(shade.scaleName))
  const regularTextColors = useRecoilValue(regularTextColorsSelector(shade))
  const vividTextColors = useRecoilValue(vividTextColorsSelector(shade))
  const showTextColorPlots = useRecoilValue(showTextColorPlotsAtom)
  const showAllTextColorPlots = useRecoilValue(showAllTextColorPlotsAtom)
  const greyTextALL = useRecoilValue(vividTextColorsOnGreyShadeSelector(shade))
  console.log(greyTextALL)
  const shadeColorData = getColorData([shadeL, shadeC, shadeH])
  const backgroundColor = shadeColorData.isClipped
    ? 'black'
    : shadeColorData.hex

  const definitelyShowTextColorPlots =
    (showTextColorPlots &&
      (shade.shadeName === '000' || shade.shadeName === '900')) ||
    (showAllTextColorPlots && showTextColorPlots)

  return (
    <div
      className="Shade"
      style={{
        backgroundColor,
        color: regularTextColors['regular'].hex,
      }}
    >
      <div className="Shade__header">
        <div className="Shade__token-name">{`${shade.scaleName}-${shade.shadeName}`}</div>
        {/* <div className="Shade__details">{`h: ${shadeColorData.lch.h}`}</div> */}
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
      {shade.scaleName === 'grey' &&
        greyTextALL.map((currentColor) => {
          return (
            <>
              <Spacer />
              <TextSample
                shadeColor={shadeColorData.hex}
                textColor={currentColor.vivid.hex}
                isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].vivid}
              />
              <TextSample
                shadeColor={shadeColorData.hex}
                textColor={currentColor['vivid-subdued'].hex}
                isExpectedToBeSafe={
                  isExpectedToBeSafe[shade.shadeName]['vivid-subdued']
                }
              />
            </>
          )
        })}
      <Spacer />
      {definitelyShowTextColorPlots && <TextColorPlots shade={shade} />}
    </div>
  )
}
