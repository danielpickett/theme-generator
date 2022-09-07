import { SVGBase } from './svg-base'
import { SVGPropsType } from 'src/types'

export const Expand = ({ title }: SVGPropsType) => {
  return (
    <SVGBase title={title}>
      <path d="M5 5H12V7H7V12H5V5Z" fill="currentColor" />
      <path d="M5 25L5 18L7 18L7 23L12 23L12 25L5 25Z" fill="currentColor" />
      <path
        d="M25 25L18 25L18 23L23 23L23 18L25 18L25 25Z"
        fill="currentColor"
      />
      <path d="M25 5L25 12L23 12L23 7L18 7L18 5L25 5Z" fill="currentColor" />
    </SVGBase>
  )
}

export const Collapse = ({ title }: SVGPropsType) => {
  return (
    <SVGBase title={title}>
      <path d="M12 12L5 12L5 10L10 10L10 5L12 5L12 12Z" fill="currentColor" />
      <path d="M12 18L12 25L10 25L10 20L5 20L5 18L12 18Z" fill="currentColor" />
      <path
        d="M18 18L25 18L25 20L20 20L20 25L18 25L18 18Z"
        fill="currentColor"
      />
      <path d="M18 12L18 5L20 5L20 10L25 10L25 12L18 12Z" fill="currentColor" />
    </SVGBase>
  )
}

export const LCHGraph = ({ title }: SVGPropsType) => {
  return (
    <SVGBase title={title}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.84066 5.55164C5.50108 5.32728 5.21291 5.13689 4.99997 5L4.99996 7.49243L4.99994 9.01179L4.99999 22.5781L5.00003 22.9844V25.0039C7.57877 24.5127 8.91666 24.3384 10.1848 24.2224L10.2679 24.2148C11.4911 24.1031 12.4676 24.0139 13.5751 23.6332C14.6989 23.2469 15.9098 22.5796 17.7084 21.3884C19.5107 20.1948 21.9667 18.4312 25.5865 15.8099L27.3026 14.5672L25.2524 14.0324C19.5809 12.5529 14.5213 10.4551 10.8222 8.60556C9.34492 7.86692 7.1881 6.4419 5.84066 5.55164ZM10.0027 22.2307C11.3028 22.1118 12.0573 22.04 12.9249 21.7418C13.801 21.4406 14.8402 20.8891 16.6041 19.7209C18.0765 18.7458 20.01 17.3712 22.7279 15.409C17.7228 13.9466 13.2837 12.0724 9.92778 10.3944C8.91202 9.88654 7.89702 9.3 6.99967 8.75308L6.99999 22.6219C8.31109 22.401 9.09338 22.3139 10.0027 22.2307Z"
        fill="currentColor"
      />
    </SVGBase>
  )
}

export const Text = ({ title }: SVGPropsType) => {
  return (
    <SVGBase title={title}>
      <path
        d="M11.4115 25.0185V23.2862L13.6526 22.9012V7.0486H9.1154L8.71668 9.8259H6.68182V5H23.3181V9.8259H21.3108L20.8983 7.0486H16.3611V22.9012L18.6022 23.2862V25.0185H11.4115Z"
        fill="currentColor"
      />
    </SVGBase>
  )
}
