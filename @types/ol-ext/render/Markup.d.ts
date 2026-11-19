import type { Coordinate } from 'ol/coordinate'
import type { EventsKey } from 'ol/events'
import type { ProjectionLike } from 'ol/proj'
import type { Style, Image } from 'ol/style'

export interface MarkupOptions {
  projection?: ProjectionLike;
  delay?: number;
  maxZoom?: number;
  style?: Image | Style | Style[];
}

export type MarkupKey = EventsKey & { stop(): void }

declare module 'ol/Map' {
  export default interface Map {
    /** Mark a coordinate. @deprecated Use animateFeature instead. */
    markup(point: Coordinate, options?: MarkupOptions): MarkupKey;
  }
}
