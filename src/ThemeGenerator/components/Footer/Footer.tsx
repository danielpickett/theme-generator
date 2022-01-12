import './Footer.scss'
import { useRef } from 'react'
import { useDragHandle } from 'ThemeGenerator/hooks'
import { Output } from 'ThemeGenerator/components'

export const Footer = () => {
  const outputDragHandleRef = useRef<HTMLDivElement>(null)
  const outputHeightPx = useDragHandle(outputDragHandleRef, 200, 100) // 45
  return (
    <div className="Footer" style={{ height: `${outputHeightPx}px` }}>
      <div className="Footer__drag-handle" ref={outputDragHandleRef} />
      <Output />
    </div>
  )
}
