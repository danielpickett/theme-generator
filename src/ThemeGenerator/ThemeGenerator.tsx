import React from 'react'
import './ThemeGenerator.scss'
import '../theme.css'
import { RecoilRoot, useRecoilValue } from 'recoil'
import ReactDOM from 'react-dom'
import { Header, RawCSSVarsOutput, Scale } from './components'
import { scaleNamesAtom } from './state'

export const ThemeGenerator = () => (
  <RecoilRoot>
    <ThemeGeneratorBase />
  </RecoilRoot>
)

const ThemeGeneratorBase = () => {
  const scaleNames = useRecoilValue(scaleNamesAtom)

  return (
    <div className="ThemeGenerator dark-blue-theme">
      <div className="ThemeGenerator__header">
        <Header />
      </div>
      <div className="ThemeGenerator__body">
        <div className="ThemeGenerator__scales">
          {scaleNames.map((scaleName) => (
            <Scale key={scaleName} scaleName={scaleName} />
          ))}
        </div>
        <div className="ThemeGenerator__output">
          <RawCSSVarsOutput styled />
        </div>
        {ReactDOM.createPortal(
          <style className="color-tokens">
            <RawCSSVarsOutput />
          </style>,
          document.head
        )}
      </div>
    </div>
  )
}
