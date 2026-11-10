import type Map from 'ol/Map'
import type { Coordinate } from 'ol/coordinate'
import type { ProjectionLike } from 'ol/proj'
import type ImageStyle from 'ol/style/Image'
import type Style from 'ol/style/Style'

export interface PulseOptions {
  projection?: ProjectionLike;
  duration?: number;
  amplitude?: number;
  radius?: number;
  easing?: (fraction: number) => number;
  style?: ImageStyle | Style | Style[];
}

/** Map method installed by importing this module. @deprecated Use animateFeature instead. */
export type PulseMap = Map & { pulse(coordinate: Coordinate, options?: PulseOptions): void }
