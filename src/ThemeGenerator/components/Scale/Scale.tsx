import React from 'react'
import { useRecoilValue } from 'recoil'
import {
  ScaleControls,
  Shade,
  shadeNames,
  showCanvasesAtom,
} from 'ThemeGenerator'
import './Scale.scss'

export const Scale = ({ scaleName }: { scaleName: string }) => {
  const showCanvases = useRecoilValue(showCanvasesAtom)
  return (
    <div className="Scale">
      {showCanvases && <ScaleControls scaleName={scaleName} />}
      <div className="Scale__shades">
        {shadeNames.map((shadeName) => (
          <Shade key={shadeName} shade={{ scaleName, shadeName }} />
        ))}
      </div>
    </div>
  )
}
