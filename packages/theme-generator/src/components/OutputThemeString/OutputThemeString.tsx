import { useRecoilValue } from 'recoil'
import { allTokensSelector } from 'src/state'

export const OutputThemeString = () => {
  const allTokens = useRecoilValue(allTokensSelector)

  return <>{`:root{\n${allTokens}}\n\n`}</>
}
