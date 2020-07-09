import MultiLineString from 'ol/geom/MultiLineString';

export interface Options {
  /** interval beetween lines */
  interval: number;
  /** hatch angle in radian, default PI/2 */
  angule: number;
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
    scribbleFill(options: Options): MultiLineString|null;
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
    scribbleFill(options: Options): MultiLineString|null;
  }
}
