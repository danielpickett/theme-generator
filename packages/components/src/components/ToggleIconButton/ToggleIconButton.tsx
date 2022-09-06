import './ToggleIconButton.scss'

import classNames from 'classnames'
import { ReactNode } from 'react'

export const ToggleIconButton = ({
  active,
  onChange,
  icon,
  activeIcon,
}: {
  active: boolean
  onChange: (active: boolean) => void
  icon: ReactNode
  activeIcon?: ReactNode
}) => {
  const modifierClasses = {
    'ToggleIconButton--active': active,
  }

  return (
    <div className={classNames('ToggleIconButton', modifierClasses)}>
      {active && activeIcon ? activeIcon : icon}
      <input
        className="ToggleIconButton__input"
        type="checkbox"
        checked={active}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  )
}
