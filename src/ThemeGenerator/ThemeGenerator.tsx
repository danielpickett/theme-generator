import React, { useRef } from 'react'
import './ThemeGenerator.scss'
import '../theme.css'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { Footer, Header, Output, Scale } from './components'
import { scaleNamesAtom } from './state'
import { useDragHandle } from './hooks'

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
      </div>
      <div className="ThemeGenerator__footer">
        <Footer />
      </div>
    </div>
  )
}
