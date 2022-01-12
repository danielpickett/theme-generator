import './index.scss'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { ThemeGenerator } from './ThemeGenerator'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <StrictMode>
    <ThemeGenerator />
  </StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
