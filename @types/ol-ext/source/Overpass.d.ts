import type Feature from 'ol/Feature'
import { Vector as VectorSource } from 'ol/source'
import type { Options as VectorOptions } from 'ol/source/Vector'

export interface Options extends Omit<VectorOptions<Feature>, 'url' | 'loader'> {
  url?: string;
  filter: string[];
  node?: boolean;
  way?: boolean;
  rel?: boolean;
  maxResolution?: number;
}

/**
 * OSM layer using the Ovepass API
 * @constructor source.Overpass
 * @extends {VectorSource}

 */
export default class Overpass extends VectorSource {
  /**
   * @param {any} options
   *  @param {string} options.url service url, default: https://overpass-api.de/api/interpreter
   *  @param {Array<string>} options.filter an array of tag filters, ie. ["key", "key=value", "key~value", ...]
   *  @param {boolean} options.node get nodes, default: true
   *  @param {boolean} options.way get ways, default: true
   *  @param {boolean} options.rel get relations, default: false
   *  @param {number} options.maxResolution maximum resolution to load Features
   *  @param {string|Attribution|Array<string>} options.attributions source attribution, default OSM attribution
   *  @param {LoadingStrategy} options.strategy loading strategy, default loadingstrategy.bbox
   */
  constructor(options: Options);
}
