import type { Color } from 'ol/color'
import type Style from 'ol/style/Style'

/** Get the default style. Pass true for the editing style or colors for a custom style. */
export default function defaultStyle(edit?: boolean | { color?: Color | string; fillColor?: Color | string }): Style[]
