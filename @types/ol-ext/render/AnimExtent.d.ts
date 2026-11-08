import type { Coordinate } from 'ol/coordinate'
import type { ProjectionLike } from 'ol/proj'
import type { Stroke } from 'ol/style'

declare module 'ol/Map' {
  export interface Options {
    projection?: ProjectionLike;
    duration?: number;
    easing?: (p0: number) => number;
    style?: Stroke;
  }

  /** Pulse an Extent on postcompose
   *  @param {Array<Coordinate>} point to pulse
   *  @param {pulse.options} options pulse options param
   *    @param {projectionLike|undefined} options.projection projection of coords, default no transform
   *    @param {Number} options.duration animation duration in ms, default 2000
   *    @param {easing} options.easing easing function, default easing.upAndDown
   *    @param {style.Stroke} options.style stroke style, default 2px red
   */
  function animExtent(point: Coordinate, options?: Options): void;
}
