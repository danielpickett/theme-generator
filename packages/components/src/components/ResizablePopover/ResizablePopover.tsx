import ReactDOM from 'react-dom'
import { RefObject, useRef } from 'react'
import './ResizablePopover.scss'
import { useDragHandle } from '@danielpickett/hooks'

export const ResizablePopover = ({
  initialPosition,
  children,
}: {
  initialPosition?: { top: number; left: number; width: number; height: number }
  children: (dragHandleRef: RefObject<HTMLDivElement>) => JSX.Element
}) => {
  const dragHandleRef = useRef<HTMLDivElement>(null)
  const resizeHandleRef = useRef<HTMLDivElement>(null)
  const { x, y } = useDragHandle(dragHandleRef, {
    x: initialPosition?.left || 50,
    y: initialPosition?.top || 50,
  })
  const { x: width, y: height } = useDragHandle(resizeHandleRef, {
    x: initialPosition?.width || 500,
    y: initialPosition?.height || 500,
  })

  return ReactDOM.createPortal(
    <div
      className="ResizablePopover"
      style={{
        top: `${y}px`,
        left: `${x}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {children(dragHandleRef)}
      <div className="ResizablePopover__resize-handle" ref={resizeHandleRef}>
        <div className="ResizablePopover__grip-lines" />
      </div>
    </div>,
    document.body,
  )
}
