import ol_control_Control from 'ol/control/Control';

export interface Options {
    className: string;
    imageType?: string;
    quality?: number;
    orientation?: 'landscape' | 'portrait';
    immediate?: boolean
}
/** Print control to get an image of the map
 * @constructor
 * @fire print
 * @fire error
 * @fire printing
 * @extends {ol_control_Control}
 * @param {Object=} options Control options.
 *	@param {String} options.className class of the control
 *	@param {string} options.imageType A string indicating the image format, default image/jpeg
 *	@param {number} options.quality Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp
 *	@param {string} options.orientation Page orientation (landscape/portrait), default guest the best one
 *	@param {boolean} options.immediate force print even if render is not complete,  default false
 */
export default class Print extends ol_control_Control {
    constructor(options?: Options);

    /** Print the map
     * @param {function} cback a callback function that take a string containing the requested data URI.
     * @param {Object} options
     *	@param {string} options.imageType A string indicating the image format, default the control one
     *	@param {number} options.quality Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp
     *  @param {boolean} options.immediate true to prevent delay for printing
     *  @param {Array<Number>} [options.size=[210,297]]
     *  @param {string} [options.format=a4]
     *  @param {string} [options.orient] default control orientation
     *  @param {number} [options.margin=10]
     *  @param {*} options.any any options passed to the print event when fired
     * @api
     */
    print(cback: (s: String) => any, options: { //TODO: Something is wrong with the callback
        imageType?: string;
        quality?: number;
        immediate?: boolean;
        size?: number[];
        format: string;
        orient: string;
        margin: number;
        any: any;
    }): void;
}
