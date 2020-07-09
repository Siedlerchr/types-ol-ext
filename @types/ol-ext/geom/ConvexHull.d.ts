import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature';
import { Geometry, Point } from 'ol/geom';
import Projection from 'ol/proj/Projection';
/** Compute a convex hull using Andrew's Monotone Chain Algorithm
   * @param {Array<Point>} points an array of 2D points
   * @return {Array<Point>} the confvex hull vertices
   */
declare function convexHull(points: Geometry[]): Point[];

export default convexHull;
