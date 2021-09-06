import VectorSource, {Options as VectorSourceOptions} from 'ol/source/Vector';

export interface Options extends VectorSourceOptions{
    url?: string;
}

/** ol_source_GeoRSS is a source that load Wikimedia Commons content in a vector layer.
 * @constructor
 * @extends {ol_source_Vector}
 * @param {*} options source options
 *  @param {string} options.url GeoRSS feed url
 */
export default class GeoRSS extends VectorSource{
    constructor(options?: Options);

}
