import ol_control_Control, { Options as ControlOptions } from 'ol/control/Control';

export interface Options extends ControlOptions {
    className?: string;
    title?: string
    imageType?: string;
    quality?: number;
    orientation?: 'landscape' | 'portrait';
    immediate?: boolean
}

export interface PrintOptions {
    imageType: string;
    quality: number;
    immediate: boolean;
    size?: boolean | undefined;
    format?: boolean | undefined;
    orient?: boolean | undefined;
    margin?: boolean | undefined;
    any: any
}

/** Print control to get an image of the map
 * @constructor
 * @fire print
 * @fire error
 * @fire printing
 * @extends {ol.control.Control}
 * @param {Object=} options Control options.
 *	@param {String} options.className class of the control
  *	@param {String} options.title button title
 *	@param {string} options.imageType A string indicating the image format, default image/jpeg
 *	@param {number} options.quality Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp
 *	@param {string} options.orientation Page orientation (landscape/portrait), default guest the best one
 *	@param {boolean} options.immediate force print even if render is not complete,  default false
 */
export default class Print extends ol_control_Control {
    constructor(options?: Options);

      /** Print the map
   * @param {Object} options
   *	@param {string} options.imageType A string indicating the image format, default the control one
   *	@param {number} options.quality Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp
   *  @param {boolean} options.immediate true to prevent delay for printing
   *  @param {boolean} [options.size=[210,297]]
   *  @param {boolean} [options.format=a4]
   *  @param {boolean} [options.orient] default control orientation
   *  @param {boolean} [options.margin=10]
   *  @param {*} options.any any options passed to the print event when fired
   * @api
   */
    print(options?: PrintOptions): void

    /** Fast print
     * @param {*} options print options
     *  @param {HTMLCanvasElement|undefined} [options.canvas] if none create one, only for ol@6+
     *  @parama {string} options.imageType
     */
    fastPrint(options: PrintOptions & {
        canvas?: HTMLCanvasElement
    }, callback: (elem: HTMLCanvasElement) => void): void;

    /** Helper function to copy result to clipboard
   * @param {any} options print options
   * @param {function} callback a callback function that takes a boolean if copy
   */
    copyMap(options?: PrintOptions, callback?: (result: boolean) => void): void
}
