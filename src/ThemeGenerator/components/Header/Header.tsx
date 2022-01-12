import { useRecoilState } from 'recoil'
import { ColumnDivider, Spacer } from 'ThemeGenerator/component-library'
import {
  canvasSizeAtom,
  showCanvasesAtom,
  showTextColorPlotsAtom,
  textColorsPlotSizeAtom,
} from 'ThemeGenerator/state'

import './Header.scss'

export const Header = () => {
  const [canvasSize, setCanvasSize] = useRecoilState(canvasSizeAtom)
  const [textColorCanvasSize, setTextColorCanvasSize] = useRecoilState(
    textColorsPlotSizeAtom,
  )
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

      {showCanvases && (
        <>
          <Spacer />
          <input
            id="canvas-size"
            min={1}
            max={20}
            step={0.5}
            type="number"
            value={canvasSize.toFixed(1)}
            onChange={(e) => setCanvasSize(+e.target.value)}
          />
          <label htmlFor="canvas-size">canvas size</label>
        </>
      )}

      <ColumnDivider />
      <input
        id="show-text-color-plots"
        type="checkbox"
        checked={showTextColorPlots}
        onChange={(e) => setShowTextColorPlots(e.target.checked)}
      />
      <label htmlFor="show-text-color-plots">show text color canvases</label>

      {showTextColorPlots && (
        <>
          <Spacer />
          <input
            id="text-color-canvas-size"
            min={1}
            max={20}
            step={0.5}
            type="number"
            value={textColorCanvasSize.toFixed(1)}
            onChange={(e) => setTextColorCanvasSize(+e.target.value)}
          />
          <label htmlFor="text-color-canvas-size">text color canvas size</label>
        </>
      )}
    </div>
  )
}
