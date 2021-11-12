import { Stroke, RegularShape } from 'ol/style';
import { Pixel } from 'ol/pixel';
export interface Options {
    kind?: 'default' | 'square' | 'circle' | 'anchored' | 'folio';
    crop?: boolean;
    radius?: number;
    shadow?: boolean;
    stroke?: Stroke;
    src?: string;
    crossOrigin?: string;
    offsetX?: number;
    offsetY?: number;
    onload?: () => void;
}

/**
 * @classdesc
 * Set Photo style for vector features.
 *
 * @constructor
 * @param {} options
 *  @param { default | square | circle | anchored | folio } options.kind
 *  @param {boolean} options.crop crop within square, default is false
 *  @param {Number} options.radius symbol size
 *  @param {boolean} options.shadow drop a shadow
 *  @param {ol_style_Stroke} options.stroke
 *  @param {String} options.src image src
 *  @param {String} options.crossOrigin The crossOrigin attribute for loaded images. Note that you must provide a crossOrigin value if you want to access pixel data with the Canvas renderer.
 *  @param {Number} options.offsetX Horizontal offset in pixels. Default is 0.
 *  @param {Number} options.offsetY Vertical offset in pixels. Default is 0.
 *  @param {function} options.onload callback when image is loaded (to redraw the layer)
 * @extends {RegularShape}
 * @api
 */
export default class Photo extends RegularShape {
    constructor(options?: Options);
    /** Set photo offset
    * @param {olPixel} offset
    */
    setOffset(offset: Pixel): void;
    /**
     * Clones the style.
     * @return {ol_style_Photo}
     */
    clone(): Photo;

    getChecksum(): string;
}
