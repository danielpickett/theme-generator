import React, { ReactNode, useLayoutEffect, useRef, useState } from 'react'
import './DropdownPanelCollisionAware.scss'
// import mergeRefs from 'react-merge-refs'
import { useWindowSize } from '@danielpickett/hooks'
import { remToPixels } from '../Dropdown/utils'

// On Chrome desktop, this is enough bottom padding to prevent the link preview
// (shown when a link is hovered) from covering the bottom edge of the dropdown
// panel
const padBottom = remToPixels(1.75)

export const DropdownPanelCollisionAware = React.forwardRef<
  HTMLDivElement,
  { children?: ReactNode; overflow?: 'auto' | 'hidden' }
>(
  (
    {
      children,
      overflow = 'auto',
    }: { children?: ReactNode; overflow?: 'auto' | 'hidden' },
    forwardedRef,
  ) => {
    const localRef = useRef<HTMLDivElement>(null)
    const [nudge, setNudge] = useState(0)
    const [maxHeight, setMaxHeight] = useState('none')
    const win = useWindowSize()

    useLayoutEffect(() => {
      const wrapper = localRef.current
      const { round } = Math
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect()
        const overflow = {
          right: rect.right > win.width ? rect.right - win.width : 0,
          left: rect.left < 0 ? rect.left : 0,
        }

        if (overflow.left < 0) setNudge(round(overflow.left))
        else if (overflow.right > 0) setNudge(round(overflow.right))
        else setNudge(0)
      }
    }, [win.width])

    useLayoutEffect(() => {
      const wrapper = localRef.current
      if (wrapper)
        setMaxHeight(
          `${Math.round(
            win.height - wrapper.getBoundingClientRect().top - padBottom,
          )}px`,
        )
    }, [win.height])

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div
        className="DropdownPanelCollisionAware"
        ref={mergeRefs([forwardedRef, localRef])}
        // stopPropogation is used here to prevent triggering the DropdownMenu's
        // "click outside" functionality, which closes the dropdown whenever a
        // click event is dispatched from an element that is not contained inside
        // the DropdownMenu panel. But for dynamic behavior inside a DropdownMenu,
        // some elements might be removed from the DropdownMenu before the
        // "click outside" is processed, meaning that by the time the
        // "click outside" logic is executed, the click target is in fact no
        // longer "contained inside" the DropdownMenu, which makes it think the
        // click was "outside" and then it closes the dropdown. Using
        // stopPropagation here means the clicks dispatched from inside the
        // DropdownPanelCollisionAware will never bubble to the document level, where the
        // listeners from the useOnEventOutside hook are registered.
        onClick={(event) => event.stopPropagation()}
      >
        <div className="CollisionAwareDropdownPanel__arrow" />
        <div className="CollisionAwareDropdownPanel__padding">
          <div
            className="CollisionAwareDropdownPanel__content"
            style={{ right: `${nudge}px`, maxHeight, overflow }}
          >
            {children}
          </div>
        </div>
        <div
          className="CollisionAwareDropdownPanel__arrow"
          style={{ boxShadow: 'none' }}
        />
      </div>
    )
  },
)

DropdownPanelCollisionAware.displayName = 'DropdownPanelCollisionAware'

function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>,
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}
