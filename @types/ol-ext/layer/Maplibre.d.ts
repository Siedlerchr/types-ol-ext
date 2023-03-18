import type { Options } from 'ol/layer/Layer'
import Layer from 'ol/layer/Layer'
import type { SourceType } from 'ol/layer/WebGLTile'

/** Layer that use Maplibre GL as render
 * @constructor
 * @extends {ol_layer_Layer}
 * */
export default class Maplibre extends Layer<SourceType> {
  constructor(options?: Options<SourceType>);

  /** Get the Maplibre map
   * @return {Object}
   */
  getMapGL(): any;

  /** Set style
   * @param {Object|string} style Mapbox style Object or a URL to JSON
   */
  setStyle(style: any | string): void;

  /** Returns the map's Mapbox style object.
   * @returns {Object}
   */
  getStyle(): any;
}
