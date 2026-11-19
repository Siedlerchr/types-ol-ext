import { ImageCanvas } from 'ol/source'
import type VectorSource from 'ol/source/Vector'
import type Feature from 'ol/Feature'
import type { Coordinate } from 'ol/coordinate'
import type { Options as ImageCanvasOptions } from 'ol/source/ImageCanvas'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { OnSignature } from 'ol/Observable'

export interface Options extends ImageCanvasOptions {
  source: VectorSource;
  useWorker?: boolean | Record<string, (...args: any[]) => any>;
  scale?: number;
  maxD?: number;
  getColor?: (value: number) => number[];
  weight?: string | ((f: Feature) => number);
}

/** Inverse distance weighting interpolated source - Shepard's method
 * @see https://en.wikipedia.org/wiki/Inverse_distance_weighting
 * @constructor
 * @extends {ol_source_ImageCanvas}
 * @fire drawstart
 * @fire drawend

 */
export default class IDW extends ImageCanvas {
  /**
   * @param {*} [options]
   *  @param {ol.source.vector} options.source a source to interpolate
   *  @param {boolean} [options.useWorker=false] use worker to calculate the distance map (may cause flickering on small data sets). Source will fire drawstart, drawend while calculating
   *  @param {number} [options.scale=4] scale factor, use large factor to enhance performances (but minor accuracy)
   *  @param {string|function} options.weight The feature attribute to use for the weight or a function that returns a weight from a feature. Weight values should range from 0 to 100. Default use the weight attribute of the feature.
   */
  constructor(options: Options);

  on: ImageCanvas['on'] & OnSignature<'drawstart' | 'drawend', BaseEvent, EventsKey>;
  once: ImageCanvas['once'] & OnSignature<'drawstart' | 'drawend', BaseEvent, EventsKey>;
  un: ImageCanvas['un'] & OnSignature<'drawstart' | 'drawend', BaseEvent, void>;

  /** Get the source
   */
  getSource(): VectorSource;

  /** Get image value at coord (RGBA)
   * @param {l.coordinate} coord
   * @return {Uint8ClampedArray}
   */
  getValue(coord: Coordinate): Uint8ClampedArray | null;

  /** Set IDW scale
   * @param {number} scale
   */
  setScale(scale: number): void

  /** Set IDW max distance
   * @param {number} [dist] max distance in proj units
   */
  setMaxD(dist?: number): void

  /** Get color for a value. Return an array of RGBA values.
   * @param {number} v value
   * @returns {Array<number>}
   * @api
   */
  getColor(v: number): number[];
}
