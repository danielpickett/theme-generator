import { ThemeGenerator } from '@danielpickett/theme-generator'
import './App.scss'

export const App = () => {
  return (
    <div className="App">
      <div
        style={{
          backgroundColor: 'var(--color-danger-500)',
          color: 'var(--text-on-white--success)',
        }}
      >
        Hello, world!
      </div>

      <ThemeGenerator />
    </div>
  )
}
