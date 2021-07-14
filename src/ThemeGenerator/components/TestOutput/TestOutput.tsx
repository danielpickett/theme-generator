import React from 'react'
import { OutputTheme } from '../OutputTheme'
import './TestOutput.scss'

export const TestOutput = () => {
  return (
    <div className="TestOutput">
      <p style={{ backgroundColor: 'tomato', color: 'white' }}>
        Hello from the TestOutput component
      </p>
      <OutputTheme />
    </div>
  )
}
