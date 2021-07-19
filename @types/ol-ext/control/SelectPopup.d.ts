import { Map as _ol_Map_ } from 'ol';
import { Vector as VectorSource } from 'ol/source';
import SelectBase, {Options as SelectOptions} from './SelectBase';
export interface Options extends SelectOptions{
    className?: string;
    source?: VectorSource | VectorSource[];
    property?: string;
    max?: number;
    selectAll?: number;
    defaultLabel?: string;
    onchoice: () => void
}
/**
 * Select features by property using a popup
 *
 * @constructor
 * @extends {contrSelectBase}
 * @fires select
 * @param {Object=} options
 *  @param {string} options.className control class name
 *  @param {Element | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 *  @param {Vector | Array<Vector>} options.source the source to search in
 *  @param {string} options.property property to select on
 *  @param {number} options.max max feature to test to get the values, default 10000
 *  @param {number} options.selectAll select all features if no option selected
 *  @param {string} options.defaultLabel label for the default selection
 *  @param {function|undefined} options.onchoice function triggered when an option is clicked, default doSelect
 */
export default class SelectPopup extends SelectBase {
    constructor(options?: Options);
    /**
    * Set the map instance the control associated with.
    * @param {_ol_Map_} map The map instance.
     */
    setMap(map: _ol_Map_): void;
    /**
     * @param {Object} values a key/value list with key = property value, value = title shown in the popup, default search values in the sources
     */
    setValues(values: { [key: string]: any }): void;

}
