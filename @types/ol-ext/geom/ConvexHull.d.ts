import type { Coordinate } from 'ol/coordinate'

/** Compute a convex hull using Andrew's Monotone Chain Algorithm
 * @param {Array<Coordinate>} points an array of 2D points, sorted in place
 * @return {Array<Coordinate>} the convex hull vertices
 */
declare function convexHull(points: Coordinate[]): Coordinate[];

export default convexHull

declare module 'ol/geom/Geometry' {
  export default interface Geometry {
    /** Compute the convex hull vertices of this geometry. */
    convexHull(): Coordinate[];
  }
}
