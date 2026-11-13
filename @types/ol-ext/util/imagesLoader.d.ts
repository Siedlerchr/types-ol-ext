import type { Color } from 'ol/color'
import type { Size } from 'ol/size'
import type { LoadFunction } from 'ol/Tile'

/** Create a tile loader that calls setPixel for each RGBA pixel. */
export function pixelTransform(setPixel: (pixels: Uint8ClampedArray, index: number, size: Size) => void): LoadFunction
/** Create a grayscale tile loader. */
export function grayscale(): LoadFunction
/** Create a tile loader that turns a color or color range transparent. */
export function transparent(colors: [string | Color, (string | Color)?]): LoadFunction
export interface SeaLevelOptions {
  /** Fill color. */
  color?: string | Color;
  /** Smooth color at the border; defaults to true. */
  opacity?: boolean;
  /** Minimum level value; defaults to negative infinity. */
  minValue?: number;
}
/** Create a BIL-32 tile loader displaying sea level. */
export function seaLevelMap(level: number, options?: SeaLevelOptions): LoadFunction
/** Create a BIL-32 elevation tile loader; by default encode heights as terrain-RGB. */
export function elevationMap(getPixelColor?: (height: number) => number[]): LoadFunction
/** Convert an elevation to a terrain-RGB pixel. */
export function getPixelFromElevation(height: number): number[]
/** Convert a terrain-RGB pixel to an elevation; returns -12000 for no data. */
export function getElevationFromPixel(pixel: ArrayLike<number> | null | undefined): number
