import { Coordinate } from 'ol/coordinate';

declare module 'ol/geom/LineString' {
  export default interface LineString {
    /** Split a lineString by a point or a list of points
     *	NB: points must be on the line, use getClosestPoint() to get one
     * @param {ol.Coordinate | Array<ol.Coordinate>} pt points to split the line
     * @param {Number} tol distance tolerance for 2 points to be equal
     */
    splitAt(pt: Coordinate|Coordinate[], tol: number): LineString[];
  }
}
