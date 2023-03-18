import type Feature from 'ol/Feature'
import ol_Object from 'ol/Object'

export interface Options {
    [key: string]: any;
}

export default class Simplificator extends ol_Object {
  constructor(options?: Options);

  getEdges(): any[]

  /** Set the features to process
     * @param {Array<Feature>} features
     * @param {number} [round] round features
     */
  setFeatures(features: Feature[], round: number): void;

  /** Get the simplified features
    * @returns {Array<Feature>}
    */
  getFeatures(): Feature[];

  /** Simplify edges using  Douglas Peucker algorithm
   * @param {number} tolerance
   */
  simplify(tolerance: number): void
}
