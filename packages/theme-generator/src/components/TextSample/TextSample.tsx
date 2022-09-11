import chromajs from 'chroma-js'
import { ReactNode, useRef, useState } from 'react'
import { useOnEventOutside } from '@danielpickett/hooks'
import { SAFE_CONTRAST, IS_EXPECTED_TO_BE_SAFE_CONFIG } from 'src/constants'
import { ShadeType } from 'src/types'
import './TextSample.scss'

type KindType = 'regular' | 'subdued' | 'vivid' | 'vivid-subdued'

export const TextSample = ({
  kind,
  shade,
  shadeColor,
  textColor,
}: {
  kind: KindType
  shade: ShadeType
  shadeColor: string
  textColor: string
}) => {
  const _isExpectedToBeSafe =
    IS_EXPECTED_TO_BE_SAFE_CONFIG[shade.shadeName][kind]
  const contrastRatio = chromajs.contrast(shadeColor, textColor)
  const isActuallySafe = contrastRatio >= SAFE_CONTRAST
  const problem = _isExpectedToBeSafe && !isActuallySafe

  const tokenName = getTokenStr(shade, kind, _isExpectedToBeSafe)

  return (
    <Tooltip content={tokenName}>
      <div
        className="TextSample"
        style={{ color: textColor }}
        title={tokenName}
      >
        <div>{'Sample ' + contrastRatio.toFixed(2)}</div>
        <div>
          {problem && <span className="TextSample__problem" />}
          {_isExpectedToBeSafe ? '' : '!'}
        </div>
      </div>
    </Tooltip>
  )
}

const getTokenStr = (shade: ShadeType, kind: KindType, isSafe: boolean) => {
  const textOnStr =
    shade.shadeName === '000'
      ? '--text-on-white'
      : `--text-on-${shade.scaleName}-${shade.shadeName}`
  const kindStr = kind === 'regular' ? '' : `--${kind}`
  const unsafeStr = isSafe ? '' : '--UNSAFE'
  return textOnStr + kindStr + unsafeStr
}

const Tooltip = ({
  content,
  children,
}: {
  content: string
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  useOnEventOutside([triggerRef, contentRef], () => setIsOpen(false), ['click'])

  return (
    <div
      ref={triggerRef}
      className="TextSample__tooltip"
      onClick={(event) => {
        setIsOpen((prev) => !prev)
      }}
    >
      {children}
      {isOpen && (
        <div
          className="TextSample__tooltip-content"
          ref={contentRef}
          onClick={(event) => event.stopPropagation()}
        >
          {content}
        </div>
      )}
    </div>
  )
}
