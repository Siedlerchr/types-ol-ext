import ol_View from 'ol/View'
import type { Coordinate } from 'ol/coordinate'

/**
 * Destination
 */
export interface viewTourDestinations {
  /**
   * animation type (flyTo, moveTo), default flyTo
   */
  type?: 'flyTo' | 'moveTo';
  /**
   * animation duration
   */
  duration?: number;
  /**
   * destination coordinate, default current center
   */
  center?: Coordinate;
  /**
   * destination zoom, default current zoom
   */
  zoom?: number;
  /**
   * zoom to fly to, default min (current zoom, zoom) -2
   */
  zoomAt?: number;
  /**
   * easing function used during the animation, defaults ol/easing~inAndOut
   */
  easing?: ((t: number) => number);
  /**
   * The rotation of the view at the end of the animation
   */
  rotation?: number;
  /**
   * Optional anchor to remain fixed during a rotation or resolution animation.
   */
  anchor?: Coordinate;
}

export type Destination = {
  x: number,
  y: number,
  zoo: number,
  destinationType: 'flyTo' | 'moveTo'
}

export interface Options {
  easing?: (t: number) => number;
  done?: (callback: boolean) => void;
  step?: (callback: number) => void;
}

declare module 'ol/View' {

  /** FlyTo animation
   * @param {viewTourDestinations} options
   * @param {function} done callback function called at the end of an animation, called with true if the animation completed
   */
  export function flyTo(options?: viewTourDestinations, done?: (callback: boolean) => void): void;

  /** Start a tour on the map
   * @param {Array<viewTourDestinations>|Array<Array>} destinations an array of destinations or an array of [x,y,zoom,destinationType]
   * @param {Object} options
   *  @param {number} [options.delay=750] delay between 2 destination
   *  @param {string} [options.type] animation type (flyTo, moveTo) to use if not defined in destinations
   *  @param {function} [options.easing] easing function used during the animation if not defined in destinations
   *  @param {function} [options.done] callback function called at the end of an animation, called with true if the tour completed
   *  @param {function} [options.step] callback function called when a destination is reached with the step index as param
   */
  export function takeTour(destinations: viewTourDestinations[] | Destination[], options?: Options): void
}
