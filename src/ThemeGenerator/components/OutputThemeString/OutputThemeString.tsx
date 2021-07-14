import React from 'react'
import { useRecoilValue } from 'recoil'
import { allTokensSelector } from 'ThemeGenerator/state'

export const OutputThemeString = () => {
  const allTokens = useRecoilValue(allTokensSelector)

  return <>{`:root{\n${allTokens}}\n\n`}</>
}
