import React from 'react'
import './ThemeGenerator.scss'
import '../theme.css'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { Header, Output, Scale } from './components'
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
          <Output />
        </div>
      </div>
    </div>
  )
}
