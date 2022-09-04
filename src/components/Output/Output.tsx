import './Output.scss'
import ReactDOM from 'react-dom'
import { OutputThemeJSX, OutputThemeString } from 'src/components'

export const Output = () => {
  return (
    <div className="Output">
      <div className="Output__column">
        OutputThemeJSX
        <OutputThemeJSX />
      </div>
      <div className="Output__column">
        OutputThemeString
        <OutputThemeString />
      </div>

      {/* {ReactDOM.createPortal(
        <style className="color-tokens"><OutputThemeJSX /></style>,
        document.head,
      )} */}
    </div>
  )
}
