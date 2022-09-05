import { useCallback, useEffect, useState } from 'react'
import { useWindowSize } from './useWindowSize'

export const useDragHandle = (
  dragHandleRef: React.RefObject<HTMLDivElement>,
  initialValues: { x: number; y: number },
) => {
  const winSize = useWindowSize()
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState(initialValues)

  const handleMouseUp = useCallback(() => setIsDragging(false), [setIsDragging])

  const handleMouseMove = useCallback(
    (event: globalThis.MouseEvent) => {
      setPosition((prev) => {
        const next = {
          x: prev.x + event.movementX,
          y: prev.y + event.movementY,
        }

        return {
          x: next.x > winSize.width || next.x < 0 ? prev.x : next.x,
          y: next.y > winSize.height || next.y < 0 ? prev.y : next.y,
        }
      })
    },
    [winSize],
  )

  useEffect(() => {
    const dragHandle = dragHandleRef.current
    const handleMouseDown = () => setIsDragging(true)
    if (dragHandle) dragHandle.addEventListener('mousedown', handleMouseDown)

    return () => {
      if (dragHandle)
        dragHandle.removeEventListener('mousedown', handleMouseDown)
    }
  }, [dragHandleRef])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = 'none'
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      document.body.style.removeProperty('user-select')
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseUp, handleMouseMove])
  return position
}
