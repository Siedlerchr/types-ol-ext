import Feature from 'ol/Feature';
import { Fill } from 'ol/style';
import Base from './Base';

export interface Options {
   active?: boolean;
   scale?: number;
}




/** Paper filter
 * @constructor
 * @extends {ol_filter_Base}
 * @param {object} options
 *  @param {boolean} [options.active]
 *  @param {number} [options.scale=1]
 */
export default class Paper extends Base {

    constructor(options?: Options);

    /** Draw the feature into canvas
     */
    drawFeaturePath_(): void;
    /** Activate / deactivate filter
    *	@param {boolean} b
     */
    setActive(b: boolean): void;
    /** Get filter active
    *	@return {boolean}
     */
    getActive(): boolean;

    fillColor_: string;

}

