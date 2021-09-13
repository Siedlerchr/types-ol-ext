import Feature from 'ol/Feature';
import { Fill } from 'ol/style';
import Base from './Base';

export interface Options {
    feature?: Feature;
    fill?: Fill;
    inner?: boolean;
}
/** Mask drawing using an Feature
 * @constructor
 * @requires filter
 * @extends {filter.Base}
 * @param {Object} [options]
 *  @param {Feature} [options.feature] feature to mask with
 *  @param {Fill} [options.fill] style to fill with
 *  @param {boolean} [options.inner] mask inner, default false
 */
export default class Mask extends Base {

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

