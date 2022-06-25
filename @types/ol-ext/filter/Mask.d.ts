import Feature from 'ol/Feature';
import { Fill } from 'ol/style';
import Base from './Base';

export interface Options {
    feature?: Feature;
    fill?: Fill;
    inner?: boolean;
    wrapX?: boolean;
}

/** Mask drawing using an ol.Feature
 * @constructor
 * @requires ol_filter
 * @extends {Base}
 * @param {Object} [options]
 *  @param {ol.Feature} [options.feature] feature to mask with
 *  @param {ol.style.Fill} [options.fill] style to fill with
 *  @param {boolean} [options.inner=false] mask inner, default false
 *  @param {boolean} [options.wrapX=false] wrap around the world, default false
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

