import ol_View from 'ol/View'
import type { Coordinate } from 'ol/coordinate'

/**
 * Destination
 */
export interface viewTourDestinations {
  /**
   * animation type (flyTo, moveTo), default flyTo
   */
  type?: 'flyTo' | 'flightTo' | 'moveTo';
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

export type Destination = [number, number, number?, ('flyTo' | 'flightTo' | 'moveTo')?]
export type TourDestination = viewTourDestinations | Destination

export interface Options {
  delay?: number;
  type?: 'flyTo' | 'flightTo' | 'moveTo';
  easing?: (t: number) => number;
  done?: (completed: boolean) => void;
  step?: (index: number, destinations: TourDestination[]) => void;
}

declare module 'ol/View' {
  export default interface View {
    flyTo(options?: viewTourDestinations, done?: (completed: boolean) => void): void;
    takeTour(destinations: TourDestination[], options?: Options): void;
  }
}

export default ol_View
