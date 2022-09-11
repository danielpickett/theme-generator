import React, { ReactNode, useRef } from 'react'
import './DropdownPanelFixed.scss'

export const DropdownPanelFixed = React.forwardRef<
  HTMLDivElement,
  { children?: ReactNode; overflow?: 'auto' | 'hidden' }
>(
  (
    { children }: { children?: ReactNode; overflow?: 'auto' | 'hidden' },
    forwardedRef,
  ) => {
    const localRef = useRef<HTMLDivElement>(null)

    return (
      <div
        className="DropdownPanelFixed"
        ref={mergeRefs([forwardedRef, localRef])}
      >
        <div className="DropdownPanelFixed__content">{children}</div>
      </div>
    )
  },
)

DropdownPanelFixed.displayName = 'DropdownPanelFixed'

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
