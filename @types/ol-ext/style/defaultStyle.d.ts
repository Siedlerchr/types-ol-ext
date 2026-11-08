import type { Color } from 'ol/color'
import type Style from 'ol/style/Style'

export default function defaultStyle(edit?: boolean | { color?: Color | string; fillColor?: Color | string }): Style[]
