import ol_control_Control from 'ol/control/Control';
import Feature from 'ol/Feature';
import { Geometry } from 'ol/geom';
import { Style } from 'ol/style';
import { Coordinate } from 'ol/coordinate';
import { ProjectionLike } from 'ol/proj';

export interface Options {
    className: string;
    style: Style;
    info: { [key: string]: any }
    width: number;
    height: number;
    feature: Feature
    selectable: boolean;
    zoomable: boolean;
}

/**
 * @classdesc OpenLayers 3 Profil Control.
 * Draw a profile of a feature (with a 3D geometry)
 *
 * @constructor
 * @extends {ol_control_Control}
 * @fires over
 * @fires out
 * @fires show
 * @fires dragstart
 * @fires dragging
 * @fires dragend
 * @fires dragcancel
 * @param {Object=} options
 *  @param {string} options.className
 *  @param {Style} options.style style to draw the profil
 *  @param {*} options.info keys/values for i18n
 *  @param {number} options.width
 *  @param {number} options.height
 *  @param {Feature} options.feature the feature to draw profil
 *  @param {boolean} options.selectable enable selection on the profil, default false
 *  @param {boolean} options.zoomable can zoom in the profil
 */
export default class Profil extends ol_control_Control {
    constructor(options: any);

    /** Show popup info
     * @param {string} info to display as a popup
     * @api stable
     */
    popup(info: string): void;
    /** Show point at coordinate or a distance on the profil
    * @param { Coordinate|number } where a coordinate or a distance from begining, if none it will hide the point
    * @return {Coordinate} current point
    */
    showAt(where: Coordinate | number | number): Coordinate;
    /** Show point at a time on the profil
       * @param { Date|number } time a Date or a DateTime (in s) to show the profile on, if none it will hide the point
       * @param { boolean } delta true if time is a delta from the start, default false
       * @return { Coordinate } current point
       */
    showAtTime(time: Date | number, delta: boolean): Coordinate;
    /** Get the point at a given time on the profil
     * @param { number } time time at which to show the point
     * @return { Coordinate } current point
     */

    /** Mouse move over canvas
  */
    onMove(e: any): void;

    /** Show panel
* @api stable
*/
    show(): void;
    /** Hide panel
    * @api stable
    */
    hide(): void;
    /** Toggle panel
    * @api stable
    */
    toggle(): void;
    /** Is panel visible
    */
    isShown(): boolean;
    /** Get selection
     * @param {number} starting point
     * @param {number} ending point
     * @return {Array<Coordinate>}
     */
    getSelection(start: number, end: number): Coordinate[];
    /**
   * Set the geometry to draw the profil.
   * @param {Feature|Geometry} f the feature.
   * @param {Object=} options
   *  @param {ProjectionLike} options.projection feature projection, default projection of the map
   *  @param {string} options.zunit 'm' or 'km', default m
   *  @param {string} options.unit 'm' or 'km', default km
   *  @param {Number|undefined} options.zmin default 0
   *  @param {Number|undefined} options.zmax default max Z of the feature
   *  @param {Number|undefined} options.graduation z graduation default 100
   *  @param {integer|undefined} options.amplitude amplitude of the altitude, default zmax-zmin
   * @api stable
   */
    setGeometry(f: Feature | Geometry, options?: {
        projection?: ProjectionLike;
        zunit?: 'm' | 'km';
        unit?: 'm' | 'km'
        zmin?: number
        zmax?: number;
        graduation?: number
        amplitude?: number
    }): void;
}
