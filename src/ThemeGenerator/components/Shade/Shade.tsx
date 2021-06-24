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
  const swatchColor = useRecoilValue(colorDataSelector(shade))
  const textColors = useRecoilValue(textColorsSelector(shade))
  const showTextColorPlots = useRecoilValue(showTextColorPlotsAtom)
  const backgroundColor = swatchColor.isClipped ? 'black' : swatchColor.hex

  return (
    <div
      className="Shade"
      style={{
        backgroundColor,
        color: swatchColor.lch.l > 60 ? 'black' : 'white',
      }}
    >
      <div className="Shade__token-name">{`${shade.scaleName}-${shade.shadeName}`}</div>
      <TextSample
        swatchColor={swatchColor.hex}
        textColor={textColors.regular.hex}
        isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].regular}
      />
      <TextSample
        swatchColor={swatchColor.hex}
        textColor={textColors.subdued.hex}
        isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].subdued}
      />
      <Spacer />
      <TextSample
        swatchColor={swatchColor.hex}
        textColor={textColors.vivid.hex}
        isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].vivid}
      />
      <TextSample
        swatchColor={swatchColor.hex}
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
