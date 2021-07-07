import VectorSource, { Options as VectorSourceOptions } from 'ol/source/Vector';

export type WFSVersion = '1.0.0' | '1.1.0' | '2.0.0'
export interface Options {
    version?: WFSVersion;
    typeName?: string;
    tileZoom?: number;
    featureLimit?: number;
    pagination?: boolean;
}
/** A vector source to load WFS at a tile zoom level
 * @constructor
 * @fires tileloadstart
 * @fires tileloadend
 * @fires tileloaderror
 * @fires overload
 * @extends {ol.source.Vector}
 * @param {Object} options
 *  @param {string} [options.version=1.1.0] WFS version to use. Can be either 1.0.0, 1.1.0 or 2.0.0.
 *  @param {string} options.typeName WFS type name parameter
 *  @param {number} options.tileZoom zoom to load the tiles
 *  @param {number} options.maxFeatures maximum features returned in the WFS
 *  @param {number} options.featureLimit maximum features in the source before refresh, default Infinity
 *  @param {boolean} [options.pagination] experimental enable pagination, default no pagination
 */
export class ol_source_TileWFS extends VectorSource {
    constructor(options?: Options);

}
