import React, { useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  chromaAtom,
  ShadeType,
  defaultLuminances,
  shadeNames,
  // colorDataPlusSelector,
  // hueAtom,
} from 'ThemeGenerator'
import { size } from '../Canvas/sizes'
import './CanvasPointsOverlay.scss'

export const CanvasPointsOverlay = ({ scaleName }: { scaleName: string }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [hoverCoords, setHoverCoords] = useState<[number, number]>()
  const ref = useRef<HTMLDivElement>(null)

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

  return (
    <div
      ref={ref}
      className="CanvasPointsOverlay"
      style={{
        height: `${100 * size}px`,
        width: `${150 * size}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {shadeNames.slice(1).map((shadeName) => (
        <React.Fragment key={shadeName}>
          {/* <OutputPoint shade={{ scaleName, shadeName }} /> */}
          <InputPoint shade={{ scaleName, shadeName }} />
        </React.Fragment>
      ))}
      {showTooltip && hoverCoords && <Tooltip coords={hoverCoords} />}
    </div>
  )
}

const InputPoint = ({ shade }: { shade: ShadeType }) => {
  const L = defaultLuminances[shade.shadeName]
  const C = useRecoilValue(chromaAtom(shade))
  // const H = useRecoilValue(hueAtom(shade.scaleName))
  return (
    <div
      className="CanvasPointsOverlay__crosshairs"
      style={{
        left: C * size - 1,
        top: 100 * size - L * size - 1,
      }}
    >
      {/* <div style={{ top: '-45px' }} className="CanvasPointsOverlay__output">
        {`L: ${L.toFixed(3)}, C: ${C.toFixed(3)}, H: ${H.toFixed(3)}`}
      </div> */}
      <div className="CanvasPointsOverlay__crosshair CanvasPointsOverlay__crosshair--vertical" />
      <div className="CanvasPointsOverlay__crosshair CanvasPointsOverlay__crosshair--horizontal" />
      <div className="CanvasPointsOverlay__crosshair CanvasPointsOverlay__crosshair--vertical-mask" />
    </div>
  )
}

// const OutputPoint = ({ shade }: { shade: ShadeType }) => {
//   const dataDataPlus = useRecoilValue(colorDataPlusSelector(shade))
//   const L = dataDataPlus.clipped_lch[0]
//   const C = dataDataPlus.clipped_lch[1]
//   const H = dataDataPlus.clipped_lch[2]

//   const style = {
//     backgroundColor: 'red',
//   } as const

//   return (
//     <div
//       className="CanvasPointsOverlay__crosshairs"
//       style={{
//         left: C * size - 1,
//         top: 100 * size - L * size - 1,
//       }}
//     >
//       <div
//         style={{ color: 'red', top: '-24px' }}
//         className="CanvasPointsOverlay__output"
//       >
//         {`L: ${L.toFixed(3)}, C: ${C.toFixed(3)}, H: ${H.toFixed(3)}`}
//       </div>
//       <div
//         style={style}
//         className="CanvasPointsOverlay__crosshair CanvasPointsOverlay__crosshair--vertical"
//       />
//       <div
//         style={style}
//         className="CanvasPointsOverlay__crosshair CanvasPointsOverlay__crosshair--horizontal"
//       />
//       <div
//         style={style}
//         className="CanvasPointsOverlay__crosshair CanvasPointsOverlay__crosshair--vertical-mask"
//       />
//     </div>
//   )
// }

const Tooltip = ({ coords }: { coords: [number, number] }) => {
  const [x, y] = coords
  const C = ((x + 1) / size).toFixed(2)
  const L = ((100 * size - (y + 1)) / size).toFixed(2)

  return (
    <div className="CanvasPointsOverlay__tooltip" style={{ left: x, top: y }}>
      <div className="CanvasPointsOverlay__coord">
        <span>{`C: ${C}`}</span>
      </div>
      <div className="CanvasPointsOverlay__coord">
        <span>{`L: ${L}`}</span>
      </div>
    </div>
  )
}
