import type { Map as _ol_Map_ } from 'ol'
import type { Interaction } from 'ol/interaction'
import type { Options as ControlOptions } from 'ol/control/Control'
import type Bar from './Bar'
import Button from './Button'

export interface Options extends ControlOptions {
  className?: string;
  title?: string;
  html?: string;
  interaction?: Interaction;
  active?: boolean;
  disable?: boolean;
  bar?: Bar;
  autoActive?: boolean;
  onToggle?: (active: boolean) => void;
}

/** A simple toggle control
 * The control can be created with an interaction to control its activation.
 *
 * @constructor
 * @extends {Button}
 * @fires change:active, change:disable

 */
export default class Toggle extends Button {
  /**
   * @param {Object=} options Control options.
   *  @param {String} options.className class of the control
   *  @param {String} options.title title of the control
   *  @param {String} options.html html to insert in the control
   *  @param {interaction} options.interaction interaction associated with the control
   *  @param {bool} options.active the control is created active, default false
   *  @param {bool} options.disable the control is created disabled, default false
   *  @param {contrBar} options.bar a subbar associated with the control (drawn when active if control is nested in a contrBar)
   *  @param {bool} options.autoActive the control will activate when shown in an contrBar, default false
   *  @param {function} options.onToggle callback when control is clicked (or use change:active event)
   */
  constructor(options?: Options);

  /**
   * Set the map instance the control is associated with
   * and add interaction attached to it to this map.
   * @param {_ol_Map_} map The map instance.
   */
  setMap(map: _ol_Map_): void;

  /** Get the subbar associated with a control
   * @return {contrBar}
   */
  getSubBar(): Bar;

  /** Set the subbar associated with a control
   * @param {ol_control_Bar} [bar] a subbar if none remove the current subbar
   */
  setSubBar(bar: Bar): void

  /**
   * Test if the control is disabled.
   * @return {bool}.
   * @api stable
   */
  getDisable(): boolean;

  /** Disable the contr If disable, the control will be deactivated too.
   * @param {bool} b disable (or enable) the control, default false (enable)
   */
  setDisable(b: boolean): void;

  /**
   * Test if the control is active.
   * @return {bool}.
   * @api stable
   */
  getActive(): boolean;

  /** Toggle control state active/deactive
   */
  toggle(): void;

  /** Change control state
   * @param {bool} b activate or deactivate the control, default false
   */
  setActive(b: boolean): void;

  /** Set the control interaction
   * @param {_ol_interaction_} i interaction to associate with the control
   */
  setInteraction(i: Interaction): void;

  /** Get the control interaction
   * @return {_ol_interaction_} interaction associated with the control
   */
  getInteraction(): Interaction;
}
