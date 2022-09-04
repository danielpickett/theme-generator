import { DARKEST_LIGHT_LUMINANCE } from 'src/app-constants'

export const isDark = (luminance: number) => luminance < DARKEST_LIGHT_LUMINANCE
