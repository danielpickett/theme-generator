import React from 'react'
import { useRecoilValue } from 'recoil'
import { requiredTokens as _requiredTokens } from 'resources'
import { staticTokens } from 'ThemeGenerator/config/staticTokens'
import { allTokensSelector } from 'ThemeGenerator/state'

export const TestOutput = () => {
  const allTokens = useRecoilValue(allTokensSelector)

  const handleClick = () => {
    const requiredTokens = [..._requiredTokens]
    const allTokenNames = allTokens.match(/--.*(?=:)/g)
    const missingTokens: string[] = []

    if (allTokenNames) {
      requiredTokens.forEach((requiredToken) => {
        if (allTokenNames.includes(requiredToken)) {
          const index = allTokenNames.indexOf(requiredToken)
          if (index > -1) {
            allTokenNames.splice(index, 1)
          }
        } else {
          missingTokens.push(requiredToken)
        }
      })
    } else {
      console.log('no tokens found in output')
    }
    const extraTokens = allTokenNames ? [...allTokenNames] : []

    console.log('\n\nMISSING TOKENS')
    missingTokens.forEach((token) => console.log(token))
    console.log('\n\nEXTRA TOKENS')
    extraTokens.forEach((token) => console.log(token))
  }

  return (
    <>
      <button onClick={handleClick}>Test Tokens</button>
      <br />
      <br />
      {`:root{\n${allTokens}\n\n}\n\n`}
    </>
  )
}
