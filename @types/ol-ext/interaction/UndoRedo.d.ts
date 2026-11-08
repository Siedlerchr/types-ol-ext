import type { Map as _ol_Map_ } from 'ol'
import { Interaction } from 'ol/interaction'
import BaseEvent from 'ol/events/Event'
import type { Layer } from 'ol/layer'

export enum UndoRedoEventType {
  UNDO = 'undo',
  REDO = 'redo'
}

export interface Options {
  maxLength?: number;
  layers?: Layer[];
}

/** Undo/redo interaction
 * @constructor
 * @extends {ol_interaction_Interaction}
 * @fires undo
 * @fires redo
 * @fires change:add
 * @fires change:remove
 * @fires change:clear

 */
export default class UndoRedo extends Interaction {
  /**
   * @param {Object} options
   *  @param {number=} options.maxLength max undo stack length (0=Infinity), default Infinity
   *  @param {Array<ol.Layer>} options.layers array of layers to undo/redo
   */
  constructor(options?: Options);

  /** Add a custom undo/redo
   * @param {string} action the action key name
   * @param {function} undoFn function called when undoing
   * @param {function} redoFn function called when redoing
   * @api
   */
  define<T = any>(action: string, undoFn: (prop: T) => void, redoFn: (prop: T) => void): void;

  /** Get the number of top-level undo or redo actions. */
  length(type?: string): number;

  /** Get the number of actions including nested blocks. */
  size(type?: string): number;

  /** Set undo stack maximum length. */
  setMaxLength(length: number): void;
  /** Set undo stack maximum size. */
  setMaxSize(size: number): void;
  /** Get the first-level undo stack, or the redo stack when type is 'redo'. */
  getStack(type?: string): any[];
  /** Abort the last operation, removing it from the stack without redoing it. */
  abort(): void;

  /** Add a new custom undo/redo
   * @param {string} action the action key name
   * @param {any} prop an object that will be passed in the undo/redo functions of the action
   * @param {string} name action name
   * @return {boolean} true if the action is defined
   */
  push(action: string, prop: any, name: string): boolean;

  /** Remove undo action from the beginning of the stack.
   * The action is not returned.
   */
  shift(): void

  /** Activate or deactivate the interaction, ie. records or not events on the map.
   * @param {boolean} active
   * @api stable
   */
  setActive(active: boolean): void;

  /**
   * Remove the interaction from its current map, if any, and attach it to a new
   * map, if any. Pass `null` to just remove the interaction from the current map.
   * @param {Map} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_ | null): void;

  /** A feature is added / removed
   */
  _onAddRemove(): void;

  /** Start an undo block
   * @api
   */
  blockStart(name?: string): void;

  /** End an undo block
   * @api
   */
  blockEnd(): void;

  /** Undo last operation
   * @api
   */
  undo(): void;

  /** Redo last operation
   * @api
   */
  redo(): void;

  /** Clear undo stack
   * @api
   */
  clear(): void;

  /** Check if undo is avaliable
   * @return {number} the number of undo
   * @api
   */
  hasUndo(): number;

  /** Check if redo is avaliable
   * @return {number} the number of redo
   * @api
   */
  hasRedo(): number;
}

export class UndoRedoEvent extends BaseEvent {
  constructor(
    type: UndoRedoEventType,
    action: any
  );

  action: any
}
