import { DARKEST_LIGHT_LUMINANCE } from 'src/constants'

export const isDark = (luminance: number) => luminance < DARKEST_LIGHT_LUMINANCE
