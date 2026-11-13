import type ol_legend_Legend from '../legend/Legend'
import type { LegendSelectEvent, LegendItemsEvent } from '../legend/Legend'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { ObjectEvent } from 'ol/Object'
import type { Types } from 'ol/ObjectEventType'

export interface LegendCollapseEvent extends BaseEvent { type: 'change:collapse'; collapsed: boolean }
export type LegendControlOnSignature<Return> = OnSignature<EventTypes, BaseEvent, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<'select', LegendSelectEvent, Return> & OnSignature<'items', LegendItemsEvent, Return> &
  OnSignature<'change:collapse', LegendCollapseEvent, Return> &
  CombinedOnSignature<EventTypes | Types | 'change' | 'error' | 'propertychange' | 'select' | 'items' | 'change:collapse', Return>
import type { Options as CanvasOptions } from './CanvasBase'
import CanvasBase from './CanvasBase'

export interface Options extends CanvasOptions {
  className?: string;
  legend: ol_legend_Legend;
  title?: string;
  emptyTitle?: string
  collapsed?: boolean;
  collapsible?: boolean;
}

/** Create a legend for styles
 * @constructor
 * @extends {ol_control_CanvasBase}
 * @fires select
 */
export default class Legend extends CanvasBase {
  /**
   * @param {*} options
   *  @param {String} options.className class of the control
   *  @param {String} [options.title="legend"] control title
   *  @param {String} [options.emptyTitle="no legend"] control title when legend is empty
   *  @param {ol_legend_Legend} options.legend
   *  @param {boolean | undefined} options.collapsed Specify if legend should be collapsed at startup. Default is true.
   *  @param {boolean | undefined} options.collapsible Specify if legend can be collapsed, default true.
   *  @param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
   */
  constructor(options: Options);

  on: LegendControlOnSignature<EventsKey>;
  once: LegendControlOnSignature<EventsKey>;
  un: LegendControlOnSignature<void>;

  /** Draw control on canvas
   * @param {boolean} b draw on canvas.
   */
  setCanvas(b: boolean): void;

  /** Is control on canvas
   * @returns {boolean}
   */
  onCanvas(): boolean;

  getLegend(): ol_legend_Legend;

  show(): void;

  /** Hide control
   */
  hide(): void;

  /** Toggle control
   */
  toggle(): void;

  /** Show/hide control
   *
   */
  collapse(b?: boolean): void;

  /** Is control collapsed
   * @returns {boolean}
   */
  isCollapsed(): boolean;
}
