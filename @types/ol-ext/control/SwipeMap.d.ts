import { Map as _ol_Map_ } from "ol";
import { Extent } from 'ol/extent';
import ol_control_Control, { Options as ControlOptions } from "ol/control/Control";

export interface Options extends ControlOptions{
    className?: string;
    position?: number[],
    orientation?: 'vertical'| 'horizontal',
    right?: boolean;
}

/** A control that use a CSS clip rect to swipe the map
 * @classdesc Swipe Control.
 * @fires moving
 * @constructor
 * @extends {ol_control_Control}
 * @param {Object=} Control options.
 *  @param {string} options.className control class name
 *  @param {number} options.position position property of the swipe [0,1], default 0.5
 *  @param {string} options.orientation orientation property (vertical|horizontal), default vertical
 *  @param {boolean} options.right true to position map on right side (resp. bottom for horizontal orientation), default false
 */
export default class SwipeMap extends ol_control_Control {
    constructor(options: any);
    /** Set the map instance the control associated with.
     * @param {_ol_Map_} map The map instance.
     */
    setMap(map: _ol_Map_): void;

    /** Get visible rectangle
     * @returns {ol.extent}
     */
    getRectangle(): Extent;

}
