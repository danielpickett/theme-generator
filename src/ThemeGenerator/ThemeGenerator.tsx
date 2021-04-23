import React, { useState } from 'react'
import './ThemeGenerator.scss'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { Scale, scaleNamesAtom } from 'internal'
import { RawCSSVarsOutput } from './components/RawCSSVarsOutput'
import ReactDOM from 'react-dom'
import { getMaxChroma } from './utils'

export const ThemeGenerator = () => (
  <RecoilRoot>
    <ThemeGeneratorBase />
  </RecoilRoot>
)

const ThemeGeneratorBase = () => {
  const scaleNames = useRecoilValue(scaleNamesAtom)
  const [testHue, setTestHue] = useState(102)
  const [testLightness, setTestLightness] = useState(95)

  const handleClick = () => {
    console.time('getMaxChroma x   1')
    const maxChroma = getMaxChroma(testLightness, testHue)
    console.timeEnd('getMaxChroma x   1')
    console.time('getMaxChroma x 500')
    for (let i = 0; i < 500; i++) {
      getMaxChroma(testLightness, testHue)
    }
    console.timeEnd('getMaxChroma x 500')
    console.log(maxChroma)
  }

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
      <button onClick={handleClick}>getMaxChroma</button>
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}
