import chromajs from 'chroma-js'
import './TextSample.scss'

export const TextSample = ({
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
    <div className="TextSample" style={{ color: textColor }}>
      <div>{'Sample ' + contrastRatio.toFixed(2)}</div>
      <div>
        {problem && <span className="TextSample__problem" />}
        {isExpectedToBeSafe ? '' : '!'}
      </div>
    </div>
  )
}
