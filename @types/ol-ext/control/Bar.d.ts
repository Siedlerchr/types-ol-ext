import type { Map as _ol_Map_ } from 'ol'
import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { ObjectEvent } from 'ol/Object'
import type { Types } from 'ol/ObjectEventType'

export type BarEventType = 'control:active' | 'control:add'
export interface BarEvent extends BaseEvent {
  type: BarEventType;
  control: ol_control_Control;
  active: boolean;
}
export type BarOnSignature<Return> = OnSignature<EventTypes, BaseEvent, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<BarEventType, BarEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'error' | 'propertychange' | BarEventType, Return>

export interface Options extends ControlOptions {
  id?: string;
  className?: string;
  group?: boolean;
  toggleOne?: boolean;
  autoDeactivate?: boolean;
  controls?: ol_control_Control[];
  attributes?: { [key: string]: string };
}

/** Control bar for OL3
 * The control bar is a container for other controls. It can be used to create toolbars.
 * Control bars can be nested and combined with ol.control.Toggle to handle activate/deactivate.
 *
 * @constructor
 * @extends {ol_control_Control}
 */
export default class Bar extends ol_control_Control {
/** Control bar for OL3
 * The control bar is a container for other controls. It can be used to create toolbars.
 * Control bars can be nested and combined with ol.control.Toggle to handle activate/deactivate.
 * @class
 * @constructor
 * @fires control:active
 * @fires control:add
 * @extends ol_control_Control
 * @param {Object=} options Control options.
 *  @param {String} [options.id] button id, default generate a unique id
 *  @param {String} [options.className] class of the control
 *  @param {boolean} [options.group=false] is a group, default false
 *  @param {boolean} [options.toggleOne=false] only one toggle control is active at a time, default false
 *  @param {boolean} [options.autoDeactivate=false] used with subbar to deactivate all control when top level control deactivate, default false
 *  @param { Array<ol_control_Control> } [options.controls] a list of control to add to the bar
 *  @param {Object} [options.attributes] key value attributes to set on the button element
 */
  constructor(options?: Options);

  on: BarOnSignature<EventsKey>;
  once: BarOnSignature<EventsKey>;
  un: BarOnSignature<void>;

  /** Set the control visibility
   * @param {boolean} b
   */
  setVisible(b: boolean): void;

  /** Get the control visibility
   * @return {boolean} b
   */
  getVisible(): boolean;

  /**
   * Set the map instance the control is associated with
   * and add its controls associated to this map.
   * @param {_ol_Map_} map The map instance.
   */
  setMap(map: _ol_Map_ | null): void;

  /** Get controls in the panel
   *  @return {Array<ol_control_Control>}
   */
  getControls(): ol_control_Control[];

  /** Get active controls in the bar. */
  getActiveControls(): ol_control_Control[];

  /** Set tool bar position
   *  @param {top|left|bottom|right} pos
   */
  setPosition(pos: string): void;

  /** Add a control to the bar
   *  @param {_ol_control_} c control to add
   */
  addControl(c: ol_control_Control): void;

  /** Deativate all controls in a bar
   * @param {_ol_control_} except a control
   */
  deactivateControls(except?: ol_control_Control): void;

  /** Remove a control from the bar
   * @param {ol_control_Control} c control to remove
   */
  removeControl(c: ol_control_Control): void;

  /** Auto activate/deactivate controls in the bar
   * @param {boolean} b activate/deactivate
   */
  setActive(b: boolean): void;

  /**
   * @param {string} name of the control to search
   * @return {ol_control_Control}
   */
  getControlsByName(name: string): ol_control_Control[];
}
