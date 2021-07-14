import React from 'react'
import ReactDOM from 'react-dom'
import { OutputThemeJSX, OutputThemeString } from 'ThemeGenerator/components'
import './Output.scss'

export const Output = React.memo(() => {
  return (
    <div className="Output">
      {/* <div className="Output__column">
        <OutputThemeJSX />
      </div> */}
      <div className="Output__column">
        <OutputThemeString />
      </div>

      {ReactDOM.createPortal(
        <style className="color-tokens">
          <OutputThemeJSX />
        </style>,
        document.head
      )}
    </div>
  )
})
