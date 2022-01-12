import './ThemeGenerator.scss'
import '../theme.css'
import { RecoilRoot } from 'recoil'
import {
  // Footer,
  Header,
  Scale,
} from './components'
import { DEFAULT_THEME_SCALE_NAMES } from './themes'

export const ThemeGenerator = () => (
  <RecoilRoot>
    <ThemeGeneratorBase />
  </RecoilRoot>
)

const ThemeGeneratorBase = () => {
  return (
    <div className="ThemeGenerator dark-blue-theme">
      <div className="ThemeGenerator__header">
        <Header />
      </div>
      <div className="ThemeGenerator__body">
        <div className="ThemeGenerator__scales">
          {DEFAULT_THEME_SCALE_NAMES.map((scaleName) => (
            <Scale key={scaleName} scaleName={scaleName} />
          ))}
        </div>
      </div>
      {/* <div className="ThemeGenerator__footer"><Footer /></div> */}
    </div>
  )
}
