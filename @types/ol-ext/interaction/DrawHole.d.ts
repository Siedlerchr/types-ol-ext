import { Map as _ol_Map_ } from 'ol';
import Feature from 'ol/Feature';
import { Vector } from 'ol/layer';
import { StyleLike } from 'ol/style/Style';
import { Draw, Interaction } from 'ol/interaction';
import Collection from 'ol/Collection';
import Layer from 'ol-ext/filter/Base';
import { EventsKey } from 'ol/events';
import { ModifyEvent } from 'ol/interaction/Modify';
import BaseEvent from 'ol/events/Event';
import { DrawEvent } from 'ol/interaction/Draw';
import { ObjectEvent } from 'ol/Object';

export interface Options {
    layers?: Vector[] | ((...params: any[]) => any);
    features?: Feature[] | Collection<Feature> | ((feature: Feature, layer: Layer) => boolean)
    style?: StyleLike
}
/** Interaction to draw holes in a polygon.
 * It fires a drawstart, drawend event when drawing the hole
 * and a modifystart, modifyend event before and after inserting the hole in the feature geometry.
 * @constructor
 * @extends {ol_interaction_Interaction}
 * @fires drawstart
 * @fires drawend
 * @fires modifystart
 * @fires modifyend
 * @param {olx.interaction.DrawHoleOptions} options extend olx.interaction.DrawOptions
 * 	@param {Array<ol.layer.Vector> | function | undefined} options.layers A list of layers from which polygons should be selected. Alternatively, a filter function can be provided. default: all visible layers
 * 	@param {Array<ol.Feature> | ol.Collection<ol.Feature> | function | undefined} options.features An array or a collection of features the interaction applies on or a function that takes a feature and a layer and returns true if the feature is a candidate
 * 	@param { ol.style.Style | Array<ol.style.Style> | StyleFunction | undefined }	Style for the selected features, default: default edit style
 */
export default class DrawHole extends Draw {
    constructor(options?: Options);
    /**
     * Remove the interaction from its current map, if any,  and attach it to a new
     * map, if any. Pass `null` to just remove the interaction from the current map.
     * @param {Map} map Map.
     * @api stable
     */
    setMap(map: _ol_Map_): void;
    /**
     * Activate/deactivate the interaction
     * @param {boolean}
     * @api stable
     */
    setActive(b: boolean): void;
    /**
     * Remove last point of the feature currently being drawn
     * (test if points to remove before).
     */
    removeLastPoint(): void;
    /**
     * Get the current polygon to hole
     * @return {Feature}
     */
    getPolygon(): Feature;
    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'change:active', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:active', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:active', listener: (evt: ObjectEvent) => void): void;
    on(type: 'drawabort', listener: (evt: DrawEvent) => void): EventsKey;
    once(type: 'drawabort', listener: (evt: DrawEvent) => void): EventsKey;
    un(type: 'drawabort', listener: (evt: DrawEvent) => void): void;
    on(type: 'drawend', listener: (evt: DrawEvent) => void): EventsKey;
    once(type: 'drawend', listener: (evt: DrawEvent) => void): EventsKey;
    un(type: 'drawend', listener: (evt: DrawEvent) => void): void;
    on(type: 'drawstart', listener: (evt: DrawEvent) => void): EventsKey;
    once(type: 'drawstart', listener: (evt: DrawEvent) => void): EventsKey;
    un(type: 'drawstart', listener: (evt: DrawEvent) => void): void;
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
}
