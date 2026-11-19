import type { Color } from 'ol/color'

/** Convert an RGB color to HSL, preserving an optional alpha component. */
export function toHSL(rgb: Color | string, round?: number): number[];

/** Convert HSL to RGB, preserving an optional alpha component. */
export function fromHSL(hsl: number[], round?: number): number[];

/** Convert an RGB color to HSV, preserving an optional alpha component. */
export function toHSV(rgb: Color | string, round?: number): number[];

/** Convert HSV to RGB, preserving an optional alpha component. */
export function fromHSV(hsv: number[], round?: number): number[];

/** Convert RGB components to a six-digit hexadecimal color string. */
export function toHexa(rgb: Color): string;
