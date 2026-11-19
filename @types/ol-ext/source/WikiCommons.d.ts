import type Feature from 'ol/Feature'
import { Vector as VectorSource } from 'ol/source'
import type { Options as VectorSourceOptions } from 'ol/source/Vector'

export interface Options extends Omit<VectorSourceOptions<Feature>, 'loader'> {
  maxResolution?: number;
  lang?: string;
  limit?: number;
}

export interface ImageAttributes {
  descriptionurl?: string;
  url: string;
  title: string;
  user?: string;
  extmetadata?: { LicenseShortName?: { value: string } };
}

/**
 * @constructor source.WikiCommons
 * @extends {VectorSource}
 */
export default class WikiCommons extends VectorSource {
  /**
   * @param {olx.source.WikiCommons=} options
   */
  constructor(options?: Options);

  /** Decode wiki attributes and choose to add feature to the layer
   * @param {feature} the feature
   * @param {attributes} wiki attributes
   * @return {boolean} true: add the feature to the layer
   * @API stable
   */
  readFeature(feature: Feature, attributes: ImageAttributes): boolean;
}
