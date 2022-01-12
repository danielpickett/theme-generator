import './Scale.scss'
import { useRecoilValue } from 'recoil'
import { SHADE_NAMES } from 'ThemeGenerator/constants'
import { showCanvasesAtom } from 'ThemeGenerator/state'
import { ScaleControls, Shade } from 'ThemeGenerator/components'

export const Scale = ({ scaleName }: { scaleName: string }) => {
  const showCanvases = useRecoilValue(showCanvasesAtom)
  return (
    <div className="Scale">
      {showCanvases && <ScaleControls scaleName={scaleName} />}
      <div className="Scale__shades">
        {SHADE_NAMES.map((shadeName) => (
          <Shade key={shadeName} shade={{ scaleName, shadeName }} />
        ))}
      </div>
    </div>
  )
}
