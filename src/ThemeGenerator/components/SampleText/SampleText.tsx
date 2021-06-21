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

  const style = {
    backgroundColor: problem ? 'red' : undefined,
    // boxShadow: opportunity ? '0 0 0 .25rem green' : undefined,
  }

  return (
    <div className="SampleText" style={{ color: textColor }}>
      <span>{'Sample ' + contrastRatio.toFixed(2)}</span>
      <span style={style}>{isExpectedToBeSafe ? '' : '!'}</span>
    </div>
  )
}
