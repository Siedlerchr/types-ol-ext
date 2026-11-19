import ImageLayer from 'ol/layer/Image'
import type GeoImageSource from '../source/GeoImage'
import type { Extent } from 'ol/extent'
import type { Options } from 'ol/layer/BaseImage'
/**
 * @classdesc
 * Image layer to use with a GeoImage source and return the extent calcaulted with this source.
 * @extends {ol.layer.Image}
 * @api
 */
export default class GeolImageLayer extends ImageLayer<GeoImageSource> {
  /**
   * @param options - Image-layer options. A GeoImage source is needed by `getExtent`.
   */
  constructor(options?: Options<GeoImageSource>);

  /**
   * Return the {@link module:ol/extent~Extent extent} of the source associated with the layer.
   * @return {Extent} The layer extent.
   * @observable
   * @api
   */
  getExtent(): Extent
}
