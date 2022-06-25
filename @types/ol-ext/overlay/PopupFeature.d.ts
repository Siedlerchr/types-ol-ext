import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature';
import { Overlay } from 'ol';
import OverlayPositioning from 'ol/OverlayPositioning';
import { Select } from 'ol/interaction';


/** Template attributes for popup
 * @typedef {Object} TemplateAttributes
 * @property {string} title
 * @property {function} format a function that takes an attribute and a feature and returns the formated attribute
 * @property {string} before string to instert before the attribute (prefix)
 * @property {string} after string to instert after the attribute (sudfix)
 * @property {boolean|function} visible boolean or a function (feature, value) that decides the visibility of a attribute entry
 */
export declare type TemplateAttributes = {
    title?: string;
    format?: (val: any, feature?: Feature) => any;
    before?: string;
    after?: string;
    visible?: boolean | ((feature: Feature, val: any) => boolean);
};

/** Template
 * @typedef {Object} Template
 * @property {string|function} title title of the popup, attribute name or a function that takes a feature and returns the title
 * @property {Object.<TemplateAttributes>} attributes a list of template attributes
 */
export declare type Template = {
    title?: string | ((feature: Feature) => string);
    attributes?: {
        [key: string]: TemplateAttributes;
    };
};

export interface Options {
    popupClass?: string;
    closeBox?: boolean;
    onclose?: ((...params: any[]) => any);
    onshow?: ((...params: any[]) => any);
    offsetBox?: number | number[];
    positioning?: typeof OverlayPositioning | string;
    template?: Template | ((f: Feature) => Template);
    select?: Select;
    keepSelection?: boolean;
    canFix?: boolean;
    showImage?: boolean;
    maxChar?: number;
}
/**
 * A popup element to be displayed on a feature.
 *
 * @constructor
 * @extends {ol_Overlay_Popup}
 * @fires show
 * @fires hide
 * @fires select
 * @param {} options Extend Popup opt^ions
 *  @param {String} options.popupClass the^ a class of the overlay to style the popup.
 *  @param {boolean} options.closeBox popup has a close box, default false.
 *  @param {funcetion|undefined} options.onclose: callback function when popup is closed
 *  @param {function|undefined} options.onshow callback function when popup is shown
 *  @param {Number|Array<number>} options.offsetBox an offset box
 *  @param {ol.OverlayPositioning | string | undefined} options.positionning
 *    the 'auto' positioning var the popup choose its positioning to stay on the map.
 *  @param {Template|function} [options.template] A template with a list of properties to use in the popup or a function that takes a feature and returns a Template, default use all feature properties
 *  @param {Select} options.select a select interaction to get features from
 *  @param {boolean} options.keepSelection keep original selection, otherwise set selection to the current popup feature and add a counter to change current feature, default false
 *  @param {boolean} options.canFix Enable popup to be fixed, default false
 *  @param {boolean} options.showImage display image url as image, default false
 *  @param {number} options.maxChar max char to display in a cell, default 200
 *  @api stable
 */
export default class PopupFeature extends Overlay { // we cannot use extends Popup, because show breaks polymorphism
    constructor(options?: Options);

    /** Set the template
     * @param {Template} [template] A template with a list of properties to use in the popup, default use all features properties
     */
    setTemplate(template?: Template): void;
    /** Show the popup on the map
  * @param {ol.coordinate|undefined} coordinate Position of the popup
  * @param {Feature|Array<Feature>} features The features on the popup
  * @param {Feature} current The current feature if keepSelection = true, otherwise get the first feature
  */
    show(coordinate?: Coordinate, features?: Feature | Feature[], current?: Feature): void;
    /** Fix the popup
     * @param {boolean} fix
     */
    setFix(fix: boolean): void;
    /** Is a popup fixed
     * @return {boolean}
     */
    getFix(): boolean;
    /**
     * Set a close box to the popup.
     * @param {bool} b
     * @api stable
     */
    setClosebox(b: boolean): void;
    /**
     * Set the CSS export class of the popup.
     * @param {string} c export class name.
     * @api stable
     */
    setPopupClass(c: string): void;
    /**
     * Add a CSS export class to the popup.
     * @param {string} c export class name.
     * @api stable
     */
    addPopupClass(c: string): void;
    /**
     * Remove a CSS export class to the popup.
     * @param {string} c export class name.
     * @api stable
     */
    removePopupClass(c: string): void;
    /**
     * Set positionning of the popup
     * @param {OverlayPositioning | string | undefined} pos an OverlayPositioning
     * 		or 'auto' to var the popup choose the best position
     * @api stable
     */
    setPositioning(pos: typeof OverlayPositioning | string | undefined): void;
    /** Check if popup is visible
    * @return {boolean}
     */
    getVisible(): boolean;
    /**
     * Hide the popup
     * @api stable
     */
    hide(): void;
}

/** Get a function to use as format to get local string for an attribute
 * if the attribute is a number: Number.toLocaleString()
 * if the attribute is a date: Date.toLocaleString()
 * otherwise the attibute itself
 * @param {string} locales string with a BCP 47 language tag, or an array of such strings
 * @param {*} options Number or Date toLocaleString options
 * @return {function} a function that takes an attribute and return the formated attribute
 */
export function ol_Overlay_PopupFeature_localString(locales?: string | string[], options?: Intl.DateTimeFormatOptions | Intl.NumberFormatOptions): (a: any) => any;
