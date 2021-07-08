import Feature from 'ol/Feature';
import { Vector as VectorSource } from 'ol/source';
import { AttributionLike } from 'ol/source/Source';
import { Options as VectorSourceOptions } from 'ol/source/Vector';

/**
* @constructor source.Mapillary
* @extends {VectorSource}
* @param {olx.source.Mapillary=} options
 */
export default class Mapillary extends VectorSource {
    constructor(options?: VectorSourceOptions);

    /** Decode wiki attributes and choose to add feature to the layer
    * @param {feature} the feature
    * @param {attributes} wiki attributes
    * @return {boolean} true: add the feature to the layer
    * @API stable
     */
    readFeature(featue: Feature, attributes: AttributionLike): boolean;
    /** Overwrite Vector clear to fire clearstart / clearend event
     */
    clear(): void;
}
