import { Map as _ol_Map_ } from 'ol';
import ol_control_Control from 'ol/control/Control';
import { Coordinate } from 'ol/coordinate';
import { ControlOptions } from './control';

export interface Options extends ControlOptions {
    target?: HTMLElement | string;
}

/**
 * OpenLayers 3 lobe Overview Contr
 * The globe can rotate with map (follow.)
 *
 * @constructor
 * @extends {contrControl}
 * @param {Object=} options Control options.
 * 	@param {boolean} follow follow the map when center change, default false
 * 	@param {top|bottom-left|right} align position as top-left, etc.
 * 	@param {Array<layer>} layers list of layers to display on the globe
 * 	@param {Style | Array.<Style> | undefined} style style to draw the position on the map , default a marker
 */
export default class Globe extends ol_control_Control {
    constructor(options?: ControlOptions);
    /**
     * Set the map instance the control associated with.
     * @param {_ol_Map_} map The map instance.
     */
    setMap(map: _ol_Map_): void;
    /** Set the globe center with the map center
     */
    setView(): void;
    /** Get globe map
    *	@return {_ol_Map_}
     */
    getGlobe(): _ol_Map_;
    /** Show/hide the globe
     */
    show(b: boolean): void;
    /** Set position on the map
    *	@param {top|bottom-left|right}  align
     */
    setPosition(align: 'top' | 'bottom-left' | 'right'): void;
    /** Set the globe center
    * @param {Coordinate} center the point to center to
    * @param {boolean} show show a pointer on the map, defaylt true
     */
    setCenter(center?: Coordinate, show?: boolean): void;
}
