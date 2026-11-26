import type { Options as LayerOptions } from 'ol/layer/Layer'
import Layer from 'ol/layer/Layer'
import type { SourceType } from 'ol/layer/WebGLTile'

/** Options for the MapLibre-backed layer. */
export interface Options extends LayerOptions<SourceType> {
  /** MapLibre style object or style URL. */
  style?: string | Record<string, any>;
}

/** Layer that use Maplibre GL as render
 * @constructor
 * @extends {ol_layer_Layer}
 * */
export default class Maplibre extends Layer<SourceType> {
  constructor(options?: Options);

  /** Get the Maplibre map
   * @return {Object}
   */
  getMapGL(): any;

  /** Set style
   * @param {Object|string} style Mapbox style Object or a URL to JSON
   */
  setStyle(style: string | Record<string, any>): void;

  /** Returns the map's Mapbox style object.
   * @returns {Object}
   */
  getStyle(): any;
}
