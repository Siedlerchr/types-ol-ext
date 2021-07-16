import { Map as _ol_Map_ } from 'ol';
import Collection from 'ol/Collection';
import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature';
import CanvasBase, { Options as CanvasOptions } from './CanvasBase';
import { Style, Stroke, Fill } from 'ol/style';
import { Extent } from 'ol/extent';
import { Size } from 'ol/size';
import { Vector as VectorSource } from 'ol/source';
import { EventsKey } from 'ol/events';
import { SelectEvent } from 'ol/interaction/Select';
import BaseEvent from 'ol/events/Event';
import { ObjectEvent } from 'ol/Object';

export enum GridReferenceEventType {
    SELECT = 'select'
}

export interface Options extends CanvasOptions {
    style?: Style;
    maxResolution?: number;
    Extent?: Extent;
    Size?: Size;
    margin?: number;
    source?: VectorSource;
    property?: string | ((feature: Feature) => string)
    sortFeature: (a: Feature, b: Feature) => number
    indexTitle?: (feature: Feature) => string;
    filterLabel?: string
}

/**
 * Draw a grid reference on the map and add an index.
 *
 * @constructor
 * @extends {contrCanvasBase}
 * @fires select
 * @param {Object=} options
 *  @param {Style} options.style Style to use for drawing the grid (stroke and text), default black.
 *  @param {number} options.maxResolution max resolution to display the graticule
 *  @param {Extent} options.Extent Extent of the grid, required
 *  @param {Size} options.Size number of lines and cols, required
 *  @param {number} options.margin margin to display text (in px), default 0px
 *  @param {VectorSource} options.source source to use for the index, default none (use setIndex to reset the index)
 *  @param {string | function} options.property a property to display in the index or a function that takes a feature and return the name to display in the index, default 'name'.
 *  @param {function|undefined} options.sortFeatures sort function to sort 2 features in the index, default sort on property option
 *  @param {function|undefined} options.indexTitle a function that takes a feature and return the title to display in the index, default the first letter of property option
 *  @param {string} options.filterLabel label to display in the search bar, default 'filter'
 */
export default class GridReference extends CanvasBase {
    constructor(Control?: Options);
    /** Returns the text to be displayed in the index
     * @param {Feature} f the feature
     * @return {string} the text to be displayed in the index
     * @api
     */
    getFeatureName(f: Feature): string;
    /** Sort function
     * @param {Feature} a first feature
     * @param {Feature} b second feature
     * @return {Number} 0 if a==b, -1 if a<b, 1 if a>b
     * @api
     */
    sortFeatures(a: Feature, b: Feature): number;
    /** Get the feature title
     * @param {Feature} f
     * @return the first letter of the feature name (getFeatureName)
     * @api
     */
    indexTitle(f: Feature): string;
    /** Display features in the index
     * @param { Array<Feature> | Collection<Feature> } features
     */
    setIndex(features: Feature[] | Collection<Feature>): void;
    /** Get reference for a coord
    *	@param {Coordinate} coords
    *	@return {string} the reference
     */
    getReference(coords: Coordinate): string;
    /**
     * Remove the control from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {_ol_Map_} map Map.
     * @api stable
     */
    setMap(map: _ol_Map_): void;
    /** Get canvas overlay
     */
    getCanvas(): HTMLCanvasElement;
    /** Set Style
     * @api
     */
    setStyle(): void;
    /** Get style
     * @api
     */
    getStyle(): Style;
    /** Get stroke
     * @api
     */
    getStroke(): Stroke;
    /** Get fill
     * @api
     */
    getFill(): Fill;
    /** Get stroke
     * @api
     */
    getTextStroke(): Stroke;
    /** Get text fill
     * @api
     */
    getTextFill(): Fill;
    /** Get text font
     * @api
     */
    getTextFont(): string;

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

    on(type: 'select', listener: (evt: GridReferenceSelectEvent) => void): EventsKey;
    once(type: 'select', listener: (evt: GridReferenceSelectEvent) => void): EventsKey;
    un(type: 'select', listener: (evt: GridReferenceSelectEvent) => void): void;
}

export class GridReferenceSelectEvent extends BaseEvent {
    constructor(
        type: GridReferenceEventType,
        feature: Feature
    );

    feature: Feature;
}
