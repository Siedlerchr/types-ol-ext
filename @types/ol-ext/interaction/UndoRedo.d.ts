import { Map as _ol_Map_ } from 'ol';
import { Interaction } from 'ol/interaction';
import BaseEvent from 'ol/events/Event';
import { Layer } from 'ol/layer';

export enum UndoRedoEventType {
    UNDO = 'undo',
    REDO = 'redo'
}
export interface Options {
    maxLength?: number;
    layers?: Layer[]
}

/** Undo/redo interaction
 * @constructor
 * @extends {ol_interaction_Interaction}
 * @fires undo
 * @fires redo
 * @fires change:add
 * @fires change:remove
 * @fires change:clear
 * @param {Object} options
 *  @param {number=} options.maxLength max undo stack length (0=Infinity), default Infinity
 *  @param {Array<ol.Layer>} options.layers array of layers to undo/redo
 */
export default class UndoRedo extends Interaction {
    constructor(options?: Options);
    /** Add a custom undo/redo
     * @param {string} action the action key name
     * @param {function} undoFn function called when undoing
     * @param {function} redoFn function called when redoing
     * @api
     */
    define(action: string, undoFn: (e: UndoRedoEvent) => void, redoFn: (e: UndoRedoEvent) => void) : void; //TOOD unsure about the event type
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
    setMap(map: _ol_Map_): void;
    /** A feature is added / removed
     */
    _onAddRemove(): void;
    /** Start an undo block
     * @api
     */
    blockStart(): void;
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
    action: any;
}
