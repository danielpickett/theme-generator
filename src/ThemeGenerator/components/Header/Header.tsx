import React from 'react'
import { useRecoilState } from 'recoil'
import { canvasSizeAtom, Spacer, showCanvasesAtom } from 'ThemeGenerator'

import './Header.scss'

export const Header = () => {
  const [canvasSize, setCanvasSize] = useRecoilState(canvasSizeAtom)
  const [showCanvases, setShowCanvases] = useRecoilState(showCanvasesAtom)
  return (
    <div className="Header">
      <input
        min={1}
        max={4}
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
    </div>
  )
}
