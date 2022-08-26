import { ImageCanvas } from "ol/source";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import { Coordinate } from "ol/coordinate";

export interface Options {
  source?: VectorSource;
  useWorker?: boolean;
  scale?: number;
  weight?: string | ((f: Feature) => number);
}

//** Inverse distance weighting interpolated source - Shepard's method
/* @see https://en.wikipedia.org/wiki/Inverse_distance_weighting
* @constructor 
* @extends {ol_source_ImageCanvas}
* @fire drawstart
* @fire drawend
* @param {*} [options]
*  @param {ol.source.vector} options.source a source to interpolate
*  @param {boolean} [options.useWorker=false] use worker to calculate the distance map (may cause flickering on small data sets). Source will fire drawstart, drawend while calculating
*  @param {number} [options.scale=4] scale factor, use large factor to enhance performances (but minor accuracy)
*  @param {string|function} options.weight The feature attribute to use for the weight or a function that returns a weight from a feature. Weight values should range from 0 to 100. Default use the weight attribute of the feature.
*/
export default class IDW extends ImageCanvas {
  constructor(options?: Options);
  /** Get the source
   */
  getSource(): VectorSource;
  /** Apply the value to the map RGB. Overwrite this function to set your own colors.
   * @param {number} v value
   * @param {Uint8ClampedArray} data RGBA array
   * @param {number} i index in the RGBA array
   * @api
   */
  setData(v: number, data: Uint8ClampedArray, i: number): void;
  /** Get image value at coord (RGBA)
   * @param {l.coordinate} coord
   * @return {Uint8ClampedArray}
   */
  getValue(coord: Coordinate): Uint8ClampedArray;
  /** Get color for a value. Return an array of RGBA values.
   * @param {number} v value
   * @returns {Array<number>}
   * @api
   */
  getColor(v: number): number[];
}
