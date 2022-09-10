import { Checkmark } from '@danielpickett/icons'
import { ShadeType } from 'src/types'
import './ShadeCheckmark.scss'

export const ShadeCheckmark = ({
  shade,
  checked,
  onChange,
}: {
  shade: ShadeType
  checked: boolean
  onChange: (checked: boolean) => void
}) => {
  const bgColor = `var(--text-on-${shade.scaleName}-${shade.shadeName})`
  const checkmarkColor = `var(--color-${shade.scaleName}-${shade.shadeName})`

  return (
    <div className="ShadeCheckmark">
      <label
        className="ShadeCheckmark__label"
        style={{
          backgroundColor: bgColor,
          color: checkmarkColor,
          opacity: checked ? 1 : 0.25,
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />

        <div className="ShadeCheckmark__checkmark">
          <Checkmark size="1.25rem" />
        </div>
      </label>
    </div>
  )
}
