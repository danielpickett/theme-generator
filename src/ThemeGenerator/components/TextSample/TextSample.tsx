import chromajs from 'chroma-js'
import { safeContrast } from 'ThemeGenerator/config'
import './TextSample.scss'

export const TextSample = ({
  shadeColor,
  textColor,
  isExpectedToBeSafe,
}: {
  shadeColor: string
  textColor: string
  isExpectedToBeSafe: boolean
}) => {
  const contrastRatio = chromajs.contrast(shadeColor, textColor)
  const isActuallySafe = contrastRatio >= safeContrast
  const problem = isExpectedToBeSafe && !isActuallySafe
  // const opportunity = !isExpectedToBeSafe && isActuallySafe

  return (
    <div className="TextSample" style={{ color: textColor }}>
      <div>{'Sample ' + contrastRatio.toFixed(2)}</div>
      <div>
        {problem && <span className="TextSample__problem" />}

        {isExpectedToBeSafe ? '' : '!'}
      </div>
    </div>
  )
}
