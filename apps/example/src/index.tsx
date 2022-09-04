import { createRoot } from 'react-dom/client'
import { App } from './App'

const container = document.getElementById('root') as HTMLDivElement | null
if (!container) throw new Error('Could not find root node')

const root = createRoot(container)
root.render(<App />)
