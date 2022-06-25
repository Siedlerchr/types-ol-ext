import ImageLayer from 'ol/layer/Image';
import ImageSource from 'ol/source/Image';
import { Extent } from 'ol/extent';
import { Image } from 'ol/source';

/**
 * @classdesc
 * Image layer to use with a GeoImage source and return the extent calcaulted with this source.
 * @extends {ol.layer.Image}
 * @param {Object=} options Layer Image options.
 * @api
 */
export default class GeoImageLayer extends ImageLayer<ImageSource> {
    constructor(options?: Image);

    /**
     * Return the {@link module:ol/extent~Extent extent} of the source associated with the layer.
     * @return {Extent} The layer extent.
     * @observable
     * @api
     */
    getExtent(): Extent
}
