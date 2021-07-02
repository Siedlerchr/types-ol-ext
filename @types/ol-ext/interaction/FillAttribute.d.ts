import Feature from 'ol/Feature';
import { Interaction, Select } from 'ol/interaction';
import {Options as SelectOptions} from 'ol/interaction/Select'

export interface Options extends SelectOptions {
    active?: boolean;
    name?: string;
    cursor?: boolean | string;
}
/** A Select interaction to fill feature's properties on click.
 * @constructor
 * @extends {ol_interaction_Interaction}
 * @fires setattributestart
 * @fires setattributeend
 * @param {*} options extentol.interaction.Select options
 *  @param {boolean} options.active activate the interaction on start, default true
 *  @param {string=} options.name
 *  @param {boolean|string} options.cursor interaction cursor if false use default, default use a paint bucket cursor
 * @param {*} properties The properties as key/value
 */
export default class FillAttribute extends Select {
    constructor(options: Options, properties: { [key: string]: any});
    /** Activate the interaction
     * @param {boolean} active
     */
    setActive(active: boolean): void;
    /** Set attributes
     * @param {*} properties The properties as key/value
     */
    setAttributes(properties: any): void;
    /** Set an attribute
     * @param {string} key
     * @param {*} val
     */
    setAttribute(key: string, val: any): void;
    /** get attributes
     * @return {*} The properties as key/value
     */
    getAttributes(): any;
    /** Get an attribute
     * @param {string} key
     * @return {*} val
     */
    getAttribute(key: string): any;
    /** Fill feature attributes
     * @param {Array<Feature>} features The features to modify
     * @param {*} properties The properties as key/value
     */
    fill(features: Feature[], properties: {[key: string]: any}): void;
}
