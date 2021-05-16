import ol_Collection from "ol/Collection";
import ol_legend_Item, { olLegendItemOptions } from "./Item";
import ol_style_Text from "ol/style/Text";
import { Style } from 'ol/style';
import { StyleFunction } from "ol/style/Style";

/** Legend class to draw features in a legend element
 * @constructor
 * @fires select
 * @fires refresh
 * @param {*} options
 *  @param {String} options.title Legend title
 *  @param {ol.size | undefined} options.size Size of the symboles in the legend, default [40, 25]
 *  @param {number | undefined} options.margin Size of the symbole's margin, default 10
 *  @param { ol_style_Text | undefined } options.textStyle a text style for the legend, default 16px sans-serif
 *  @param { ol.style.Style | Array<ol.style.Style> | ol.StyleFunction | undefined	} options.style a style or a style function to use with features
 */
export default class ol_legend_Legend {
    /** Get a symbol image for a given legend item
     * @param {olLegendItemOptions} item
     * @param {HTMLCanvasElement|undefined} canvas a canvas to draw in, if none creat one
     * @param {int|undefined} row row number to draw in canvas, default 0
     * @return {HTMLCanvasElement}
     */
    static getLegendImage(item: olLegendItemOptions, canvas?: HTMLCanvasElement | undefined, row?: number): HTMLCanvasElement;
    constructor(options: any);

    /** Set legend title
     * @param {string} title
     */
    setTitle(title: string): void;
    /** Get legend title
     * @returns {string}
     */
    getTitle(): string;
    /** Get text Style
     * @returns {ol_style_Text}
     */
    getTextStyle(): ol_style_Text;
    /** Set legend size
     * @param {ol.size} size
     */
    set(key: any, value: any, opt_silent: any): void;
    /** Get legend list element
     * @returns {Element}
     */
    getListElement(): Element;
    /** Get legend canvas
     * @returns {HTMLCanvasElement}
     */
    getCanvas(): HTMLCanvasElement;
    /** Set the style
     * @param { Style| Array<Style> | StyleFunction | undefined	} style a style or a style function to use with features
     */
    setStyle(style: Style | Array<Style> | StyleFunction | undefined): void;
    /** Add a new item to the legend
     * @param {olLegendItemOptions|ol_legend_Item} item
     */
    addItem(item: olLegendItemOptions | ol_legend_Item): void;
    /** Get item collection
     * @param {ol_Collection}
     */
    getItems(): ol_Collection<any>;
    /** Refresh the legend
     */
    refresh(): void;
    /** Get the image for a style
     * @param {olLegendItemOptions} item
     * @param {HTMLCanvasElement|undefined} canvas a canvas to draw in, if none creat one
     * @param {number|undefined} row row number to draw in canvas, default 0
     * @return {HTMLCanvasElement}
     */
    getLegendImage(item: olLegendItemOptions, canvas?: HTMLCanvasElement, row?: number): HTMLCanvasElement;
}

