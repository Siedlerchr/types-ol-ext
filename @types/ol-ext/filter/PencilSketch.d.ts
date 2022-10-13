import Base from "./Base";

export interface FilterPencilSketchOptions {
    /**
     * blur value in pixel, default 8
     */
    blur: number;
    /**
     * intensity value [0,1], default .8
     */
    value: number;
}
/** @typedef {Object} FilterPencilSketchOptions
 * @property {number} blur blur value in pixel, default 8
 * @property {number} value intensity value [0,1], default .8
 */
/** Colorize map or layer
 * Original idea: https://www.freecodecamp.org/news/sketchify-turn-any-image-into-a-pencil-sketch-with-10-lines-of-code-cf67fa4f68ce/
 * @constructor
 * @requires ol.filter
 * @extends {ol_filter_Base}
 * @param {FilterPencilSketchOptions} options
 */
export default class PencilSketch extends Base {
    constructor(options?: FilterPencilSketchOptions);

}
