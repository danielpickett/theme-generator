import React from 'react'
import ReactDOM from 'react-dom'
import { OutputRawCSSVars, OutputTheme } from 'ThemeGenerator/components'
import './Output.scss'

export const Output = () => {
  return (
    <div className="Output">
      <div className="Output__column">
        <OutputRawCSSVars styled />
      </div>
      <div className="Output__column">
        <OutputTheme />
      </div>

      {ReactDOM.createPortal(
        <style className="color-tokens">
          <OutputRawCSSVars />
        </style>,
        document.head
      )}
    </div>
  )
}
