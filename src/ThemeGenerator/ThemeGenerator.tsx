import React, { useState } from 'react'
import './ThemeGenerator.scss'
import '../theme.css'
import { RecoilRoot, useRecoilValue } from 'recoil'

import ReactDOM from 'react-dom'
import { Header, RawCSSVarsOutput, Scale } from './components'
import { scaleNamesAtom } from './state'
import { getMostChromaticSafeColor } from './utils'

export const ThemeGenerator = () => (
  <RecoilRoot>
    <ThemeGeneratorBase />
  </RecoilRoot>
)

const ThemeGeneratorBase = () => {
  const scaleNames = useRecoilValue(scaleNamesAtom)

  return (
    <div className="ThemeGenerator dark-blue-theme">
      <Test />
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

const Test = () => {
  const [l, setL] = useState(49)
  const c = 0
  const h = 230

  const handleClick = () => {
    debugger
    getMostChromaticSafeColor({ l, c, h })
  }

  return (
    <div>
      <input type="number" value={l} onChange={(e) => setL(+e.target.value)} />
      <button onClick={handleClick}>go</button>
    </div>
  )
}
