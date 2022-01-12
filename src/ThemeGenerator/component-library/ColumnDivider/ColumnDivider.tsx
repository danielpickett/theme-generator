import { CSSProperties } from 'react'
import './ColumnDivider.scss'

export const ColumnDivider = ({
  height = '1rem',
  totalWidth = '3rem',
  lineWidth = '.125rem',
  color = 'var(--theme-gen-color-grey-300)',
}: {
  height?: CSSProperties['height']
  totalWidth?: CSSProperties['width']
  lineWidth?: CSSProperties['width']
  color?: string
}) => (
  <div
    className="ColumnDivider"
    aria-hidden
    style={{ height, width: totalWidth }}
  >
    <div
      className="ColumnDivider__line"
      style={{
        width: lineWidth,
        height,
        backgroundColor: color,
      }}
    ></div>
  </div>
)
