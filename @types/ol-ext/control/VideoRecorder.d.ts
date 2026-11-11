import type { Map as _ol_Map_ } from 'ol'
import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { ObjectEvent } from 'ol/Object'
import type { Types } from 'ol/ObjectEventType'

export interface VideoStartEvent extends BaseEvent { type: 'start'; canvas: HTMLCanvasElement }
export interface VideoStopEvent extends BaseEvent { type: 'stop'; videoURL: string }
export interface VideoErrorEvent extends BaseEvent { type: 'error'; error: unknown }
export type VideoRecorderOnSignature<Return> = OnSignature<'error', VideoErrorEvent, Return> &
  OnSignature<EventTypes, BaseEvent, Return> & OnSignature<Types | 'change' | 'propertychange', ObjectEvent, Return> &
  OnSignature<'start', VideoStartEvent, Return> & OnSignature<'stop', VideoStopEvent, Return> &
  OnSignature<'pause' | 'resume', BaseEvent, Return> &
  CombinedOnSignature<EventTypes | Types | 'change' | 'propertychange' | 'start' | 'stop' | 'pause' | 'resume', Return>

export interface Options extends ControlOptions {
  className?: string;
  frameRate?: number;
  framerate?: number;
  videoBitsPerSecond?: number;
  videoTarget?: Element | string | 'DIALOG';
}

/** Record map canvas as video
 * @constructor
 * @fire start
 * @fire error
 * @fire stop
 * @fire pause
 * @fire resume
 * @extends {ol.control.Control}

 */
export default class VideoRecorder extends ol_control_Control {
  /**
   * @param {Object=} options Control options.
   *  @param {String} options.className class of the control
   *  @param {number} [options.framerate=30] framerate for the video
   *  @param {number} [options.videoBitsPerSecond=5000000] bitrate for the video
   *  @param {DOMElement|string} [options.videoTarget] video element or the container to add the video when finished or 'DIALOG' to show it in a dialog, default none
   */
  constructor(options?: Options);

  on: VideoRecorderOnSignature<EventsKey>;
  once: VideoRecorderOnSignature<EventsKey>;
  un: VideoRecorderOnSignature<void>;
  tips: Record<'start' | 'stop' | 'pause' | 'resume', string>;

  /** Set the title of a start, stop, pause, or resume button. */
  setTooltip(button: 'start' | 'stop' | 'pause' | 'resume', title: string): void;

  /**
   * Remove the control from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {ol.Map} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_ | null): void;

  /** Start recording */
  start(): void;

  /** Stop recording */
  stop(): void;

  /** Pause recording */
  pause(): void;

  /** Resume recording after pause */
  resume(): void;
}
