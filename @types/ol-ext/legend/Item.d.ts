import type Feature from 'ol/Feature'
import type { StyleLike } from 'ol/style/Style'
import type { Size } from 'ol/size'
import type { Text } from 'ol/style'
import BaseObject from 'ol/Object'

/**
 * ol/legend/Item options
 */
export type olLegendItemOptions = {
  /**
   * row title
   */
  title: string;
  className?: string;
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
   * a style or a style function to use to draw the legend symbol
   */
  style?: StyleLike;
  /**
   * a text style to draw the item title in the legend
   */
  textStyle?: Text;
  /**
   * the symbol width, default use the default width
   */
  width?: number;
  /**
   * the symbol height, default use the default height
   */
  height?: number;
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
 *  @property {number|undefined} width the symbol width, default use the default width
 *  @property {number|undefined} height the symbol height, default use the default height
 *  @property {Size|undefined} size
 *  @property {number|undefined} margin
 */

/** A class for legend items
 * @constructor
 * @fires select
 */
export default class LegendItem extends BaseObject {
  /**
   * @param {olLegendItemOptions} options
   */
  constructor(options?: olLegendItemOptions);

  /** Set the legend title
   * @param {string} title
   */
  setTitle(title: string): void;

  /** Get element
   * @param {ol.size} size symbol size
   * @param {function} onclick
   */
  getElement(size: Size, onclick: (callback: boolean) => void): HTMLElement | Text;
}
