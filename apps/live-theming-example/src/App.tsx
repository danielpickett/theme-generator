import { ThemeGenerator } from '@danielpickett/theme-generator'
import { Chip, Spacer } from '@danielpickett/components'
import './App.scss'

export const App = () => {
  return (
    <div className="App">
      <div className="App__content">
        <Chip variant="danger">Hello, danger!</Chip>
        <Spacer />
        <Chip variant="success">Hello, success!</Chip>
        <Spacer height="5rem" />
        <Chip variant="primary">Hello, primary!</Chip>
        <Spacer height="2rem" />
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <Chip variant="primary-050">Hello, primary!</Chip>
          <Chip variant="primary-100">Hello, primary!</Chip>
          <Chip variant="primary-200">Hello, primary!</Chip>
          <Chip variant="primary-300">Hello, primary!</Chip>
          <Chip variant="primary-400">Hello, primary!</Chip>
          <Chip variant="primary-500">Hello, primary!</Chip>
          <Chip variant="primary-600">Hello, primary!</Chip>
          <Chip variant="primary-700">Hello, primary!</Chip>
          <Chip variant="primary-800">Hello, primary!</Chip>
          <Chip variant="primary-900">Hello, primary!</Chip>
        </div>
      </div>

      <ThemeGenerator />
    </div>
  )
}
