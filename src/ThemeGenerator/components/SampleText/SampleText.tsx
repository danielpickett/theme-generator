import chromajs from 'chroma-js'
import './SampleText.scss'

export const SampleText = ({
  swatchColor,
  textColor,
  isExpectedToBeSafe,
}: {
  swatchColor: string
  textColor: string
  isExpectedToBeSafe: boolean
}) => {
  const contrastRatio = chromajs.contrast(swatchColor, textColor)
  const isActuallySafe = contrastRatio >= 4.5
  const problem = isExpectedToBeSafe && !isActuallySafe
  // const opportunity = !isExpectedToBeSafe && isActuallySafe

  return (
    <div className="SampleText" style={{ color: textColor }}>
      <div>{'Sample ' + contrastRatio.toFixed(2)}</div>
      <div>
        {problem && <span className="SampleText__problem" />}
        {isExpectedToBeSafe ? '' : '!'}
      </div>
    </div>
  )
}
