import React from 'react'
import { useRecoilState } from 'recoil'
import { canvasSizeAtom, Spacer, showCanvasesAtom } from 'ThemeGenerator'
import { showTextColorPlotsAtom } from 'ThemeGenerator/state'

import './Header.scss'

export const Header = () => {
  const [canvasSize, setCanvasSize] = useRecoilState(canvasSizeAtom)
  const [showCanvases, setShowCanvases] = useRecoilState(showCanvasesAtom)
  const [showTextColorPlots, setShowTextColorPlots] = useRecoilState(
    showTextColorPlotsAtom
  )
  return (
    <div className="Header">
      <input
        min={1}
        // max={10}
        step={0.5}
        type="number"
        value={canvasSize.toPrecision(2)}
        onChange={(e) => setCanvasSize(+e.target.value)}
      />
      <Spacer />
      <label htmlFor="show-canvases">show canvases</label>
      <input
        id="show-canvases"
        type="checkbox"
        checked={showCanvases}
        onChange={(e) => setShowCanvases(e.target.checked)}
      />

      <Spacer />
      <label htmlFor="show-text-color-plots">show text color plots</label>
      <input
        id="show-text-color-plots"
        type="checkbox"
        checked={showTextColorPlots}
        onChange={(e) => setShowTextColorPlots(e.target.checked)}
      />
    </div>
  )
}
