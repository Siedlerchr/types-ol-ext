import type Attribution from 'ol/control/Attribution'
import { Vector as VectorSource } from 'ol/source'
import type { LoadingStrategy } from 'ol/source/Vector'

export interface Options {
  url?: string;
  filter?: string[];
  node?: boolean;
  way?: boolean;
  rel?: boolean;
  maxResolution?: number;
  attributions?: string | Attribution | string[];
  strategy?: LoadingStrategy;
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
  constructor(options?: Options);

  /** Overwrite Vector clear to fire clearstart / clearend event
   */
  clear(): void;
}
