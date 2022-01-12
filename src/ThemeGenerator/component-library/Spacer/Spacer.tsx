import { CSSProperties } from 'react'

export const Spacer = ({
  height = '1rem',
  width = '1rem',
}: {
  height?: CSSProperties['height']
  width?: CSSProperties['width']
}) => <div className="Spacer" aria-hidden style={{ height, width }} />
