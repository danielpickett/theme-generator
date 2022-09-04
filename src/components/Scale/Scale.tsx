import './Scale.scss'
import { useRecoilValue } from 'recoil'
import { SHADE_NAMES } from 'src/app-constants'
import { showCanvasesAtom } from 'src/state'
import { ScaleControls, Shade } from 'src/components'

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
