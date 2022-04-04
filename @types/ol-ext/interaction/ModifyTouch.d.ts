import { Map as _ol_Map_ } from 'ol';
import { Modify } from 'ol/interaction';
import OverlayPositioning from 'ol/OverlayPositioning';
import BaseEvent from 'ol/events/Event';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';
import { EventsKey } from 'ol/events';
import { ObjectEvent } from 'ol/Object';
import { ModifyEvent } from './ModifyFeature';
import { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable';
import { Types } from 'ol/ObjectEventType';

type ModifyTouchOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'modifyend' | 'modifystart', ModifyEvent, Return> &
  OnSignature<Types | 'showpopup' | 'hidepopup', PopupEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'modifyend' | 'modifystart' | 'showpopup' | 'hidepopup', Return>

export enum PopupEventType {
    SHOWPOPUP = 'showpopup',
    HIDEPOPUP = 'hidepopup'
}
export interface Options {
    title?: string;
    className?: string;
    positioning?: typeof OverlayPositioning;
    offsetBox?: number | number[];
    usePopup?: boolean;
}
/** Modify interaction with a popup to delet a point on touch device
 * @constructor
 * @fires showpopup
 * @fires hidepopup
 * @extends {ol.interaction.Modify}
 * @param {olx.interaction.ModifyOptions} options
 * @param {String|undefined} options.title title to display, default "remove point"
 * @param {String|undefined} options.className CSS class name for the popup
 * @param {String|undefined} options.positioning positioning for the popup
 * @param {Number|Array<number>|undefined} options.offsetBox offset box for the popup
 * @param {Boolean|undefined} options.usePopup use a popup, default true
 */
export default class ModifyTouch extends Modify {
    constructor(options?: Options);
    /**
     * Remove the interaction from its current map, if any,  and attach it to a new
     * map, if any. Pass `null` to just remove the interaction from the current map.
     * @param {Map} map Map.
     * @api stable
     */
    setMap(map: _ol_Map_): void;
    /** Activate the interaction and remove popup
     * @param {Boolean} b
     */
    setActive(b: boolean): void;
    /**
     * Remove the current point
     */
    removePoint(): boolean;
    /**
     * Show the delete button (menu)
     * @param {Event} e
     * @api stable
     */
    showDeleteBt(e: PopupEvent): void;
    /**
     * Change the popup content
     * @param {DOMElement} html
     */
    setPopupContent(html: Element): void;
    /**
     * Get the popup content
     * @return {DOMElement}
     */
    getPopupContent(): Element;

    on: ModifyTouchOnSignature<EventsKey>;
    once: ModifyTouchOnSignature<EventsKey>;
    un: ModifyTouchOnSignature<void>;
}

export class PopupEvent extends BaseEvent{
    constructor(
        type: PopupEventType
        );
        feature?: Feature;
        coordinate?: Coordinate;
}

