import './Footer.scss'
import { useRef } from 'react'
import { useWindowSize } from '@danielpickett/hooks'
import { useDragHandle } from 'src/hooks'
import { Output } from 'src/components'

export const Footer = () => {
  const win = useWindowSize()
  const outputDragHandleRef = useRef<HTMLDivElement>(null)
  const outputHeightPx = useDragHandle(outputDragHandleRef, 0, 0)
  return (
    <div className="Footer" style={{ height: `${outputHeightPx}px` }}>
      <div className="Footer__drag-handle" ref={outputDragHandleRef} />
      <Output />
    </div>
  )
}
