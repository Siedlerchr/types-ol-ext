import { Geometry, Point } from 'ol/geom';
/** Compute a convex hull using Andrew's Monotone Chain Algorithm
   * @param {Array<Point>} points an array of 2D points
   * @return {Array<Point>} the confvex hull vertices
   */
declare function convexHull(points: Geometry[]): Point[];

export default convexHull;
