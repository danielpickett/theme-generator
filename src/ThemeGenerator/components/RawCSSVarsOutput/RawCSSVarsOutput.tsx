import React, { Fragment } from 'react'
import { useRecoilValue } from 'recoil'
import { scaleNamesAtom, shadeNames, ShadeType } from 'internal'
import { colorDataSelector } from 'ThemeGenerator/state'

const COLUMN_WIDTH = 20

export const RawCSSVarsOutput = ({ styled = false }: { styled?: boolean }) => {
  const scaleNames = useRecoilValue(scaleNamesAtom)

  const content = (
    <>
      {':root {\n'}
      {scaleNames.map((scaleName, index) => (
        <Fragment key={scaleName}>
          {shadeNames.map((shadeName) => {
            return (
              <TokenOutput
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

const TokenOutput = ({
  shade,
  styled,
}: {
  shade: ShadeType
  styled: boolean
}) => {
  const { hex, isClipped } = useRecoilValue(colorDataSelector(shade))
  const color = isClipped ? '-ERROR-' : hex
  const padding = ' '.repeat(
    COLUMN_WIDTH - shade.scaleName.length - shade.shadeName.length
  )
  const content = `  --${shade.scaleName}-${shade.shadeName}: ${padding}${color};\n`

  return styled ? <span>{content}</span> : <>{content}</>
}
