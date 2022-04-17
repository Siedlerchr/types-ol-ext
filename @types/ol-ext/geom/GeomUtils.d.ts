import { Coordinate } from "ol/coordinate";
import Feature from "ol/Feature";
import { Geometry } from "ol/geom";
import GeometryType from "ol/geom/GeometryType";
import Polygon from './Scribble';
import MultiPolygon from './Scribble';

/** Create a geometry given a type and coordinates
 * @param {ol.geom.GeometryType} type the geometry type
 * @param {ol.Coordinate[]|number[]} coordinates the geometry coordinates
 * @return {ol.geom.Geometry} the geometry
 */
export function ol_geom_createFromType(type: typeof GeometryType, coordinates: Coordinate[] | number[]): Geometry;

/** Distance beetween 2 points
 *	Useful geometric functions
 * @param {ol.Coordinate} p1 first point
 * @param {ol.Coordinate} p2 second point
 * @return {number} distance
 */
export function ol_coordinate_dist2d(p1: Coordinate, p2: Coordinate): number;
/** 2 points are equal
 * Useful geometric functions
 * @param {Coordinate} p1 first point
 * @param {Coordinate} p2 second point
 * @return {boolean}
 */
export function ol_coordinate_equal(p1: Coordinate, p2: Coordinate): boolean;
/** Get center coordinate of a feature
 * @param {Feature} f
 * @return {Coordinate} the center
 */
export function ol_coordinate_getFeatureCenter(f: Feature): Coordinate;
/** Get center coordinate of a geometry
 * @param {Feature} geom
 * @return {Coordinate} the center
 */
export function ol_coordinate_getGeomCenter(geom: Feature): Coordinate;
/** Offset a polyline
 * @param {Array<Coordinate>} coords
 * @param {number} offset
 * @return {Array<Coordinate>} resulting coord
 * @see http://stackoverflow.com/a/11970006/796832
 * @see https://drive.google.com/viewerng/viewer?a=v&pid=sites&srcid=ZGVmYXVsdGRvbWFpbnxqa2dhZGdldHN0b3JlfGd4OjQ4MzI5M2Y0MjNmNzI2MjY
 */
export function ol_coordinate_offsetCoords(coords: Coordinate[], offset: number): Coordinate[];
/** Find the segment a point belongs to
 * @param {Coordinate} pt
 * @param {Array<Coordinate>} coords
 * @return {} the index (-1 if not found) and the segment
 */
export function ol_coordinate_findSegment(pt: Coordinate, coords: Coordinate[]): { index: number; coords: number[] };
/**
 * Split a Polygon geom with horizontal lines
 * @param {Array<Coordinate>} geom
 * @param {number} y the y to split
 * @param {number} n contour index
 * @return {Array<Array<Coordinate>>}
 */
export function ol_coordinate_splitH(geom: Coordinate[], y: number, n: number): Coordinate[][];

declare module "ol/geom/Circle" {
  export default interface Circle {
    /** Intersect a geometry using a circle
     * @param {ol_geom_Geometry} geom
     * @param {number} resolution circle resolution to sample the polygon on the circle, default 1
     * @returns {ol_geom_Geometry}
     */
    intersection(geom: Geometry, resolution?: number): Geometry;
  }
}

declare module "ol/geom/Polygon" {
  export default interface Polygon {
    /** Sample a Polygon at a distance
     * @param {number} d
     * @returns {ol_geom_Polygon}
    */
    sampleAt(d: number): typeof Polygon;
  }
}
declare module "ol/geom/MultiPolygon" {
  export default interface MultiPolygon {
    /** Sample a Polygon at a distance
     * @param {number} d
     * @returns {ol_geom_Polygon}
     */
    sampleAt(d: number): typeof MultiPolygon;
  }
}
