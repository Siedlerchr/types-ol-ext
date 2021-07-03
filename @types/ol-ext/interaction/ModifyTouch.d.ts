import { Map as _ol_Map_ } from 'ol';
import { Modify } from 'ol/interaction';
import OverlayPositioning from 'ol/OverlayPositioning';
import BaseEvent from 'ol/events/Event';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';
import { EventsKey } from 'ol/events';
import { ObjectEvent } from 'ol/Object';
import { ModifyEvent } from './ModifyFeature';

export enum PopupEventType {
    SHOWPOPUP = 'showpopup',
    HIDEPOPUP = 'hidepopup'
}
export interface Options {
    title?: string;
    className?: string;
    positioning?: OverlayPositioning;
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

    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'change:active', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:active', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:active', listener: (evt: ObjectEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
    on(type: 'modifyend', listener: (evt: ModifyEvent) => void): EventsKey;
    once(type: 'modifyend', listener: (evt: ModifyEvent) => void): EventsKey;
    un(type: 'modifyend', listener: (evt: ModifyEvent) => void): void;
    on(type: 'modifystart', listener: (evt: ModifyEvent) => void): EventsKey;
    once(type: 'modifystart', listener: (evt: ModifyEvent) => void): EventsKey;
    un(type: 'modifystart', listener: (evt: ModifyEvent) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;

    on(type: 'showpopup', listener: (evt: PopupEvent) => void): EventsKey;
    once(type: 'showpopup', listener: (evt: PopupEvent) => void): EventsKey;
    un(type: 'showpopup', listener: (evt: PopupEvent) => void): void;
    on(type: 'hidepopup', listener: (evt: PopupEvent) => void): EventsKey;
    once(type: 'hidepopup', listener: (evt: PopupEvent) => void): EventsKey;
    un(type: 'hidepopup', listener: (evt: PopupEvent) => void): void;
}

export class PopupEvent extends BaseEvent{
    constructor(
        type: PopupEventType
        );
        feature?: Feature;
        coordinate?: Coordinate;
}

