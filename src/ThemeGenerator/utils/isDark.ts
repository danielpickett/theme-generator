import { darkestLightLuminance } from 'ThemeGenerator/config'

export const isDark = (luminance: number) => luminance < darkestLightLuminance
