import type ol_Collection from 'ol/Collection'
import type { Style, Text } from 'ol/style'
import type { StyleFunction, StyleLike } from 'ol/style/Style'
import type { Size } from 'ol/size'
import type Layer from 'ol/layer/Base'
import type ol_legend_Image from './Image'
import type ol_legend_Item from './Item'
import type { olLegendItemOptions } from './Item'
import BaseObject from 'ol/Object';
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { OnSignature } from 'ol/Observable'

export type LegendEntry = ol_legend_Item | ol_legend_Image | ol_legend_Legend
export type LegendEntryOptions = olLegendItemOptions | LegendEntry
export interface LegendSelectEvent extends BaseEvent {
  type: 'select';
  index: number;
  symbol: boolean;
  item: LegendEntry;
}
export interface LegendRefreshEvent extends BaseEvent { type: 'refresh'; width: number; height: number }
export interface LegendItemsEvent extends BaseEvent { type: 'items'; nb: number }

export interface Options {
  title?: string;
  maxWidth?: number;
  size?: Size;
  margin?: number;
  layer?: Layer;
  textStyle?: Text;
  titleStyle?: Text;
  style?: StyleLike;
  items?: LegendEntryOptions[];
}

/** Legend class to draw features in a legend element
 * @constructor
 * @fires select
 * @fires refresh
 */
export default class ol_legend_Legend extends BaseObject {
  /** Get a symbol image for a given legend item
   * @param {olLegendItemOptions} item
   * @param {Canvas|undefined} canvas a canvas to draw in, if none creat one
   * @param {int|undefined} offsetY Y offset to draw in canvas, default 0
   */
  static getLegendImage(item?: olLegendItemOptions, canvas?: HTMLCanvasElement, row?: number): HTMLCanvasElement;

  /**
   * @param {*} options
   *  @param {String} options.title Legend title
   *  @param {number} [options.maxWidth] maximum legend width
   *  @param {ol.size} [options.size] Size of the symboles in the legend, default [40, 25]
   *  @param {number} [options.margin=10] Size of the symbole's margin, default 10
   *  @param { ol.layer.Base } [layer] layer associated with the legend
   *  @param { ol.style.Text} [options.textStyle='16px sans-serif'] a text style for the legend, default 16px sans-serif
   *  @param { ol.style.Text} [options.titleStyle='bold 16px sans-serif'] a text style for the legend title, default textStyle + bold
   *  @param { ol.style.Style | Array<ol.style.Style> | ol.StyleFunction | undefined } options.style a style or a style function to use with features
   */
  constructor(options?: Options);

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
  getTextStyle(): Text;

  /** Get the title text style. */
  getTitleStyle(): Text;

  /** Set the layer associated with the legend
   * @param {ol.layer.Layer} [layer]
   */
  setLayer(layer?: Layer | null): void

  /** Get legend list element
   * @returns {Element}
   */
  getListElement(): Element;

  /** Get legend canvas
   * @returns {HTMLCanvasElement}
   */
  getCanvas(): HTMLCanvasElement;

  /** Set the style
   * @param { Style| Array<Style> | StyleFunction | undefined } style a style or a style function to use with features
   */
  setStyle(style: Style | Array<Style> | StyleFunction | undefined): void;

  /** Add a new item to the legend
   * @param {olLegendItemOptions|ol_legend_Item|ol_legend_Image|ol_legend_Legend} item
   */
  addItem(item: LegendEntryOptions): void;

  /** Get item collection
   * @param {ol_Collection}
   */
  getItems(): ol_Collection<LegendEntry>;

  /** Remove an item at index
   * @param {ol_legend_Item} item
   */
  removeItem(item: LegendEntry): void;

  /*
  * @param {number} index
  */
  removeItemAt(index: number): void;

  /** Refresh the legend
   */
  refresh(silent?: boolean): void;

  /** Calculate the legend height
   * @return {number}
   */
  getHeight(): number;

  /** Calculate the legend width
   * @return {number}
   */
  getWidth(): number;

  /** Get the image for a style
   * @param {olLegendItemOptions} item
   * @param {Canvas|undefined} canvas a canvas to draw in, if none create one
   * @param {int|undefined} offsetY Y offset to draw in canvas, default 0
   * @return {CanvasElement}
   */
  getLegendImage(item: olLegendItemOptions, canvas?: HTMLCanvasElement, offsetY?: number): HTMLCanvasElement;

  on: BaseObject['on'] & OnSignature<'select', LegendSelectEvent, EventsKey> & OnSignature<'refresh', LegendRefreshEvent, EventsKey> & OnSignature<'items', LegendItemsEvent, EventsKey>;
  once: BaseObject['once'] & OnSignature<'select', LegendSelectEvent, EventsKey> & OnSignature<'refresh', LegendRefreshEvent, EventsKey> & OnSignature<'items', LegendItemsEvent, EventsKey>;
  un: BaseObject['un'] & OnSignature<'select', LegendSelectEvent, void> & OnSignature<'refresh', LegendRefreshEvent, void> & OnSignature<'items', LegendItemsEvent, void>;
}
