import React from 'react'
import ReactDOM from 'react-dom'
import { useRecoilValue } from 'recoil'
import { OutputRawCSSVars, OutputTheme } from 'ThemeGenerator/components'
// import { vividTextColorsOnGreySelector } from 'ThemeGenerator/state'
import './Output.scss'

export const Output = () => {
  // const vividTextOnGreyColors = useRecoilValue(vividTextColorsOnGreySelector)
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
