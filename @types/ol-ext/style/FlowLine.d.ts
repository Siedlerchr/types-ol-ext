import Feature from 'ol/Feature';
import { Style } from 'ol/style';
import { ColorLike } from 'ol/colorlike';
import { Size } from 'ol/size';

export interface Options {
    visible?: boolean;
    width?: number | ((feature: Feature, step: number) => number);
    width2?: number;
    color?: ColorLike | ((feature: Feature, step: number) => ColorLike);
    color2?: ColorLike;
    arrowClor?: ColorLike;
    lineCap: CanvasLineCap;
    arrowSize?: number | Size;
    noOverlap?: boolean
    offset0?: number;
    offset1?: number
}
/** Flow line style
* Draw LineString with a variable color / width
* NB: the FlowLine style doesn't impress the hit-detection.
* If you want your lines to be sectionable you have to add your own style to handle this.
* (with transparent line: stroke color opacity to .1 or zero width)
* @extends {ol_style_Style}
* @constructor
* @param {Object} options
*  @param {boolean} options.visible draw only the visible part of the line, default true
*  @param {number|function} options.width Stroke width or a function that gets a feature and the position (beetween [0,1]) and returns current width
*  @param {number} options.width2 Final stroke width (if width is not a function)
*  @param {number} options.arrow Arrow at start (-1), at end (1), at both (2), none (0), default geta
*  @param {ColorLike|function} options.color Stroke color or a function that gets a feature and the position (beetween [0,1]) and returns current color
*  @param {ColorLike} options.color2 Final sroke color if color is nor a function
*  @param {ColorLike} options.arrowColor Color of arrows, if not defined used color or color2
*  @param {string} options.lineCap CanvasRenderingContext2D.lineCap 'butt' | 'round' | 'square', default 'butt'
*  @param {number|ol.size} options.arrowSize height and width of the arrow, default 16
 *  @param {boolean} [options.noOverlap=false] prevent segments overlaping
*  @param {number} options.offset0 offset at line start
*  @param {number} options.offset1 offset at line end
*/
export default class FlowLine extends Style {
    constructor(options?: Options);
    /** Set the initial width
     * @param {number} width width, default 0
     */
    setWidth(width?: number): void;
    /** Set the final width
     * @param {number} width width, default 0
     */
    setWidth2(width?: number): void;
    /** Set the LineCap
  * @param {string} cap LineCap (round or butt), default butt
  */
    setLineCap(cap: 'round' | 'butt'): void;
    /** Get the current width at step
     * @param {feature} feature
     * @param {number} step current drawing step beetween [0,1]
     * @return {number}
     */
    getWidth(feature: Feature, step: number): number;
    /** Set the initial color
     * @param {colorLike} color
     */
    setColor(color: ColorLike): void;
    /** Set the final color
     * @param {colorLike} color
     */
    setColor2(color: ColorLike): void;
    /** Set the arrow color
    * @param {ol.colorLike} color
    */
    setArrowColor(color: ColorLike): void;

    getArrow(): number;
    /** Set arrow
       * @param {number} n -1 | 0 | 1 | 2, default: 0
       */
    setArrow(n: number): void;
    /** getArrowSize
        * @return {ol.size}
        */
    getArrowSize(): Size;
    /** setArrowSize
     * @param {number|ol.size} size
     */
    setArrowSize(size: number | Size): void;
    /** Get the current color at step
     * @param {feature} feature
     * @param {number} step current drawing step beetween [0,1]
     * @return {string}
     */
    getColor(feature: Feature, step: number): string;
}
