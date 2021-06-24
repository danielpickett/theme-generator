import React from 'react'
import './Scale.scss'
import { useRecoilValue } from 'recoil'
import { shadeNames } from 'ThemeGenerator/config'
import { showCanvasesAtom } from 'ThemeGenerator/state'
import { ScaleControls, Shade } from 'ThemeGenerator/components'

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
