import React from 'react'
import { useRecoilValue } from 'recoil'
import { chromaAtom, ShadeType, defaultLuminances, shadeNames } from 'internal'
import { size } from '../Canvas/sizes'
import './CanvasPointsOverlay.scss'

export const CanvasPointsOverlay = ({ scaleName }: { scaleName: string }) => {
  return (
    <div
      className="CanvasPointsOverlay"
      style={{
        height: `${100 * size}px`,
        width: `${150 * size}px`,
      }}
    >
      {shadeNames.slice(1).map((shadeName) => (
        <Point key={shadeName} shade={{ scaleName, shadeName }} />
      ))}{' '}
    </div>
  )
}

const Point = ({ shade }: { shade: ShadeType }) => {
  const L = defaultLuminances[shade.shadeName]
  const C = useRecoilValue(chromaAtom(shade))
  // const H = useRecoilValue(hueAtom(shade.scaleName))
  return (
    <div
      className="CanvasPointsOverlay__point"
      style={{
        backgroundColor: L > 50 ? 'black' : 'white',
        left: C * size,
        top: 100 * size - L * size,
      }}
    ></div>
  )
}
