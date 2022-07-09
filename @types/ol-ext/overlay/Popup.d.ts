import { Overlay as Overlay } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Options as OverlayOptions } from 'ol/Overlay';
import OverlayPositioning from 'ol/OverlayPositioning';


/** Openlayers Overlay.
 * An element to be displayed over the map and attached to a single map location.
 * @namespace Overlay
 * @see {@link http://openlayers.org/en/latest/apidoc/module-ol_Overlay.html}
 */


export interface Options extends OverlayOptions {
    popupClass?: string;
    anim?: boolean;
    closeBox?: boolean;
    onclose?: () => void;
    onshow?: () => void;
    offsetBox?: number | number[];
    positioning?: typeof OverlayPositioning | any | undefined; // workaround with any for 'auto'
}



/**
 * @classdesc
 * A popup element to be displayed over the map and attached to a single map
 * location. The popup are customized using CSS.
 *
 * @example
var popup = new ol_Overlay_Popup();
map.addOverlay(popup);
popup.show(coordinate, "Hello!");
popup.hide();
*
* @constructor
* @extends {ol_Overlay}
* @fires show
* @fires hide
* @param {} options Extend Overlay options
*	 @param {String} [options.popupClass] the a class of the overlay to style the popup.
*	 @param {boolean} [options.anim Animate=false] the popup the popup, default false.
*	 @param {boolean} [options.closeBox=false] popup has a close box, default false.
*	 @param {function|undefined} [options.onclose] callback function when popup is closed
*	 @param {function|undefined} [options.onshow] callback function when popup is shown
*	 @param {Number|Array<number>} [options.offsetBox] an offset box
*	 @param {ol.OverlayPositioning | string | undefined} options.positioning
*		the 'auto' positioning var the popup choose its positioning to stay on the map.
*	 @param {boolean} [options.minibar=false] add a mini vertical bar
* @api stable
*/
export default class Popup extends Overlay {
    constructor(options?: Options);
    /**
     * Set a close box to the popup.
     * @param {boolean} b
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
    setPositioning(pos?: typeof OverlayPositioning | string): void;
    /** Check if popup is visible
    * @return {boolean}
     */
    getVisible(): boolean;
    /**
     * Set the position and the content of the popup.
     * @param {Coordinate|string} coordinate the coordinate of the popup or the HTML content.
     * @param {string|HTMLElement|undefined} html the HTML content (undefined = previous content).
     * @example
    var popup = new Overlay.Popup();
    // Show popup
    popup.show([166000, 5992000], "Hello world!");
    // Move popup at coord with the same info
    popup.show([167000, 5990000]);
    // set new info
    popup.show("New informations");
    * @api stable
     */
    show(coordinate?: Coordinate | string, html?: string | HTMLElement): void;
    /**
     * Hide the popup
     * @api stable
     */
    hide(): void;
}
