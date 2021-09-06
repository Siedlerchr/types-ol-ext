import { Map as _ol_Map_ } from 'ol';
import { Vector as VectorSource } from 'ol/source';
import SelectBase, {Options as SelectOptions} from './SelectBase';

export interface Options extends SelectOptions {
    className?: string;
    source?: VectorSource | VectorSource[];
    controls?: SelectBase[];
}
/**
 * A multiselect contr
 * A container that manage other control Select
 *
 * @constructor
 * @extends {contrSelectBase}
 * @fires select
 * @param {Object=} options
 *  @param {string} options.className control class name
 *  @param {Element | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 *  @param {Vector | Array<Vector>} options.source the source to search in
 *  @param {Array<contrSelectBase>} options.controls an array of controls
 */
export default class SelectMulti extends SelectBase {
    constructor(options?: Options);
    /**
    * Set the map instance the control associated with.
    * @param {_ol_Map_} map The map instance.
     */
    setMap(map: _ol_Map_): void;
    /** Add a new control
     * @param {contrSelectBase} c
     */
    addControl(c: SelectBase): void;
    /** Get select controls
     * @return {Aray<contrSelectBase>}
     */
    getControls(): SelectBase[]

}
