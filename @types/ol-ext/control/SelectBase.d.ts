import Collection from 'ol/Collection';
import ol_control_Control, {Options as ControlOptions} from 'ol/control/Control';
import Feature from 'ol/Feature';
import { Vector as VectorSource } from 'ol/source';

/**
 *  '=': '=',
  '!=': '≠',
  '<': '<',
  '<=': '≤',
  '>=': '≥',
  '>': '>',
  'contain': '⊂', // ∈
  '!contain': '⊄',	// ∉
  'regexp': '≃',
  '!regexp': '≄'
 */
export type operators = '=' | '!=' | '<' | '>' | '<=' | '>=' | '>'| 'contain'| '!contain' | 'regexp' | '!regexep'
export interface condition {
    attr: string;
    op: operators;
    val: string;
}
export interface Options extends ControlOptions {
    className?: string;
    content?: Element
    features?: Collection<Feature>;
    source?: VectorSource | VectorSource[];
    btInfo?: string;
}
/**
/**
 * This is the base class for Select controls on attributes values.
 * Abstract base class;
 * normally only used for creating subclasses and not instantiated in apps.
 *
 * @constructor
 * @extends {ol_control_Control}
 * @fires select
 * @param {Object=} options
 *  @param {string} options.className control class name
 *  @param {Element} options.content form element
 *  @param {Element | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 *  @param {ol.Collection<ol.Feature>} options.features a collection of feature to search in, the collection will be kept in date while selection
 *  @param {ol.source.Vector | Array<ol.source.Vector>} options.source the source to search in if no features set
 *  @param {string} options.btInfo ok button label
 */
export default class SelectBase extends ol_control_Control {
    constructor(options?: Options);
    /** Set the current sources
     * @param {VectorSource|Array<VectorSource>|undefined} source
     */
    setSources(source: VectorSource | VectorSource[] | undefined): void;
    /** Set feature collection to search in
     * @param {Collection<Feature>} features
     */
    setFeatures(features: Collection<Feature>): void;
    /** Get feature collection to search in
     * @return {Collection<Feature>}
     */
    getFeatures(): Collection<Feature>;
    /** List of operators / translation
     * @api
     */
    operationsList: any; //TODO
    /** Escape string for regexp
     * @param {string} search
     * @return {string}
     */

    /** Get vector source
     * @return {Array<VectorSource>}
     */
    getSources(): VectorSource[];
    /** Select features by attributes
     * @param {*} options
     *  @param {Array<Vector|undefined} options.sources source to apply rules, default the select sources
     *  @param {bool} options.useCase case sensitive, default false
     *  @param {bool} options.matchAll match all conditions, default false
     *  @param {Array<conditions>} options.conditions array of conditions
     * @return {Array<Feature>}
     * @fires select
     */
    doSelect(options?: {
        useCase?: boolean;
        matchAll?: boolean;
        conditions?: condition[];
    }): Feature[];
}
