import type { Coordinate } from 'ol/coordinate'
import type { ProjectionLike } from 'ol/proj'
import type { Style } from 'ol/style'
import { Stroke, Image } from 'ol/style'

/** The map is the core component of OpenLayers.
 * For a map to render, a view, one or more layers, and a target container are needed:
 * @namespace Map
 * @see {@link http://openlayers.org/en/latest/apidoc/module-ol_Map.html}
 */
declare module 'ol/Map' {

  export interface PulseOptions {
    projection?: ProjectionLike | undefined;
    duration?: number;
    easing?: ((p0: number) => number);
    style?: HTMLImageElement | Style | Style[];
  }

  /** Pulse a point on postcompose
   *  @deprecated use map.animateFeature instead
   *  @param {Array<Coordinate>} point to pulse
   *  @param {pulse.options} pulse options param
   *    - projection {projection||String} projection of coords
   *    - duration {Number} animation duration in ms, default 3000
   *    - amplitude {Number} movement amplitude 0: none - 0.5: start at 0.5*radius of the image - 1: max, default 1
   *    - easing {easing} easing function, default easing.easeOut
   *    - style {style.Image|Style|Array<Style>} Image to draw as markup, default red circle
   */
  function pulse(point: Coordinate[], options?: PulseOptions): void;

}
