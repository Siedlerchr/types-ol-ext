import { Map as _ol_Map_ } from 'ol';
import { Vector as VectorSource } from 'ol/source';
import SelectBase, {Options as SelectOptions} from './SelectBase';

export interface Options extends SelectOptions {
    className?: string;
    source?: VectorSource | VectorSource[];
    property?: string;
    label?: string;
    max?: number;
    selectAll?: number;
    type?: string;
    defaultLabel?: number;
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
 *  @param {string} options.label control label
 *  @param {number} options.max max feature to test to get the values, default 10000
 *  @param {number} options.selectAll select all features if no option selected
 *  @param {string} options.type check type: checkbox or radio, default checkbox
 *  @param {number} options.defaultLabel label for the default radio button
 *  @param {function|undefined} options.onchoice function triggered when an option is clicked, default doSelect
 */
export default class SelectCheck extends SelectBase {
    constructor(options?: Options);
    /**
    * Set the map instance the control associated with.
    * @param {_ol_Map_} map The map instance.
     */
    setMap(map: _ol_Map_): void;

    /** Set the popup values
     * @param {Object} options
     *  @param {Object} options.values a key/value list with key = property value, value = title shown in the popup, default search values in the sources
     *  @param {boolean} options.sort sort values
     */
    setValues(options: {
        values?: { [key: string]: any; }
        sort?: boolean;
    }): void;

}
