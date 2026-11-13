import type Feature from 'ol/Feature'
import { Vector as VectorSource } from 'ol/source'
import type { Options as VectorSourceOptions } from 'ol/source/Vector'

export interface Options extends Omit<VectorSourceOptions<Feature>, 'loader'> {
  maxResolution?: number;
  limit?: number;
}

/**
 * @constructor source.Mapillary
 * @extends {VectorSource}
 */
export default class Mapillary extends VectorSource {
  /**
   * @param {olx.source.Mapillary=} options
   */
  constructor(options?: Options);

  /** Decode wiki attributes and choose to add feature to the layer
   * @param {feature} the feature
   * @param {attributes} wiki attributes
   * @return {boolean} true: add the feature to the layer
   * @API stable
   */
  readFeature(feature: Feature, attributes: unknown): boolean;
}
