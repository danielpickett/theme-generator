import React from 'react'
import ReactDOM from 'react-dom'
import { OutputTheme } from 'ThemeGenerator/components'
import './Output.scss'

export const Output = React.memo(() => {
  return (
    <div className="Output">
      <div className="Output__column">
        <OutputTheme />
      </div>

      {ReactDOM.createPortal(
        <style className="color-tokens">
          <OutputTheme />
        </style>,
        document.head
      )}
    </div>
  )
})
