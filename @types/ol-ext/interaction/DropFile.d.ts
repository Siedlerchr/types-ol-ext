import Projection from 'ol/proj/Projection';
import { DragAndDrop } from 'ol/interaction';
import FeatureFormat from 'ol/format/Feature';
import { Map as _ol_Map_ } from 'ol';

export interface Options {
    zone?: string;
    projection?: Projection;
    formatConstructors?: FeatureFormat[];
    accept?: string[];
}
/** Extend DragAndDrop choose drop zone + fires loadstart, loadend
 * @constructor
 * @extends {ol_interaction_DragAndDrop}
 * @fires loadstart, loadend, addfeatures
 * @param {*} options
 *  @param {string} options.zone selector for the drop zone, default document
 *  @param{ol.projection} options.projection default projection of the map
 *  @param {Array<function(new:ol.format.Feature)>|undefined} options.formatConstructors Format constructors, default [ ol.format.GPX, ol.format.GeoJSONX, ol.format.GeoJSONP, ol.format.GeoJSON, ol.format.IGC, ol.format.KML, ol.format.TopoJSON ]
 *  @param {Array<string>|undefined} options.accept list of accepted format, default ["gpx","json","geojsonx","geojsonp","geojson","igc","kml","topojson"]
 */
export default class DropFile extends DragAndDrop {
    constructor(options: Options);
    /** Set the map
     */
    setMap(map: _ol_Map_): void;
    /** Do somthing when over
     */
    onstop(e: Event): void;
    /** Do something when over
     */
    ondrop(e: Event): void;
}
