import './MenuTrigger.scss'
import { Menu } from '@danielpickett/icons'
import classNames from 'classnames'

export const MenuTrigger = ({ isOpen }: { isOpen: boolean }) => {
  const modifierClasses = {
    'MenuTrigger--is-open': isOpen,
  }
  return (
    <span className={classNames('MenuTrigger', modifierClasses)}>
      <Menu />
    </span>
  )
}
