import ImageLayer from 'ol/layer/Image'
import type ImageSource from 'ol/source/Image'
import type { Extent } from 'ol/extent'
import type { Options } from 'ol/layer/BaseImage'
/**
 * @classdesc
 * Image layer to use with a GeoImage source and return the extent calcaulted with this source.
 * @extends {ol.layer.Image}
 * @api
 */
export default class GeolImageLayer extends ImageLayer<ImageSource> {
  /**
   * @param {Object=} options Layer Image options.
   */
  constructor(options?: Options<ImageSource>);

  /**
   * Return the {@link module:ol/extent~Extent extent} of the source associated with the layer.
   * @return {Extent} The layer extent.
   * @observable
   * @api
   */
  getExtent(): Extent
}
