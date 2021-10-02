import Feature from 'ol/Feature';
import { StyleLike } from 'ol/style/Style';
import { Size } from 'ol/size';
import { Text } from 'ol/style';
/**
 * ol/legend/Item options
 */
export type olLegendItemOptions = {
    /**
     * row title
     */
    title: string;
    className: string;
    /**
     * a feature to draw on the legend
     */
    feature?: Feature;
    /**
     * type geom to draw with the style or the properties if no feature is provided
     */
    typeGeom?: string;
    /**
     * a set of properties to use with a style function
     */
    properties?: any;
    /**
     * a style or a style function to use to draw the legend
     */
    style: StyleLike;
    textStyle: Text
    size?: Size
    margin?: number
};
/** ol/legend/Item options
 * @typedef {Object} olLegendItemOptions
 *  @property {string} title row title
 *  @property {className} className
 *  @property {Feature} feature a feature to draw on the legend
 *  @property {string} typeGeom type geom to draw with the style or the properties if no feature is provided
 *  @property {Object} properties a set of properties to use with a style function
 *  @property {StyleLike} style a style or a style function to use to draw the legend symbol
 *  @property {Text} textStyle a text style to draw the item title in the legend
 *  @property {Size|undefined} size
 *  @property {number|undefined} margin
 */

/** A class for legend items
 * @constructor
 * @fires select
 * @param {olLegendItemOptions} options
 */
export default class LegendItem {
    constructor(options?: olLegendItemOptions);
    /** Set the legend title
     * @param {string} title
     */
    setTitle(title: string): void;
    /** Get element
     * @param {ol.size} size symbol size
     * @callback onClick
     */
    getElement(size: Size, onclick: any): HTMLElement | Text;
}
