import type MultiLineString from 'ol/geom/MultiLineString'
import type { Geometry } from 'ol/geom'

export interface Options {
  /** interval beetween lines */
  interval: number;
  /** hatch angle in radian, default PI/2 */
  angle: number;
}

declare module 'ol/geom/MultiPolygon' {
  export default interface MultiPolygon {
    /**
     * Calculate a MultiPolyline to fill a Polygon with a scribble effect that appears hand-made
     * @param {} options
     * @param {Number} options.interval interval beetween lines
     * @param {Number} options.angle hatch angle in radian, default PI/2
     * @return {ol_geom_MultiLineString|null} the resulting MultiLineString geometry or null if none
     */
    scribbleFill(options: Options): MultiLineString | null;
  }
}

declare module 'ol/geom/Polygon' {
  export default interface Polygon {
    /**
     * Calculate a MultiPolyline to fill a Polygon with a scribble effect that appears hand-made
     * @param {} options
     * @param {Number} options.interval interval beetween lines
     * @param {Number} options.angle hatch angle in radian, default PI/2
     * @return {ol_geom_MultiLineString|null} the resulting MultiLineString geometry or null if none
     */
    scribbleFill(options: Options): MultiLineString | null;
  }
}
/** Calculate a MultiPolyline to fill a geomatry (Polygon or MultiPolygon) with a scribble effect that appears hand-made
 * @param {Geometry} geom the geometry to scribble
 * @param {Object} options
 *  @param {Number} options.interval interval beetween lines
 *  @param {Number} options.angle hatch angle in radian, default PI/2
 * @return {Geometry} the resulting MultiLineString geometry or initial geometry
 */
export default function ol_geom_scribbleFill(geom: Geometry, options?: {
  interval?: number;
  angle?: number;
}): Geometry
