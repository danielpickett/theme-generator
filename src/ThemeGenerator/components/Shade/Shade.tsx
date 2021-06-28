import React from 'react'
import './Shade.scss'
import { useRecoilValue } from 'recoil'
import { ShadeType } from 'ThemeGenerator/types'
import {
  colorDataSelector,
  showTextColorPlotsAtom,
  textColorsSelector,
} from 'ThemeGenerator/state'
import { Spacer } from 'ThemeGenerator/component-library'
import { isExpectedToBeSafe } from 'ThemeGenerator/config'
import { TextSample, TextColorPlots } from 'ThemeGenerator/components'

export const Shade = ({ shade }: { shade: ShadeType }) => {
  const shadeColor = useRecoilValue(colorDataSelector(shade))
  const textColors = useRecoilValue(textColorsSelector(shade))
  const showTextColorPlots = useRecoilValue(showTextColorPlotsAtom)
  const backgroundColor = shadeColor.isClipped ? 'black' : shadeColor.hex

  return (
    <div
      className="Shade"
      style={{
        backgroundColor,
        color: shadeColor.lch.l > 60 ? 'black' : 'white',
      }}
    >
      <div className="Shade__token-name">{`${shade.scaleName}-${shade.shadeName}`}</div>
      <TextSample
        shadeColor={shadeColor.hex}
        textColor={textColors.regular.hex}
        isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].regular}
      />
      <TextSample
        shadeColor={shadeColor.hex}
        textColor={textColors.subdued.hex}
        isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].subdued}
      />
      <Spacer />
      <TextSample
        shadeColor={shadeColor.hex}
        textColor={textColors.vivid.hex}
        isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].vivid}
      />
      <TextSample
        shadeColor={shadeColor.hex}
        textColor={textColors['vivid-subdued'].hex}
        isExpectedToBeSafe={
          isExpectedToBeSafe[shade.shadeName]['vivid-subdued']
        }
      />
      <Spacer />
      {showTextColorPlots && <TextColorPlots shade={shade} />}
    </div>
  )
}
