import { Stroke, RegularShape } from 'ol/style';
import { Pixel } from 'ol/pixel';
export interface Options {
    kind?: 'default' | 'square' | 'round' | 'anchored' | 'folio';
    crop?: boolean;
    radius?: number;
    shadow?: boolean;
    stroke?: Stroke;
    src: string;
    crossOrigin?: string;
    offsetX?: number;
    offsetY?: number;
    onload: () => void;
}
/**
 * @classdesc
 * Set Photo style for vector features.
 *
 * @constructor
 * @param {} options
 *  @param { default | square | round | anchored | folio } options.kind
 *  @param {boolean} options.crop crop within square, default is false
 *  @param {number} options.radius symbol size
 *  @param {boolean} options.shadow drop a shadow
 *  @param {Stroke} options.stroke
 *  @param {string} options.src image src
 *  @param {string} options.crossOrigin The crossOrigin attribute for loaded images. Note that you must provide a crossOrigin value if you want to access pixel data with the Canvas renderer.
 *  @param {number} options.offsetX Horizontal offset in pixels. Default is 0.
 *  @param {number} options.offsetY Vertical offset in pixels. Default is 0.
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
