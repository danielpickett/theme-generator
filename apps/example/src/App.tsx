import { ThemeGenerator } from '@danielpickett/theme-generator'
import './App.scss'

export const App = () => {
  return (
    <div className="App">
      Hello, world!
      <div className="App__content">
        <ThemeGenerator />
      </div>
    </div>
  )
}
