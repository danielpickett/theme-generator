import './index.scss'
// import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { ThemeGenerator } from './ThemeGenerator'
import reportWebVitals from './reportWebVitals'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)
root.render(
  // https://github.com/facebookexperimental/Recoil/issues/1411
  // Recoil currently not working in React 18 strict mode
  // <StrictMode>
  <ThemeGenerator />,
  // </StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
