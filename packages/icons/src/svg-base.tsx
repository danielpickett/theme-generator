import { ReactNode } from 'react'
import { SVGPropsType } from 'src/types'

export const SVGBase = ({
  children,
  title,
  size,
}: SVGPropsType & { children: ReactNode }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      display="block"
      style={{ height: size, width: size }}
    >
      {!!title && <title>{title}</title>}
      {children}
    </svg>
  )
}
