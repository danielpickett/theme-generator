import React from 'react'
import './StyledCSSVarsOutput.scss'
import { RawCSSVarsOutput, scales } from 'internal'

export const StyledCSSVarsOutput = () => {
  return (
    <div className="StyledCSSVarsOutput">
      <pre>
        <RawCSSVarsOutput scales={scales} columnWidth={30} />
      </pre>
    </div>
  )
}
