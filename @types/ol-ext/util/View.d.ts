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

/** A tour destination as x, y, optional zoom and animation type. */
export type Destination = [number, number, number?, ('flyTo' | 'flightTo' | 'moveTo')?]
/** A destination object or coordinate tuple. */
export type TourDestination = viewTourDestinations | Destination

/** Options for a view tour. */
export interface Options {
  /** Delay between destinations in milliseconds. */
  delay?: number;
  /** Default animation type for destinations without one. */
  type?: 'flyTo' | 'flightTo' | 'moveTo';
  /** Default easing function. */
  easing?: (t: number) => number;
  /** Called when the tour finishes or is interrupted. */
  done?: (completed: boolean) => void;
  /** Called with the next index and the destination list. */
  step?: (index: number, destinations: TourDestination[]) => void;
}

declare module 'ol/View' {
  export default interface View {
    /** Animate the view to a destination. */
    flyTo(options?: viewTourDestinations, done?: (completed: boolean) => void): void;
    /** Animate through a sequence of destinations. */
    takeTour(destinations: TourDestination[], options?: Options): void;
  }
}

export default ol_View
