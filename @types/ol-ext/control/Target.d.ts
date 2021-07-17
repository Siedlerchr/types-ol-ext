import { Map as _ol_Map_ } from 'ol';
import { Style } from 'ol/style';
import { Options as ControlOptions } from 'ol/control/Control';

import CanvasBase from './CanvasBase';

export interface Options extends ControlOptions {
    style: Style | Style[]; //not compatible with CanvasBase
    composite: string; //In globalCompositeOperation in TS is also string
}
/** contrTarget draw a target at the center of the map.
 * @constructor
 * @extends {contrCanvasBase}
 * @param {Object} options
 *  @param {Style|Array<Style>} options.style
 *  @param {string} options.composite composite operation = difference|multiply|xor|screen|overlay|darken|lighter|lighten|...
 */
export default class Target extends CanvasBase {
    constructor(options: Options);
    /** Set the control visibility
     * @paraam {boolean} b
     */
    setVisible(): void;
    /** Get the control visibility
     * @return {boolean} b
     */
    getVisible(): boolean;
    /**
     * Remove the control from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {_ol_Map_} map Map.
     * @api stable
     */
    setMap(map: _ol_Map_): void;
}
