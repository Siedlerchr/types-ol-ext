import { Map as _ol_Map_ } from "ol";
import { Extent } from 'ol/extent';
import ol_control_Control, { Options as ControlOptions } from "ol/control/Control";
import { Layer } from "ol/layer";
import { position } from '../../../npm/control/Timeline';

export interface Options extends ControlOptions{
    layer?: Layer;
    rightLayer?: Layer;
    className?: string;
    position?: number[],
    orientaton?: 'vertical'| 'horizontal'
}

/** A control that use a CSS clip rect to swipe the map
 * @classdesc Swipe Control.
 * @fires moving
 * @constructor
 * @extends {ol_control_Control}
 * @param {Object=} Control options.
 *  @param {ol.layer} options.layers layer to swipe
 *  @param {ol.layer} options.rightLayer layer to swipe on right side
 *  @param {string} options.className control class name
 *  @param {number} options.position position propertie of the swipe [0,1], default 0.5
 *  @param {string} options.orientation orientation propertie (vertical|horizontal), default vertical
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
