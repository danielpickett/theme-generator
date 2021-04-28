import React, { useState } from 'react'
import './ThemeGenerator.scss'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { Scale, scaleNamesAtom } from 'internal'
import { RawCSSVarsOutput } from './components/RawCSSVarsOutput'
import ReactDOM from 'react-dom'

export const ThemeGenerator = () => (
  <RecoilRoot>
    <ThemeGeneratorBase />
  </RecoilRoot>
)

const ThemeGeneratorBase = () => {
  const scaleNames = useRecoilValue(scaleNamesAtom)
  const [testHue, setTestHue] = useState(102)
  const [testLightness, setTestLightness] = useState(95)

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
      <label>
        {'H: '}
        <input
          type="text"
          value={testHue}
          onChange={({ target: { value } }) => setTestHue(+value)}
        />
      </label>
      <label>
        {'L: '}
        <input
          type="text"
          value={testLightness}
          onChange={({ target: { value } }) => setTestLightness(+value)}
        />
      </label>

      <br />
      <br />
      <br />
      <br />
    </div>
  )
}
