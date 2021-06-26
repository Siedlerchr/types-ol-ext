import Collection from 'ol/Collection';
import Feature from 'ol/Feature';
import { Vector as VectorSource } from 'ol/source';
import SelectBase from './SelectBase';
import { condition } from 'ol-ext/control/SelectBase';

export interface Options {
    className?: string;
    target?: Element;
    source?: VectorSource | VectorSource[];
    label?: string;
    selectAll?: number;
    condition?: condition | condition[];
    onchoice: () => void
}
/**
 * Select features by property using a condition
 *
 * @constructor
 * @extends {contrSelectBase}
 * @fires select
 * @param {Object=} options
 *  @param {string} options.className control class name
 *  @param {Element | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 *  @param {Vector | Array<Vector>} options.source the source to search in
 *  @param {string} options.label control label, default 'condition'
 *  @param {number} options.selectAll select all features if no option selected
 *  @param {condition|Array<condition>} options.condition conditions
 *  @param {function|undefined} options.onchoice function triggered when an option is clicked, default doSelect
 */
export default class SelectCondition extends SelectBase {
    constructor(options?: Options);
    /** Add a condition to select on */
    addCondition(condition: condition): void

    setCondition(condition: condition | condition[]): void;



}
