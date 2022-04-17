import { Map as _ol_Map_, MapBrowserEvent } from 'ol';
import { Interaction } from 'ol/interaction';
import Event from 'ol/events/Event';
import Feature from 'ol/Feature';
import { Layer } from 'ol/layer';
import BaseEvent from 'ol/events/Event';
import Collection from 'ol/Collection';
import { Pixel } from 'ol/pixel';
import { Coordinate } from 'ol/coordinate';
import { Geometry } from 'ol/geom';
import { EventsKey } from 'ol/events';
import { ObjectEvent } from 'ol/Object';
import { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable';
import { Types } from 'ol/ObjectEventType';

type HoverOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'hover' | 'enter' | 'leave', HoverEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'hover' | 'enter' | 'leave', Return>;

export enum HoverEventType {
    HOVER = 'hover',
    ENTER = 'enter',
    LEAVE = 'leave'
}


export interface Options {
    cursor?: string;
    featureFilter?: (feature: Feature, layer: Layer) => boolean;
    layerFilter?: (feature: Feature) => boolean;
    hitTolerance?: number;
    handleEvent: (p0: MapBrowserEvent<UIEvent>) => boolean;
}
/** Interaction hover do to something when hovering a feature
 * @constructor
 * @extends {ol_interaction_Interaction}
 * @fires hover, enter, leave
 * @param {olx.interaction.HoverOptions}
 *  @param { string | undefined } options.cursor css cursor propertie or a function that gets a feature, default: none
 *  @param {function | undefined} options.featureFilter filter a function with two arguments, the feature and the layer of the feature. Return true to select the feature
 *  @param {function | undefined} options.layerFilter filter a function with one argument, the layer to test. Return true to test the layer
 *  @param {Array<ol.layer> | undefined} options.layers a set of layers to test
 *  @param {number | undefined} options.hitTolerance Hit-detection tolerance in pixels.
 *  @param { function | undefined } options.handleEvent Method called by the map to notify the interaction that a browser event was dispatched to the map. The function may return false to prevent the propagation of the event to other interactions in the map's interactions chain.
 */
export default class Hover extends Interaction {
    constructor(options?: Options);
    /**
     * Remove the interaction from its current map, if any,  and attach it to a new
     * map, if any. Pass `null` to just remove the interaction from the current map.
     * @param {Map} map Map.
     * @api stable
     */
    setMap(map: _ol_Map_): void;
    /**
     * Set cursor on hover
     * @param { string } cursor css cursor propertie or a function that gets a feature, default: none
     * @api stable
     */
    setCursor(cursor?: string): void;
    /** Feature filter to get only one feature
    * @param {function} filter a function with two arguments, the feature and the layer of the feature. Return true to select the feature
     */
    setFeatureFilter(filter: (feature: Feature, layer: Layer) => boolean): void;
    /** Feature filter to get only one feature
    * @param {function} filter a function with one argument, the layer to test. Return true to test the layer
     */
    setLayerFilter(filter: (layer: Layer) => boolean): void;

    /** Activate / deactivate interaction
     * @param {boolean} b
     */
    setActive(b: boolean): void

    on: HoverOnSignature<EventsKey>;
    once: HoverOnSignature<EventsKey>;
    un: HoverOnSignature<void>;
}

export class HoverEvent extends BaseEvent {
    constructor(
        type: HoverEventType,
        feature: Feature<Geometry>,
        layer: Layer,
        coordinate: Coordinate,
        pixel: Pixel,
        map: _ol_Map_,
        originalEvent: BaseEvent,
        dragging: any //TODO
    );
        layer: Layer;
        coordinate: Coordinate;
        pixel: Pixel;
        map: _ol_Map_;
        originalEvent: BaseEvent;
        dragging: any //TODO
}
