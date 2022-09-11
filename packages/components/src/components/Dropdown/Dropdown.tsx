import React, { ReactNode, useRef, useState } from 'react'
import './Dropdown.scss'
import classNames from 'classnames'
import { useOnEventOutside } from '@danielpickett/hooks'
import { DropdownPanel } from '../DropdownPanel'

export const Dropdown = ({
  renderTrigger,
  children,
  'aria-label': ariaLabel,
}: {
  renderTrigger: (isOpen: boolean) => JSX.Element
  'aria-label': string
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeDropdown = () => setIsOpen(false)
  const toggleDropdown = () => setIsOpen((prev) => !prev)
  const rootRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  useOnEventOutside([buttonRef, contentRef], closeDropdown)

  const handleBlur = (
    // for blur events, relatedTarget is the element receiving focus
    // https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget
    { relatedTarget }: React.FocusEvent<HTMLDivElement, Element>,
  ) => {
    if (
      isOpen &&
      rootRef.current &&
      !!relatedTarget &&
      !rootRef.current.contains(relatedTarget)
    ) {
      closeDropdown()
    }
  }

  const closeOnEscapeKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.code === 'Escape') closeDropdown()
  }

  return (
    <div
      className={classNames('Dropdown', {
        'Dropdown--is-open': isOpen,
      })}
      onBlur={handleBlur}
      ref={rootRef}
      onKeyDown={closeOnEscapeKeyPress}
    >
      <button
        ref={buttonRef}
        className="Dropdown__trigger"
        type="button"
        onClick={toggleDropdown}
        aria-haspopup
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        {renderTrigger(isOpen)}
      </button>

      {isOpen ? (
        <DropdownPanel ref={contentRef}>{children}</DropdownPanel>
      ) : null}
    </div>
  )
}
