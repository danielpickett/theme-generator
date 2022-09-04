import { useRecoilState } from 'recoil'
import { Spacer } from 'src/component-library'
import { showCanvasesAtom, showTextColorPlotsAtom } from 'src/state'

import './Header.scss'

export const Header = () => {
  const [showCanvases, setShowCanvases] = useRecoilState(showCanvasesAtom)
  const [showTextColorPlots, setShowTextColorPlots] = useRecoilState(
    showTextColorPlotsAtom,
  )
  return (
    <div className="Header">
      <input
        id="show-canvases"
        type="checkbox"
        checked={showCanvases}
        onChange={(e) => setShowCanvases(e.target.checked)}
      />
      <label htmlFor="show-canvases">show canvases</label>

      <Spacer width="2rem" />
      <input
        id="show-text-color-plots"
        type="checkbox"
        checked={showTextColorPlots}
        onChange={(e) => setShowTextColorPlots(e.target.checked)}
      />
      <label htmlFor="show-text-color-plots">show text color canvases</label>
    </div>
  )
}
