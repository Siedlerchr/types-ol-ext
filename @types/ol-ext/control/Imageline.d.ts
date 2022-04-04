import { Map as _ol_Map_ } from 'ol';
import ol_control_Control, { Options as ControlOptions } from 'ol/control/Control';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import Feature from 'ol/Feature';
import { ObjectEvent } from 'ol/Object';
import { Vector as VectorSource } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable';
import { Types } from 'ol/ObjectEventType';
import { Geometry } from 'ol/geom';

type ImageLineOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'select', ImageLineSelectEvent, Return> &
  OnSignature<Types | 'collapse', ImageLineCollapseEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'error' | 'propertychange' | 'select' | 'collapse', Return>;
export interface Options extends ControlOptions {
    className?: string;
    source?: VectorSource;
    layers?: VectorLayer<VectorSource<Geometry>>[];
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
 * @extends {ol.control.Control}
 * @fires select
 * @fires collapse
 * @param {Object=} options Control options.
 *	@param {String} options.className class of the control
 *	@param {Array<ol.source.Vector>|ol.source.Vector} options.source vector sources that contains the images
 *	@param {Array<ol.layer.Vector>} options.layers A list of layers to display images. If no source and no layers, all visible layers will be considered.
 *	@param {function} options.getImage a function that gets a feature and return the image url or false if no image to Show, default return the img propertie
 *	@param {function} options.getTitle a function that gets a feature and return the title, default return an empty string
 *	@param {boolean} options.collapsed the line is collapse, default false
 *	@param {boolean} options.collapsible the line is collapsible, default false
 *	@param {number} options.maxFeatures the maximum image element in the line, default 100
 *	@param {number} options.useExtent only show feature in the current extent
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
    select(feature: Feature, scroll?: boolean): void;

    on: ImageLineOnSignature<EventsKey>;
    once: ImageLineOnSignature<EventsKey>;
    un: ImageLineOnSignature<void>;
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
