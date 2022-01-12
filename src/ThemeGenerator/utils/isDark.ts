import { DARKEST_LIGHT_LUMINANCE } from 'ThemeGenerator/constants'

export const isDark = (luminance: number) => luminance < DARKEST_LIGHT_LUMINANCE
