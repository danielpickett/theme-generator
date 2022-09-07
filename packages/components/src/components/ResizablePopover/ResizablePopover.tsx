import ReactDOM from 'react-dom'
import { RefObject, useRef } from 'react'
import classNames from 'classnames'
import { useDragHandle } from '@danielpickett/hooks'
import './ResizablePopover.scss'

export const ResizablePopover = ({
  initialPosition,
  isFullscreen = false,
  children,
}: {
  initialPosition?: { top: number; left: number; width: number; height: number }
  isFullscreen?: boolean
  children: (dragHandleRef: RefObject<HTMLDivElement>) => JSX.Element
}) => {
  const dragHandleRef = useRef<HTMLDivElement>(null)
  const resizeHandleRef = useRef<HTMLDivElement>(null)

  const [left, top] = useDragHandle(
    dragHandleRef,
    {
      x: initialPosition?.left || 50,
      y: initialPosition?.top || 50,
    },
    { enabled: !isFullscreen, exactTarget: true },
  )

  const [width, height] = useDragHandle(
    resizeHandleRef,
    {
      x: initialPosition?.width || 500,
      y: initialPosition?.height || 500,
    },
    { enabled: !isFullscreen, exactTarget: true },
  )

  const modifierClasses = {
    'ResizablePopover--is-fullscreen': isFullscreen,
  }

  return ReactDOM.createPortal(
    <div
      className={classNames('ResizablePopover', modifierClasses)}
      style={{
        top: isFullscreen ? 0 : `${top}px`,
        left: isFullscreen ? 0 : `${left}px`,
        width: isFullscreen ? '100%' : `${width}px`,
        height: isFullscreen ? '100%' : `${height}px`,
      }}
    >
      {children(dragHandleRef)}
      {!isFullscreen && (
        <div className="ResizablePopover__resize-handle" ref={resizeHandleRef}>
          <div className="ResizablePopover__grip-lines" />
        </div>
      )}
    </div>,
    document.body,
  )
}
