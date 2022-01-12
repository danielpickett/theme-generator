import chromajs from 'chroma-js'
import {
  SAFE_CONTRAST,
  IS_EXPECTED_TO_BE_SAFE_CONFIG,
} from 'ThemeGenerator/constants'
import { ShadeType } from 'ThemeGenerator/types'
import './TextSample.scss'

export const TextSample = ({
  kind,
  shade,
  shadeColor,
  textColor,
}: {
  kind: 'regular' | 'subdued' | 'vivid' | 'vivid-subdued'
  shade: ShadeType
  shadeColor: string
  textColor: string
}) => {
  const _isExpectedToBeSafe =
    IS_EXPECTED_TO_BE_SAFE_CONFIG[shade.shadeName][kind]
  const contrastRatio = chromajs.contrast(shadeColor, textColor)
  const isActuallySafe = contrastRatio >= SAFE_CONTRAST
  const problem = _isExpectedToBeSafe && !isActuallySafe

  return (
    <div className="TextSample" style={{ color: textColor }}>
      <div>{'Sample ' + contrastRatio.toFixed(2)}</div>
      <div>
        {problem && <span className="TextSample__problem" />}

        {_isExpectedToBeSafe ? '' : '!'}
      </div>
    </div>
  )
}
