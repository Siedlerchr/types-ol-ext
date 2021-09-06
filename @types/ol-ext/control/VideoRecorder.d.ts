import { Map as _ol_Map_ } from 'ol';
import ol_control_Control, {Options as ControlOptions} from 'ol/control/Control';

export interface Options extends ControlOptions{
    className?: string;
    frameRate?: number;
    videoBitsPerSecond?: number;
    videoTarget?: Element | string | 'DIALOG'
}

/** Record map canvas as video
 * @constructor
 * @fire start
 * @fire error
 * @fire stop
 * @fire pause
 * @fire resume
 * @extends {ol.control.Control}
 * @param {Object=} options Control options.
 *	@param {String} options.className class of the control
 *	@param {number} [options.framerate=30] framerate for the video
 *	@param {number} [options.videoBitsPerSecond=5000000] bitrate for the video
 *	@param {DOMElement|string} [options.videoTarget] video element or the container to add the video when finished or 'DIALOG' to show it in a dialog, default none
 */
export default class VideoRecorder extends ol_control_Control {
    constructor(options?: Options);
    /**
     * Remove the control from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {ol.Map} map Map.
     * @api stable
     */
    setMap(map: _ol_Map_): void;
    /** Start recording */
    start(): void;
    /** Stop recording */
    stop(): void;
    /** Pause recording */
    pause(): void;
    /** Resume recording after pause */
    resume(): void;
}
