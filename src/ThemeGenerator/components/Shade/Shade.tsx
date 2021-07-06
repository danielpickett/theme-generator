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
} from 'ThemeGenerator/state'
import { Spacer } from 'ThemeGenerator/component-library'
import { defaultLuminances, isExpectedToBeSafe } from 'ThemeGenerator/config'
import { TextSample, TextColorPlots } from 'ThemeGenerator/components'
import { getColorData } from 'ThemeGenerator/utils'

export const Shade = ({ shade }: { shade: ShadeType }) => {
  const shadeL = defaultLuminances[shade.shadeName]
  const shadeC = useRecoilValue(chromaSelector(shade))
  const shadeH = useRecoilValue(hueAtom(shade.scaleName))
  const regularTextColors = useRecoilValue(regularTextColorsSelector(shade))
  const vividTextColors = useRecoilValue(vividTextColorsSelector(shade))
  const showTextColorPlots = useRecoilValue(showTextColorPlotsAtom)

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
      <Spacer />
      {showTextColorPlots && <TextColorPlots shade={shade} />}
    </div>
  )
}
