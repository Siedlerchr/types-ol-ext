import type { Extent } from 'ol/extent'
import type { ProjectionLike } from 'ol/proj'
import type { Stroke } from 'ol/style'

export interface AnimExtentOptions {
  projection?: ProjectionLike;
  duration?: number;
  easing?: (progress: number) => number;
  style?: Stroke;
}

declare module 'ol/Map' {
  export default interface Map {
    /** Animate the outline of an extent. */
    animExtent(extent: Extent, options?: AnimExtentOptions): void;
  }
}
