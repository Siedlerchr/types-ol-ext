import ol_Object from 'ol/Object';
import { Size } from 'ol/size';

export interface Options {
    url: string,
    title?: string
    img?: HTMLImageElement | HTMLCanvasElement
    className?: string;
    width?: number;
}
/** A class for legend image
 * @constructor
 * @fires changed
 * @param {Object} options
 *  @param {string} url
 *  @param {string} [title]
 *  @param {HTMLImageElement|HTMLCanvasElement} [img] an image to display
 *  @param {string} [src] legend image url (if no img option)
 *  @param {string} [className] 'center' to center the title
 *  @param {number} [width] legend width, default use the image width
 */
export default class Image extends ol_Object {

    constructor(options?: Options);
    /** Set the legend title
     * @param {string} title
     */
    setTitle(title: string): void;

    /** Set the item width
     * @param {number} [width] legend width, default use the image width
     */
    setWidth(width?: number): void;
    /** Get image width
     * @return {number}
     */
    getWidth(): number;

    /** Get image height
     * @return {number}
     */
    getHeight(): number;

    /** Get Image
     * @returns {Image}
     */
    getImage(): HTMLImageElement | HTMLCanvasElement

    /** Get element
    * @param {Size} size symbol size
    */
    getElement(size: Size, onclick: (click: boolean) => void): HTMLElement
}
