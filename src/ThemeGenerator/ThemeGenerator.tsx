import React from 'react'
import './ThemeGenerator.scss'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { Scale, scaleIdsAtom } from 'internal'

export const ThemeGenerator = () => (
  <RecoilRoot>
    <div className="ThemeGenerator">
      <ThemeGeneratorScales />
    </div>
  </RecoilRoot>
)

const ThemeGeneratorScales = () => {
  const scaleNames = useRecoilValue(scaleIdsAtom)
  return (
    <div className="ThemeGenerator__scales">
      {scaleNames.map((scaleName) => (
        <Scale key={scaleName} scaleName={scaleName} />
      ))}
    </div>
  )
}
