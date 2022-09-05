import React from 'react'
import useResizeObserver from '@react-hook/resize-observer'

// from example here: https://www.npmjs.com/package/@react-hook/resize-observer
export const useElementSize = <T extends HTMLElement>(
  target: React.RefObject<T>
) => {
  const [size, setSize] = React.useState<DOMRect>()

  React.useLayoutEffect(() => {
    setSize(target.current?.getBoundingClientRect())
  }, [target])

  useResizeObserver(target, (entry) => setSize(entry.contentRect))
  return size
}

export const useElementScrollHeight = <T extends HTMLElement>(
  target: React.RefObject<T>
) => {
  const [scrollHeight, setScrollHeight] = React.useState<number>()

  React.useLayoutEffect(() => {
    setScrollHeight(target.current?.scrollHeight)
  }, [target])

  useResizeObserver(target, (entry) =>
    setScrollHeight(entry.target.scrollHeight)
  )
  return scrollHeight
}
