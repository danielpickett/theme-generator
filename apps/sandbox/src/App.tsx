import { ResizablePopover } from '@danielpickett/components'
import './App.scss'

export const App = () => {
  return (
    <div className="App">
      <ResizablePopover>
        {(dragHandleRef) => <div ref={dragHandleRef}>hello</div>}
      </ResizablePopover>
    </div>
  )
}
