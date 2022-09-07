import './ThemeGenerator.scss'
import './theme.css'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { Footer, Header, Scale } from './components'
import { DEFAULT_THEME_SCALE_NAMES } from './themes'
import { ResizablePopover } from '@danielpickett/components'
import { isFullscreenAtom } from './state'

const initialPosition = {
  top: 50,
  left: window.innerWidth * 0.33 - 50,
  width: window.innerWidth * 0.66 + 25,
  height: window.innerHeight - 100,
}

const ThemeGenerator = () => {
  const isFullscreen = useRecoilValue(isFullscreenAtom)
  return (
    <ResizablePopover
      initialPosition={initialPosition}
      isFullscreen={isFullscreen}
    >
      {(dragHandleRef) => (
        <div className="ThemeGenerator dark-blue-theme">
          <div className="ThemeGenerator__header">
            <Header dragHandleRef={dragHandleRef} />
          </div>
          <div className="ThemeGenerator__body">
            <div className="ThemeGenerator__scales">
              {DEFAULT_THEME_SCALE_NAMES.map((scaleName) => (
                <Scale key={scaleName} scaleName={scaleName} />
              ))}
            </div>
          </div>

          <div className="ThemeGenerator__footer">
            <Footer />
          </div>
        </div>
      )}
    </ResizablePopover>
  )
}

export default () => (
  <RecoilRoot>
    <ThemeGenerator />
  </RecoilRoot>
)
