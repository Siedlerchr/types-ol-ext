import { ColorLike } from 'ol/colorlike';
import Base, { Options as BaseOptions } from './Base';
export interface Options extends BaseOptions {
    className?: string;
    color?: ColorLike;
    input?: Element;
    parent?: Element;
    position?: 'popup' | 'fixed' | 'inline';
    autoClose?: boolean;
    hidden?: boolean
}


/** Base class for input popup
 * @constructor
 * @extends {ol_ext_input_Base}
 * @fires change:color
 * @fires color
 * @param {*} options
 *  @param {string} [options.className]
 *  @param {ol.colorLike} [options.color] default color
 *  @param {Element} [options.input] input element, if non create one
 *  @param {Element} [options.parent] parent element, if create an input
 *  @param {string} [options.position='popup'] fixed | popup | inline (no popup)
 *  @param {boolean} [options.autoClose=true] close when click on color
 *  @param {boolean} [options.hidden=false] display the input
 */
export default class PopupBase extends Base {
    constructor(options?: Options);

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
}
