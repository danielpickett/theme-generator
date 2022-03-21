export const SHADE_NAMES = [
  '000',
  '050',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
] as const

export const DEFAULT_LUMINANCES = {
  '000': 99.99, // white had some bugs related to chromajs when set to 100
  '050': 97.0,
  '100': 92.0,
  '200': 85.0,
  '300': 74.0,
  '400': 62.0,
  '500': 48.9,
  '600': 39.0,
  '700': 27.0,
  '800': 15.0,
  '900': 5.0,
} as const

export const DEFAULT_CHROMAS = {
  '000': 0.0,
  '050': 3.88,
  '100': 10.84,
  '200': 21.46,
  '300': 39.99,
  '400': 34.35,
  '500': 29.0,
  '600': 24.53,
  '700': 19.18,
  '800': 13.84,
  '900': 6.37,
} as const

export const SAFE_CONTRAST = 4.5
export const DARKEST_LIGHT_LUMINANCE = 50
export const MAX_POSSIBLE_LUMINANCE = 100
export const MAX_POSSIBLE_CHROMA_FOR_ANY_HUE = 135

export const DEFAULT_CANVAS_SIZE = 2
export const CHROMA_CANVAS_SIZE_DIVISOR = 2

export const CANVAS_HEIGHT = MAX_POSSIBLE_LUMINANCE * DEFAULT_CANVAS_SIZE
export const CANVAS_WIDTH =
  MAX_POSSIBLE_CHROMA_FOR_ANY_HUE * DEFAULT_CANVAS_SIZE

export const DEFAULT_HUE = 240

export const TEXT_KINDS = [
  'regular',
  'subdued',
  'vivid',
  'vivid-subdued',
] as const

export type TextKindsUnionType = typeof TEXT_KINDS[number]

export const IS_EXPECTED_TO_BE_SAFE_CONFIG = {
  '000': {
    regular: true,
    subdued: true,
    vivid: true,
    'vivid-subdued': false,
  },
  '050': {
    regular: true,
    subdued: true,
    vivid: true,
    'vivid-subdued': false,
  },
  '100': {
    regular: true,
    subdued: true,
    vivid: true,
    'vivid-subdued': false,
  },
  '200': {
    regular: true,
    subdued: true,
    vivid: true,
    'vivid-subdued': false,
  },
  '300': {
    regular: true,
    subdued: false,
    vivid: true,
    'vivid-subdued': false,
  },
  '400': {
    regular: true,
    subdued: false,
    vivid: true,
    'vivid-subdued': false,
  },
  '500': {
    regular: true,
    subdued: false,
    vivid: true,
    'vivid-subdued': false,
  },
  '600': {
    regular: true,
    subdued: false,
    vivid: true,
    'vivid-subdued': false,
  },
  '700': {
    regular: true,
    subdued: true,
    vivid: true,
    'vivid-subdued': false,
  },
  '800': {
    regular: true,
    subdued: true,
    vivid: true,
    'vivid-subdued': false,
  },
  '900': {
    regular: true,
    subdued: true,
    vivid: true,
    'vivid-subdued': false,
  },
}
