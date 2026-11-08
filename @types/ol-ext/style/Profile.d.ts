import type { Stroke, Fill } from 'ol/style'
import { Style } from 'ol/style'
import type { Geometry } from 'ol/geom'

export interface Options {
  stroke?: Stroke;
  fill?: Fill;
  scale?: number;
  geometry?: Geometry;
}

/** Profile style
 * Draw a profile on the map
 * @extends {ol_style_Style}
 * @constructor

 */
export default class Profile extends Style {
  /**
   * @param {Object} options
   *  @param {ol.style.Stroke} options.stroke
   *  @param {ol.style.Fill} options.fill
   *  @param {number} options.scale z scale
   *  @param {number} options.zIndex
   *  @param {ol.geom.Geometry} options.geometry
   */
  constructor(options?: Options);

  /** Set style stroke
   * @param {ol.style.Stroke}
   */
  setStroke(stroke: Stroke): void;

  /** Get style stroke
   * @return {ol.style.Stroke}
   */
  getStroke(): Stroke;

  /** Set style stroke
   * @param {ol.style.Fill}
   */
  setFill(fill: Fill): void;

  /** Get style stroke
   * @return {ol.style.Fill}
   */
  getFill(): Fill;

  /** Set the vertex size. Use 0 to disable vertex rendering. */
  setVertexSize(size: number): void;
  /** Get the vertex size. */
  getVertexSize(): number;

  /** Set z scale. */
  setScale(sc: number): void;

  /** Get z scale
   * @return {number}
   */
  getScale(): number;
}
