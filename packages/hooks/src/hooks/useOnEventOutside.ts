import { useEffect, RefObject } from 'react'

/**
 * Runs the handler when the clicked DOM element is not inside any of the element
 * references passed in the 'refs' array of the first parameter.
 * @param refs
 * @param handler
 * @param eventTypes
 */
export const useOnEventOutside = (
  refs: RefObject<HTMLElement>[],
  handler: (event: Event, originalRefs: RefObject<HTMLElement>[]) => void,
  eventTypes: (
    | 'mousedown'
    | 'mouseup'
    | 'touchstart'
    | 'touchend'
    | 'click'
    | 'focus'
    | 'blur'
  )[] = ['click'],
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      // https://stackoverflow.com/questions/43842057/detect-if-click-was-inside-react-component-or-not-in-typescript
      // Justification for this `as Node` type assertion right here 👇
      if (refs.some((ref) => ref.current?.contains(event.target as Node)))
        return
      handler(event, refs)
    }
    eventTypes.forEach((type) => document.addEventListener(type, listener))

    return () => {
      eventTypes.forEach((type) => document.removeEventListener(type, listener))
    }
  })
}
