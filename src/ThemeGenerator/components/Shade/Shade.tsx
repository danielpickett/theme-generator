import React from 'react'
import './Shade.scss'
import { useRecoilValue } from 'recoil'
import {
  colorDataSelector,
  textColorsSelector,
  ShadeType,
  isExpectedToBeSafe,
  SampleText,
  Spacer,
  TextColorPlots,
} from 'ThemeGenerator'

export const Shade = ({ shade }: { shade: ShadeType }) => {
  const swatchColor = useRecoilValue(colorDataSelector(shade))
  const textColors = useRecoilValue(textColorsSelector(shade))
  const backgroundColor = swatchColor.isClipped ? 'black' : swatchColor.hex

  return (
    <div
      className="Shade"
      style={{
        backgroundColor,
        color: swatchColor.lch.l > 65 ? 'black' : 'white',
      }}
    >
      <div className="Shade__token-name">{`${shade.scaleName}-${shade.shadeName}`}</div>

      <SampleText
        swatchColor={swatchColor.hex}
        textColor={textColors.regular.hex}
        isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].regular}
      />
      <SampleText
        swatchColor={swatchColor.hex}
        textColor={textColors.subdued.hex}
        isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].subdued}
      />
      <Spacer />
      <SampleText
        swatchColor={swatchColor.hex}
        textColor={textColors.vivid.hex}
        isExpectedToBeSafe={isExpectedToBeSafe[shade.shadeName].vivid}
      />
      <TextColorPlots shade={shade} />
    </div>
  )
}
