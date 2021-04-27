import React, { useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  chromaAtom,
  ShadeType,
  defaultLuminances,
  shadeNames,
  hueAtom,
} from 'internal'
import { size } from '../Canvas/sizes'
import './CanvasPointsOverlay.scss'

export const CanvasPointsOverlay = ({ scaleName }: { scaleName: string }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [hoverCoords, setHoverCoords] = useState<[number, number]>()
  const ref = useRef<HTMLDivElement>(null)
  const H = useRecoilValue(hueAtom(scaleName))

  const [lowerL, setLowerL] = useState<string>()

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (ref.current) {
      let rect = ref.current.getBoundingClientRect()
      let x = event.clientX - rect.left
      let y = event.clientY - rect.top
      setHoverCoords([x, y])
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (hoverCoords) {
      const [x, y] = hoverCoords
      const C = ((x + 1) / size).toFixed(2)
      const L = ((100 * size - (y + 1)) / size).toFixed(2)

      if (e.altKey) {
        navigator.clipboard.writeText(L)
        setLowerL(L)
      } else {
        const text = `if (H <= ${H}) {
  if (L > ${L} || L < ${lowerL || 92}) return false
  else return ${C}
  }`

        navigator.clipboard.writeText(text)
      }
    }
  }

  return (
    <div
      ref={ref}
      className="CanvasPointsOverlay"
      style={{
        height: `${100 * size}px`,
        width: `${150 * size}px`,
      }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {shadeNames.slice(1).map((shadeName) => (
        <Point key={shadeName} shade={{ scaleName, shadeName }} />
      ))}{' '}
      {showTooltip && hoverCoords && <Tooltip coords={hoverCoords} />}
    </div>
  )
}

const Point = ({ shade }: { shade: ShadeType }) => {
  const L = defaultLuminances[shade.shadeName]
  const C = useRecoilValue(chromaAtom(shade))
  return (
    <div
      className="CanvasPointsOverlay__crosshairs"
      style={{
        left: C * size,
        top: 100 * size - L * size,
      }}
    >
      <div className="CanvasPointsOverlay__crosshair CanvasPointsOverlay__crosshair--vertical" />
      <div className="CanvasPointsOverlay__crosshair CanvasPointsOverlay__crosshair--horizontal" />
      <div className="CanvasPointsOverlay__crosshair CanvasPointsOverlay__crosshair--vertical-mask" />
    </div>
  )
}

const Tooltip = ({ coords }: { coords: [number, number] }) => {
  const [x, y] = coords
  const C = ((x + 1) / size).toFixed(2)
  const L = ((100 * size - (y + 1)) / size).toFixed(2)

  return (
    <div className="CanvasPointsOverlay__tooltip" style={{ left: x, top: y }}>
      <div className="CanvasPointsOverlay__horizontal-guide" />
      <div className="CanvasPointsOverlay__vertical-guide" />
      <div className="CanvasPointsOverlay__coord">
        <span>{`C: ${C}`}</span>
      </div>
      <div className="CanvasPointsOverlay__coord">
        <span>{`L: ${L}`}</span>
      </div>
    </div>
  )
}
