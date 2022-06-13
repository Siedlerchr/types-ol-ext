import ol_Object from 'ol/Object'

declare module 'ol/Map' {
    export default interface Map {
        /** Add a filter to a Map
         *	@param {filter}
         */
        addFilter(filter: Base): void;

        /** Remove a filter to a Map
         *	@param {filter}
         */
        removeFilter(filter: Base): void;

        /** Get filters associated with a Map
         *	@return {Array<filter>}
         */
        getFilters(): Base[];
    }
}

declare module 'ol/layer/Layer' {
    export default interface Layer {
        /** Add a filter to an ol.Layer
         *	@param {filter}
         */
        addFilter(filter: Base): void;

        /** Remove a filter to an ol.Layer
         *	@param {filter}
         */
        removeFilter(filter: Base): void;

        /** Get filters associated with an ol.Layer
         *	@return {Array<filter>}
         */
        getFilters(): Base[];
    }
}

/** Filters are effects that render over a map or a layer.
 * Use the map methods to add or remove filter on a map
 * ({@link Map#addFilter}, {@link Map#removeFilter}, {@link Map#getFilters}).
 * Use the layer methods to add or remove filter on a layer
 * ({@link layer.Base#addFilter}, {@link layer.Base#removeFilter}, {@link layer.Base#getFilters}).
 * @namespace filter
 */

 export interface Options {
    active?: boolean;
 }
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not instantiated in apps.
 * Used to create filters
 * Use {@link _ol_Map_#addFilter}, {@link _ol_Map_#removeFilter} or {@link _ol_Map_#getFilters} to handle filters on a map.
 * Use {@link layer.Base#addFilter}, {@link layer.Base#removeFilter} or {@link layer.Base#getFilters}
 * to handle filters on layers.
 *
 * @constructor
 * @extends {ol_Object}
 * @param {Object} options
 *  @param {boolean} [options.active]
 */
declare abstract class Base extends ol_Object {
    constructor(options: Options);
    /** Activate / deactivate filter
    *	@param {boolean} b
     */
    setActive(b: boolean): void;
    /** Get filter active
    *	@return {boolean}
     */
    getActive(): boolean;
}

export default Base;
