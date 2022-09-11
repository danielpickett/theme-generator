import './Header.scss'
import { Dropdown, ToggleIconButton } from '@danielpickett/components'
import { Expand, Collapse } from '@danielpickett/icons'
import { RefObject } from 'react'
import { useRecoilState } from 'recoil'
import {
  isFullscreenAtom,
  showCanvasesAtom,
  showShadeNamesAtom,
  showTextColorPlotsAtom,
  showTextSamplesAtom,
} from 'src/state'
import { MenuItemToggle, MenuTrigger } from './components'

export const Header = ({
  dragHandleRef,
}: {
  dragHandleRef: RefObject<HTMLDivElement>
}) => {
  const [showCanvases, setShowCanvases] = useRecoilState(showCanvasesAtom)
  const [showTextColorPlots, setShowTextColorPlots] = useRecoilState(
    showTextColorPlotsAtom,
  )
  const [showTextSample, setShowTextSample] =
    useRecoilState(showTextSamplesAtom)
  const [showShadeNames, setShowShadeNames] = useRecoilState(showShadeNamesAtom)

  const [isFullscreen, setIsFullscreen] = useRecoilState(isFullscreenAtom)

  const handleShowAllChange = (showAll: boolean) => {
    const setters = [
      setShowShadeNames,
      setShowCanvases,
      setShowTextSample,
      setShowTextColorPlots,
    ]
    if (showAll) {
      setters.forEach((setter) => setter(true))
    } else {
      setters.forEach((setter) => setter(false))
    }
  }

  return (
    <div className="Header" ref={dragHandleRef}>
      <Dropdown
        aria-label="Foo"
        renderTrigger={(isOpen) => <MenuTrigger isOpen={isOpen} />}
      >
        <div className="Header__menu-content">
          <MenuItemToggle
            active={showTextColorPlots}
            onChange={handleShowAllChange}
            label="Show all"
          />
          <MenuItemToggle
            active={showShadeNames}
            onChange={setShowShadeNames}
            label="Show shade names"
          />
          <MenuItemToggle
            active={showCanvases}
            onChange={setShowCanvases}
            label="Show color graphs"
          />
          <MenuItemToggle
            active={showTextSample}
            onChange={setShowTextSample}
            label="Show text samples"
          />
          <MenuItemToggle
            active={showTextColorPlots}
            onChange={setShowTextColorPlots}
            label="Show text color graphs"
          />
        </div>
      </Dropdown>

      <ToggleIconButton
        icon={<Expand />}
        activeIcon={<Collapse />}
        active={isFullscreen}
        onChange={setIsFullscreen}
      />
    </div>
  )
}
