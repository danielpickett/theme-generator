import './index.scss'
// import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { ThemeGenerator } from './ThemeGenerator'
// import { CanvasTester } from 'ThemeGenerator/components/Canvas/CanvasTester'
import reportWebVitals from './reportWebVitals'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)

// I can't get Web Worker working in React 18 in Strict Mode.
// I thought it was relate to ths issue:
// https://github.com/facebookexperimental/Recoil/issues/1411
// But they have released their fix now and it still doesn't work.
// Custom Webpack loaders, such as 'worker-loader', are not officially
// supported by CRA, so I'm not too surprised. Maybe moving to Vite in the
// future will take care of this.

root.render(
  // <StrictMode>
  <ThemeGenerator />,
  // <CanvasTester />,

  // </StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
