export default MapZone;

import ol_control_Control from 'ol/control/Control';
import { Extent } from 'ol/extent';
import { Layer } from 'ol/layer';
import { ProjectionLike } from 'ol/proj';
import { Map as _ol_Map_ } from 'ol';

export type Zone = {
    title?: string;
    extent?: Extent;
    map?: _ol_Map_;
    layer?: Layer

}
export interface Options {
    className: string;
    layer: Layer | ((zone: Zone) => Layer)
    projection: ProjectionLike;
    zone: Zone[];
    centerOnClick: boolean;
}
/** A control to jump from one zone to another.
 * @constructor
 * @fires select
 * @extends {ol_control_Control}
 * @param {Object=} options Control options.
 *	@param {string} options.className class name
 *  @param {Array<Zone>} options.zone an array of zone: { name, extent (in EPSG:4326) }
 *	@param {Layer|function} options.layer layer to display in the control or a function that takes a zone and returns a layer to add to the control
 *	@param {ProjectionLike} options.projection projection of the control, Default is EPSG:3857 (Spherical Mercator).
 *  @param {bolean} options.centerOnClick center on click when a zone is clicked (or listen to 'select' event to do something), default true
 */
export declare class MapZone extends ol_control_Control {
    constructor(options?: Options);
    /** Set the control visibility
    * @param {boolean} b
     */
    setVisible(b: boolean): void;
    /** Add a new zone to the control
   * @param {Object} z
   *  @param {string} title
   *  @param {Extent} extent if map is not defined
   *  @param {_ol_Map_} map if map is defined use the map extent
   *  @param {Layer} [layer] layer of the zone, default use default control layer
   */
    addZone(z: Zone): void
    /** Remove a zone from the control
     * @param {number} index
     */
    removeZone(index: number): void
    /** Get control collapsed
    * @return {boolean}
    */
    getCollapsed(): boolean
    /** Get associated maps
     * @return {Array<_ol_Map_>}
     */
    getMaps(): _ol_Map_[]
    /** Get nb zone */
    getLength(): number
}
export namespace MapZone {
    namespace zones {
        const DOM: {
            title: string;
            extent: number[];
        }[];
        const TOM: {
            title: string;
            extent: number[];
        }[];
        const DOMTOM: {
            title: string;
            extent: number[];
        }[];
    }
}
