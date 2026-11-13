import type Feature from 'ol/Feature'
import ol_Object from 'ol/Object'
import type LineString from 'ol/geom/LineString'
import type { Type } from 'ol/geom/Geometry'

export interface Options {
    [key: string]: any;
}

/** Reconstructed feature and the simplified edges used by each contour. */
export interface SimplifiedFeature {
  feature: Feature;
  contour: Record<string, Array<{ edge: Feature<LineString>; index: number }>>;
  typeGeom: Type;
  nom: unknown;
  geom: unknown[];
}

export default class Simplificator extends ol_Object {
  constructor(options?: Options);

  /** Get the current edge features. */
  getEdges(): Feature<LineString>[]

  /** Set the features to process
     * @param {Array<Feature>} features
     * @param {number} [round] round features
     */
  setFeatures(features: Feature[], round?: number): Feature<LineString>[];

  /** Reconstruct feature geometries and return their contour records.
    */
  getFeatures(): SimplifiedFeature[];

  /** Simplify edges using  Douglas Peucker algorithm
   * @param {number} tolerance
   */
  simplify(tolerance: number): void

  /** Simplify edges using the Visvalingam algorithm. */
  simplifyVisvalingam(options: { area?: number; dist?: number; ratio?: number; minPoints?: number; keepEnds?: boolean }): void
}
