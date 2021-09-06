import Base from "./Base";
import { ColorLike } from 'ol/colorlike';

export interface Options {
    className?: string;
    input?: Element;
    parent?: Element;
    fixed?: boolean;
    autoClose?: boolean;
    visible?: boolean;
}


/** Color picker
 * @constructor
 * @extends {ol_ext_input_Base}
 * @fires change:color
 * @fires color
 * @param {*} options
 *  @param {string} [options.className]
 *  @param {ol.colorLike} [options.color] default color
 *  @param {Element} [options.input] input element, if non create one
 *  @param {Element} [options.parent] parent element, if create an input
 *  @param {boolean} [options.fixed=false] don't use a popup, default use a popup
 *  @param {boolean} [options.autoClose=true] close when click on color
 *  @param {boolean} [options.visible=false] display the input
 */
export default class Color extends Base {
    constructor(options?: Options);

    /** Add color to palette
     * @param {ol.colorLike} color
     * @param {string} title
     * @param {boolean} select
     */
    addPaletteColor(color: ColorLike, title: string, select: boolean): void;
     /** Set Color
     * @param { Array<number> }
     */
    setColor(color: number[]): void;
    /** Get current color
     * @param {boolean} [opacity=true]
     * @return {Array<number>}
     */
    getColor(opacity?: boolean): number[]
    /** show/hide color picker
     * @param {boolean} [b=false]
     */
    collapse(b?: boolean): void;
    /** Is the popup collapsed ?
     * @returns {boolean}
     */
    isCollapsed(): boolean;
    /** Toggle the popup
     */
    toggle(): void;

    clearCustomColor(): void;
    /** Convert color to id
     * @param {ol.colorLike} Color
     * @returns {number}
     */
    getColorID(color: ColorLike): number;
    /** Convert color to id
     * @param {number} id
     * @returns {Array<number>} Color
     */
    getColorFromID(id: number): number[];
}

