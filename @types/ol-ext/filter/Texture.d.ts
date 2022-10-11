import Base from './Base';

/** @typedef {Object} FilterTextureOptions
 *  @property {Image | undefined} img Image object for the texture
 *  @property {string} src Image source URI
 *  @property {number} scale scale to draw the image. Default 1.
 *  @property {number} [opacity]
 *  @property {boolean} rotate Whether to rotate the texture with the view (may cause animation lags on mobile or slow devices). Default is true.
 *  @property {null | string | undefined} crossOrigin The crossOrigin attribute for loaded images.
 */
export declare type FilterTextureOptions = {
    img?: HTMLImageElement| undefined;
    src?: string;
    scale?: number;
    opacity?: number;
    rotate?: boolean;
    crossOrigin?: null | string | undefined;
};


/** Add texture effects on maps or layers
 * @constructor
 * @requires filter
 * @extends {filter.Base}
 * @param {FilterTextureOptions} options
 */
export default class Texture extends Base {
    constructor(options: FilterTextureOptions);
    /** Set texture
     * @param {FilterTextureOptions} [options]
     */
    setFilter(options?: FilterTextureOptions): void;
    /** Get translated pattern
     *	@param {number} offsetX x offset
     *	@param {number} offsetY y offset
     */
    getPattern(offsetX: number, offsetY: number): any;

    /** Activate / deactivate filter
    *	@param {boolean} b
     */
    setActive(b: boolean): void;
    /** Get filter active
    *	@return {boolean}
     */
    getActive(): boolean;
}

