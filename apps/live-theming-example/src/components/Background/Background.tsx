import React, { ReactNode } from 'react'
import './Background.scss'

export const Background = ({
  color,
  children,
}: {
  color: ColorType
  children: ReactNode
}) => {
  return (
    <div
      className="Background"
      style={{ backgroundColor: `var(--color-${color})` }}
    >
      {children}
    </div>
  )
}

type ColorType =
  | 'white'
  | 'grey-050'
  | 'grey-100'
  | 'grey-200'
  | 'grey-300'
  | 'grey-400'
  | 'grey-500'
  | 'grey-600'
  | 'grey-700'
  | 'grey-800'
  | 'grey-900'
  | 'primary-050'
  | 'primary-100'
  | 'primary-200'
  | 'primary-300'
  | 'primary-400'
  | 'primary-500'
  | 'primary-600'
  | 'primary-700'
  | 'primary-800'
  | 'primary-900'
  | 'primary-lighter'
  | 'primary'
  | 'primary-darker'
  | 'success-050'
  | 'success-100'
  | 'success-200'
  | 'success-300'
  | 'success-400'
  | 'success-500'
  | 'success-600'
  | 'success-700'
  | 'success-800'
  | 'success-900'
  | 'success-lighter'
  | 'success'
  | 'success-darker'
  | 'warning-050'
  | 'warning-100'
  | 'warning-200'
  | 'warning-300'
  | 'warning-400'
  | 'warning-500'
  | 'warning-600'
  | 'warning-700'
  | 'warning-800'
  | 'warning-900'
  | 'warning-lighter'
  | 'warning'
  | 'warning-darker'
  | 'danger-050'
  | 'danger-100'
  | 'danger-200'
  | 'danger-300'
  | 'danger-400'
  | 'danger-500'
  | 'danger-600'
  | 'danger-700'
  | 'danger-800'
  | 'danger-900'
  | 'danger-lighter'
  | 'danger'
  | 'danger-darker'
