import { ColorScaleType } from 'ThemeGenerator/types'
// import _defaultTheme from './default-theme-one-scale.json'
import _defaultTheme from './default-theme-two-scales.json'
// import _defaultTheme from './default-theme.json'

export const DEFAULT_THEME = _defaultTheme as ColorScaleType[]
export const DEFAULT_THEME_SCALE_NAMES = DEFAULT_THEME.map((scale) => scale.id)
