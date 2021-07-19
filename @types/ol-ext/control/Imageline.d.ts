import { Map as _ol_Map_ } from 'ol';
import ol_control_Control, { Options as ControlOptions } from 'ol/control/Control';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import Feature from 'ol/Feature';
import { ObjectEvent } from 'ol/Object';
import { Vector as VectorSource } from 'ol/source';


export interface Options extends ControlOptions {
    className?: string;
    source: VectorSource;
    getImage?: (f: Feature) => string;
    getTitle?: (f: Feature) => string;
    collapsed?: boolean;
    collapsible?: boolean;
    maxFeatures?: number;
    hover?: boolean;
    linkColor?: string | boolean;
}
/** Image line control
 *
 * @constructor
 * @extends {contrControl}
 * @fires select
 * @fires collapse
 * @param {Object=} options Control options.
 *	@param {String} options.className class of the control
 *	@param {VectorSource} options.source a vector source that contains the images
 *	@param {function} options.getImage a function that gets a feature and return the image url, default return the img propertie
 *	@param {function} options.getTitle a function that gets a feature and return the title, default return an empty string
 *	@param {boolean} options.collapsed the line is collapse, default false
 *	@param {boolean} options.collapsible the line is collapsible, default false
 *	@param {number} options.maxFeatures the maximum image element in the line, default 100
 *	@param {boolean} options.hover select image on hover, default false
 *	@param {string|boolean} options.linkColor link color or false if no link, default false
 */
export default class Imageline extends ol_control_Control {
    constructor(options?: Options);
    /**
     * Remove the control from its current map and attach it to the new map.
     * @param {Map} map Map.
     * @api stable
     */
    setMap(map: _ol_Map_): void;
    /** Set useExtent param and refresh the line
     * @param {boolean} b
     */
    useExtent(b: boolean): void;
    /** Is the line collapsed
     * @return {boolean}
     */
    isCollapsed(): boolean;
    /** Collapse the line
     * @param {boolean} b
     */
    collapse(b: boolean): void;
    /** Collapse the line
     */
    toggle(): void;
    /**
     * Get features
     * @return {Array<Feature>}
     */
    getFeatures(): Feature[];
    /**
     * Refresh the imageline with new data
     */
    refresh(): void;
    /** Center image line on a feature
     * @param {feature} feature
     * @param {boolean} scroll scroll the line to center on the image, default true
     * @api
     */
    select(feature: Feature, scroll: boolean): void;

    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;

    on(type: 'select', listener: (evt: ImageLineSelectEvent) => void): EventsKey;
    once(type: 'select', listener: (evt: ImageLineSelectEvent) => void): EventsKey;
    un(type: 'select', listener: (evt: ImageLineSelectEvent) => void): void;

    on(type: 'collapse', listener: (evt: ImageLineCollapseEvent) => void): EventsKey;
    once(type: 'select', listener: (evt: ImageLineCollapseEvent) => void): EventsKey;
    un(type: 'select', listener: (evt: ImageLineCollapseEvent) => void): void;
}
export class ImageLineSelectEvent extends BaseEvent {
    constructor(
        type: 'select',
        feature: Feature
    );
    feature: Feature;
}

export class ImageLineCollapseEvent extends BaseEvent {
    constructor(
        type: 'collapse',
        collapsed: boolean
    );
    collapsed: boolean;
}
