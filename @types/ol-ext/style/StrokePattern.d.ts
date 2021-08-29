import FillPattern from './FillPattern';
import { Image, Fill, Stroke } from 'ol/style';
import { ColorLike } from 'ol/colorlike';
import { Size } from 'ol/size';
import { FillPatternOptions } from './FillPattern';

export interface Options {
    image?: Image;
    opactiy?: number;
    pattern?: FillPattern;
    color?: ColorLike;
    fill?: Fill;
    offset?: number;
    Size?: number;
    spacing?: number
    angle?: number | boolean;
    scale?: number;

}
/**
 * @classdesc
 * Stroke style with named pattern
 *
 * @constructor
 * @param {any}  options
 *	@param {style.Image|undefined} options.image an image pattern, image must be preloaded to draw on first call
 *	@param {number|undefined} options.opacity opacity with image pattern, default:1
 *	@param {olx.style.fillPattern} options.pattern pattern name (override by image option)
 *	@param {colorLike} options.color pattern color
 *	@param {Fill} options.fill fill color (background)
 *	@param {number} options.offset pattern offset for hash/dot/circle/cross pattern
 *	@param {number} options.Size line Size for hash/dot/circle/cross pattern
 *	@param {number} options.spacing spacing for hash/dot/circle/cross pattern
 *	@param {number|bool} options.angle angle for hash pattern / true for 45deg dot/circle/cross
 *	@param {number} options.scale pattern scale
 * @extends {Stroke}
 * @api
 */
export default class StrokePattern extends Stroke {
    constructor(options?: Options);
    /**
     * Clones the style.
     * @return {style.StrokePattern}
     */
    clone(): StrokePattern;
    /** Get canvas used as pattern
    *	@return {canvas}
     */
    getImage(): HTMLCanvasElement;
    /** Get pattern
    *	@param {olx.style.FillPatternOption}
     */
    getPattern_(options: FillPatternOptions): void;
}
