import Base from './Base';

export interface Options {
    margin?: number;
    padding?: number;
    fSize?: number | number[];
    fill?: boolean
    shadow?: boolean
}
/** Fold filer map
 * @constructor
 * @requires ol_filter
 * @extends {ol_filter_Base}
 * @param {Object} [options]
 *  @param {Array<number>} [options.fold] number of fold (horizontal and vertical)
 *  @param {number} [options.margin] margin in px, default 8
 *  @param {number} [options.padding] padding in px, default 8
 *  @param {number|number[]} [options.fsize] fold size in px, default 8,10
 *  @param {boolean} [options.fill] true to fill the background, default false
 *  @param {boolean} [options.shadow] true to display shadow, default true
 */
declare class Fold extends Base {
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

export default Fold;
