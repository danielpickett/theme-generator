import React from 'react'
import './ThemeGenerator.scss'
import { RecoilRoot } from 'recoil'
import { RawCSSVarsOutput, Scale, scales, StyledCSSVarsOutput } from 'internal'
import ReactDOM from 'react-dom'

export const ThemeGenerator = () => {
  return (
    <RecoilRoot>
      <div className="ThemeGenerator">
        <div className="ThemeGenerator__scales">
          {scales.map((scale) => (
            <Scale key={scale.id} scale={scale} />
          ))}
        </div>
        <div className="ThemeGenerator__ouput">
          <StyledCSSVarsOutput />
        </div>
      </div>
      {ReactDOM.createPortal(
        <style className="theme-tokens">
          <RawCSSVarsOutput scales={scales} />
        </style>,
        document.head
      )}
    </RecoilRoot>
  )
}
