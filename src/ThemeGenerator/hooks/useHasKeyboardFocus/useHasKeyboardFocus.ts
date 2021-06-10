// adapted from https://github.com/WICG/focus-visible

import React, { useEffect, useRef, useState } from 'react'

export const useHasKeyboardFocus = <RefT extends Element>(
  ref: React.RefObject<RefT>,
) => {
  const modalityRef = useRef<'pointer' | 'keyboard'>('keyboard')
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false)

  useEffect(() => {
    const modality = {
      keyboard: (e: KeyboardEvent) => {
        if (e.metaKey || e.altKey || e.ctrlKey) return
        modalityRef.current = 'keyboard'
      },
      pointer: () => {
        setHasKeyboardFocus(false)
        modalityRef.current = 'pointer'
      },
    }

    const keyboardFocus = {
      on: () => setHasKeyboardFocus(true),
      off: () => setHasKeyboardFocus(false),
    }

    const handleElementFocus = () => {
      if (modalityRef.current === 'keyboard') {
        keyboardFocus.on()
      }
    }

    const element = ref.current
    if (element) {
      element.addEventListener('focus', handleElementFocus)
      element.addEventListener('blur', keyboardFocus.off)
      element.addEventListener('keydown', keyboardFocus.on, true)
    }
    document.addEventListener('keydown', modality.keyboard, true)
    document.addEventListener('mousedown', modality.pointer, true)
    document.addEventListener('pointerdown', modality.pointer, true)
    document.addEventListener('touchstart', modality.pointer, true)

    return () => {
      if (element) {
        element.removeEventListener('focus', handleElementFocus)
        element.removeEventListener('blur', keyboardFocus.off)
        element.removeEventListener('keydown', keyboardFocus.on, true)
      }
      document.removeEventListener('keydown', modality.keyboard, true)
      document.removeEventListener('mousedown', modality.pointer, true)
      document.removeEventListener('pointerdown', modality.pointer, true)
      document.removeEventListener('touchstart', modality.pointer, true)
    }
  }, [ref])
  return hasKeyboardFocus
}
