import { Coordinate } from 'ol/coordinate';
import { Extent } from 'ol/extent';
import Base from './Base';

export interface Options {
    coords?: Coordinate[];
    Extent?: Extent;
    units?: string;
    keepAspectRatio?: boolean;
    color?: string;
}
/** Clip layer or map
*  @constructor
* @requires filter
* @extends {filter.Base}
* @param {Object} [options]
*  @param {Array<Coordinate>} [options.coords]
*  @param {Extent} [options.Extent]
*  @param {string} [options.units] coords units percent (%) or pixel (px)
*  @param {boolean} [options.keepAspectRatio] keep aspect ratio
*  @param {string} [options.color] backgroundcolor
 */
export default class Clip extends Base {
    constructor(options?: Options);
    /** Activate / deactivate filter
    *	@param {boolean} b
     */
    setActive(b: boolean): void;
    /** Get filter active
    *	@return {boolean}
     */
    getActive(): boolean;
}
