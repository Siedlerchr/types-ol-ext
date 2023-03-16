import type { Color } from 'ol/color'

/** Converts an RGB color value to HSL.
 * returns hsl as array h:[0,360], s:[0,100], l:[0,100]
 * @param {ol/color~Color|string} rgb
 * @returns {Array<number>} hsl as h:[0,360], s:[0,100], l:[0,100]
 */
declare function ol_color_toHSL(rgb: Color | string): number[];

/** Converts an HSL color value to RGB.
 * @param {Array<number>} hsl as h:[0,360], s:[0,100], l:[0,100]
 * @returns {Array<number>} rgb
 */
declare function ol_color_fromHSL(hsl: number[]): number[];

export { ol_color_toHSL as toHSL, ol_color_fromHSL as fromHSL }
