import React, { useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { chromaAtom, ShadeType, defaultLuminances, shadeNames } from 'internal'
import { size } from '../Canvas/sizes'
import './CanvasPointsOverlay.scss'

export const CanvasPointsOverlay = ({ scaleName }: { scaleName: string }) => {
  const [showTooltip, setShowTooltip] = useState(true)
  const [hoverCoords, setHoverCoords] = useState<[number, number]>()
  const ref = useRef<HTMLDivElement>(null)

  const logMousePosition = (
    node: HTMLDivElement,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    let rect = node.getBoundingClientRect()

    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    setHoverCoords([x, y])
    // console.log(
    //   'C: ' + (x / size).toFixed(1),
    //   'L: ' + (100 - y / size).toFixed(1)
    // )
  }

  return (
    <div
      ref={ref}
      className="CanvasPointsOverlay"
      style={{
        height: `${100 * size}px`,
        width: `${150 * size}px`,
      }}
      onMouseMove={(e) => ref.current && logMousePosition(ref.current, e)}
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
  return (
    <div className="CanvasPointsOverlay__tooltip" style={{ left: x, top: y }}>
      <div className="CanvasPointsOverlay__coord">
        <span>{`C: ${(x / size).toFixed(2)}`}</span>
        <span>{`x: ${x}`}</span>{' '}
      </div>
      <div className="CanvasPointsOverlay__coord">
        <span>{`L: ${(y / size).toFixed(2)}`}</span>
        <span>{`y: ${y}`}</span>{' '}
      </div>
    </div>
  )
}
