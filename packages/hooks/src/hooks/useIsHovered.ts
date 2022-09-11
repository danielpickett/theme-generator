import { RefObject, useEffect, useState } from 'react'

export const useIsHovered = (ref: RefObject<HTMLElement>) => {
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const node = ref.current

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    node?.addEventListener('mouseenter', handleMouseEnter)
    node?.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      node?.removeEventListener('mouseenter', handleMouseEnter)
      node?.removeEventListener('mouseleave', handleMouseLeave)
    }
  })

  return isHovered
}
