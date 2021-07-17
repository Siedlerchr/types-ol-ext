import SelectBase, {Options as SelectOptions} from './SelectBase';

export interface Options extends SelectOptions {
    selectLabel?: string;
    addLabel?: string;
    allLabel?: string;
    caseLabel?: string;
    attrPlaceHolder?: string;
    valuePlaceHolder?: string;
}
/**
 * Select Contr
 * A control to select features by attributes
 *
 * @constructor
 * @extends {contrSelectBase}
 * @fires select
 * @param {Object=} options
 *  @param {string} options.className control class name
 *  @param {Element | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 *  @param {Vector | Array<Vector>} options.source the source to search in
 *  @param {string} [options.selectLabel=select] select button label
 *  @param {string} [options.addLabel=add] add button label
 *  @param {string} [options.caseLabel=case sensitive] case checkbox label
 *  @param {string} [options.allLabel=match all] match all checkbox label
 *  @param {string} [options.attrPlaceHolder=attribute]
 *  @param {string} [options.valuePlaceHolder=value]
 */
export default class Select extends SelectBase {
    constructor(options?: SelectOptions);

}
