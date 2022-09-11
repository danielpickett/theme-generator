import classNames from 'classnames'
import './Text.scss'
import { TextPropsType } from './types'

export const Text = ({
  on,
  kind,
  size = 'md',
  tag = 'span',
  children,
}: TextPropsType) => {
  const Element = tag

  const _kind = kind ? `--${kind}` : ''

  const color = `var(--text-on-${on}${_kind})`

  const modifierClasses = {
    [`Text--size-${size}`]: size,
  }

  return (
    <Element className={classNames('Text', modifierClasses)} style={{ color }}>
      {children}
    </Element>
  )
}
