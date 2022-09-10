import { ToggleIconButton } from '@danielpickett/components'
import { Expand, Collapse, Text, LCHGraph } from '@danielpickett/icons'
import { RefObject } from 'react'
import { useRecoilState } from 'recoil'
import {
  isFullscreenAtom,
  showCanvasesAtom,
  showTextColorPlotsAtom,
} from 'src/state'

import './Header.scss'

export const Header = ({
  dragHandleRef,
}: {
  dragHandleRef: RefObject<HTMLDivElement>
}) => {
  const [showCanvases, setShowCanvases] = useRecoilState(showCanvasesAtom)
  const [showTextColorPlots, setShowTextColorPlots] = useRecoilState(
    showTextColorPlotsAtom,
  )
  const [isFullscreen, setIsFullscreen] = useRecoilState(isFullscreenAtom)
  return (
    <div className="Header" ref={dragHandleRef}>
      <div className="Header__buttons">
        <ToggleIconButton
          icon={<LCHGraph />}
          active={showCanvases}
          onChange={setShowCanvases}
        />

        <ToggleIconButton
          icon={<Text />}
          active={showTextColorPlots}
          onChange={setShowTextColorPlots}
        />
      </div>
      <div className="Header__buttons">
        <ToggleIconButton
          icon={<Expand />}
          activeIcon={<Collapse />}
          active={isFullscreen}
          onChange={setIsFullscreen}
        />
      </div>
    </div>
  )
}
