import { CoordinateFormat } from "ol/coordinate";
import { ProjectionLike } from "ol/proj";
import { Color } from 'ol/color';
export interface Options {
    hue: Color
    saturation: number
    opacity: number
}
/** ol_control_Cloud adds an old map effect on a canvas renderer.
* It colors the map, adds a parchment texture and compass onto the map.
* @constructor
* @param {Object} options
*	@param {_ol_color_} options.hue color to set hue of the map, default #963
*	@param {Number} options.saturation saturation of the hue color, default 0.6
*	@param {Number} options.opacity opacity of the overimpose image, default 0.7
* @todo add effects on pan / zoom change
*/
export default class Cloud {
    constructor(options?: Options);
}

