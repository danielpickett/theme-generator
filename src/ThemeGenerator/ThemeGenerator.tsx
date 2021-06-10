import React from 'react'
import './ThemeGenerator.scss'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { Scale, scaleNamesAtom, RawCSSVarsOutput } from './'
import ReactDOM from 'react-dom'

export const ThemeGenerator = () => (
  <RecoilRoot>
    <ThemeGeneratorBase />
  </RecoilRoot>
)

const ThemeGeneratorBase = () => {
  const scaleNames = useRecoilValue(scaleNamesAtom)

  return (
    <div className="ThemeGenerator">
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
  )
}
