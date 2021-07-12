import React, { Fragment } from 'react'
import { useRecoilValue } from 'recoil'
import { shadeNames } from 'ThemeGenerator/config'
import { scaleNamesAtom, shadeColorSelector } from 'ThemeGenerator/state'
import { ShadeType } from 'ThemeGenerator/types'
import { getColorData } from 'ThemeGenerator/utils'

const COLUMN_WIDTH = 20

export const OutputRawCSSVars = ({ styled = false }: { styled?: boolean }) => {
  const scaleNames = useRecoilValue(scaleNamesAtom)

  const content = (
    <>
      {':root {\n'}
      {scaleNames.map((scaleName, index) => (
        <Fragment key={scaleName}>
          {shadeNames.map((shadeName) => {
            return (
              <OutputToken
                key={shadeName}
                shade={{ scaleName, shadeName }}
                styled={styled}
              />
            )
          })}
          {index < scaleNames.length - 1 && '\n'}
        </Fragment>
      ))}
      {'}\n'}
    </>
  )
  return styled ? <pre>{content}</pre> : content
}

const OutputToken = ({
  shade,
  styled,
}: {
  shade: ShadeType
  styled: boolean
}) => {
  const shadeColor = useRecoilValue(shadeColorSelector(shade))

  const { hex, isClipped } = getColorData(shadeColor)
  const color = isClipped ? '-ERROR-' : hex
  const padding = ' '.repeat(
    COLUMN_WIDTH - shade.scaleName.length - shade.shadeName.length
  )
  const content = `  --${shade.scaleName}-${shade.shadeName}: ${padding}${color};\n`

  return styled ? <span>{content}</span> : <>{content}</>
}
