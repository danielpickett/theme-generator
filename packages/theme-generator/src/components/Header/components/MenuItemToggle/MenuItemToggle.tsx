import './MenuItemToggle.scss'
import { Checkmark } from '@danielpickett/icons'

export const MenuItemToggle = ({
  label,
  active,
  onChange,
}: {
  label: string
  active: boolean
  onChange: (active: boolean) => void
}) => {
  return (
    <button className="MenuItemToggle" onClick={() => onChange(!active)}>
      <div className="MenuItemToggle__icon">
        {active && <Checkmark size="1.25rem" />}
      </div>
      <div className="MenuItemToggle__label">{label}</div>
    </button>
  )
}
