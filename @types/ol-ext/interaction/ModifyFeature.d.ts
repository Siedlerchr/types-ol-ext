import { Map as _ol_Map_ } from 'ol';
import Collection from 'ol/Collection';
import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature';
import { Style } from 'ol/style';
import GeometryType from 'ol/geom/GeometryType';
import { Pointer } from 'ol/interaction';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { Condition as EventsConditionType } from 'ol/events/condition';
import { Vector as VectorSource } from 'ol/source';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import { ObjectEvent } from 'ol/Object';
import { ModifyEventType } from 'ol/interaction/Modify';
import Geometry from 'ol/geom/Geometry';

export enum ModifyingEventType {
    MODIFYING = 'modifying'
}

export interface Options {
    source? : VectorSource;
    features?: Collection<Feature>;
    pixelTolerance?: number;
    filter?: (feature: Feature) => boolean;
    style?: Style | Style[] ;
    condition?: EventsConditionType ;
    deleteCondition?: EventsConditionType;
    insertVertexCondition?: EventsConditionType;
    wrapX?: boolean;
}
/** Interaction for modifying feature geometries. Similar to the core ol/interaction/Modify.
 * The interaction is more suitable to use to handle feature modification: only features concerned
 * by the modification are passed to the events (instead of all feature with ol/interaction/Modify)
 * - the modifystart event is fired before the feature is modified (no points still inserted)
 * - the modifyend event is fired after the modification
 * - it fires a modifying event
 * @constructor
 * @extends {ol_interaction_Pointer}
 * @fires modifystart
 * @fires modifying
 * @fires modifyend
 * @fires select
 * @param {*} options
 *	@param {ol.source.Vector} options.source a source to modify (configured with useSpatialIndex set to true)
 *	@param {ol.source.Vector|Array<ol.source.Vector>} options.sources a list of source to modify (configured with useSpatialIndex set to true)
 *  @param {ol.Collection.<ol.Feature>} options.features collection of feature to modify
 *  @param {integer} options.pixelTolerance Pixel tolerance for considering the pointer close enough to a segment or vertex for editing. Default is 10.
 *  @param {function|undefined} options.filter a filter that takes a feature and return true if it can be modified, default always true.
 *  @param {ol.style.Style | Array<ol.style.Style> | undefined} options.style Style for the sketch features.
 *  @param {ol.EventsConditionType | undefined} options.condition A function that takes an ol.MapBrowserEvent and returns a boolean to indicate whether that event will be considered to add or move a vertex to the sketch. Default is ol.events.condition.primaryAction.
 *  @param {ol.EventsConditionType | undefined} options.deleteCondition A function that takes an ol.MapBrowserEvent and returns a boolean to indicate whether that event should be handled. By default, ol.events.condition.singleClick with ol.events.condition.altKeyOnly results in a vertex deletion.
 *  @param {ol.EventsConditionType | undefined} options.insertVertexCondition A function that takes an ol.MapBrowserEvent and returns a boolean to indicate whether a new vertex can be added to the sketch features. Default is ol.events.condition.always
 *  @param {boolean} options.wrapX Wrap the world horizontally on the sketch overlay, default false
 */
export default class ModifyFeature extends Pointer {
    constructor(options?: Options);
    /**
     * Remove the interaction from its current map, if any,  and attach it to a new
     * map, if any. Pass `null` to just remove the interaction from the current map.
     * @param {Map} map Map.
     * @api stable
     */
    setMap(map: _ol_Map_): void;
    /**
     * Activate or deactivate the interaction + remove the sketch.
     * @param {boolean} active.
     * @api stable
     */
    setActive(active: boolean): void;
    /** Get nearest coordinate in a list
    * @param {Coordinate} pt the point to find nearest
    * @param {geom} coords list of coordinates
    * @return {*} the nearest point with a coord (projected point), dist (distance to the geom), ring (if Polygon)
     */
    getNearestCoord(pt: Coordinate, coords: GeometryType): {
        coord: Coordinate,
        dist: number,
        ring?: number
        pt?:  Coordinate,
    } | false;
    /** Get arcs concerned by a modification
     * @param {geom} geom the geometry concerned
     * @param {Coordinate} coord pointed coordinates
     */
    getArcs(geom: GeometryType, coord: Coordinate): void;
    /**
     * @param {MapBrowserEvent} evt Map browser event.
     * @return {boolean} `true` to start the drag sequence.
     */
    handleDownEvent(evt: MapBrowserEvent): boolean;
    /** Get modified features
     * @return {Array<Feature>} list of modified features
     */
    getModifiedFeatures(): Feature[];
    /** Removes the vertex currently being pointed.
     */
    removePoint(): void;

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
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
    on(type: 'modifyend', listener: (evt: ModifyEvent) => void): EventsKey;
    once(type: 'modifyend', listener: (evt: ModifyEvent) => void): EventsKey;
    un(type: 'modifyend', listener: (evt: ModifyEvent) => void): void;
    on(type: 'modifystart', listener: (evt: ModifyEvent) => void): EventsKey;
    once(type: 'modifystart', listener: (evt: ModifyEvent) => void): EventsKey;
    un(type: 'modifystart', listener: (evt: ModifyEvent) => void): void;
    on(type: 'modifying', listener: (evt: ModifyEvent) => void): EventsKey;
    once(type: 'modifying', listener: (evt: ModifyEvent) => void): EventsKey;
    un(type: 'modifying', listener: (evt: ModifyEvent) => void): void;
}
export class ModifyEvent extends BaseEvent {
    constructor(
        type: ModifyEventType | ModifyingEventType,
        features: Collection<Feature<Geometry>>,
        MapBrowserEvent: MapBrowserEvent<UIEvent>,
    );
    /**
     * The features being modified.
     */
    features: Collection<Feature<Geometry>>;
    /**
     * Associated {@link module:ol/MapBrowserEvent}.
     */
    mapBrowserEvent: MapBrowserEvent<UIEvent>;
}
