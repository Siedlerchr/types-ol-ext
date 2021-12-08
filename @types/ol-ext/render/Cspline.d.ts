import { Coordinate } from 'ol/coordinate';
import { Geometry } from 'ol/geom';
import BaseObject from 'ol/Object';

export interface Options {
  tension?: number;
  rsolution?: number;
  pointsPerSeg?: number;
}

declare module 'ol/Coordinate' {
  /** Calculate cspline on coordinates
   * @param {Array<Coordinate>} line
   * @param {} options
   *	@param {Number} options.tension a [0,1] number / can be interpreted as the "length" of the tangent, default 0.5
   *  @param {Number} options.resolution size of segment to split
   *	@param {Integer} options.pointsPerSeg number of points per segment to add if no resolution is provided, default add 10 points per segment
   * @return {Array<Coordinate>}
   */
  export function cspline(line: Coordinate[], options?: Options): Coordinate[];
}
declare module 'ol/geom' {
  export interface Geometry {
    /** Cache cspline calculation on a geometry
     * @param {} options
     *	@param {Number} options.tension a [0,1] number / can be interpreted as the "length" of the tangent, default 0.5
     *  @param {Number} options.resolution size of segment to split
     *	@param {Integer} options.pointsPerSeg number of points per segment to add if no resolution is provided, default add 10 points per segment
     * @return {Geometry}
     */
    cspline(options?: Options): Geometry;
  }
}

