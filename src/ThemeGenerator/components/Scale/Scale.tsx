import React from 'react'
import { ScaleControls, Shade, shadeNames } from 'ThemeGenerator'
import './Scale.scss'

export const Scale = ({ scaleName }: { scaleName: string }) => (
  <div className="Scale">
    <ScaleControls scaleName={scaleName} />
    <div className="Scale__shades">
      {shadeNames.map((shadeName) => (
        <Shade key={shadeName} shade={{ scaleName, shadeName }} />
      ))}
    </div>
  </div>
)
