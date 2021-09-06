import GeoJSONX,  {Options } from './GeoJSONX';

/** Feature format for reading and writing data in the GeoJSONP format,
 * using Polyline Algorithm to encode geometry.
 * @constructor
 * @extends {GeoJSONX}
 * */
export default class GeoJSONP extends GeoJSONX {
    constructor(options?: Options);
}
