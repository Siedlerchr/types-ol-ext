import { Interaction } from 'ol/interaction'
import type Map from 'ol/Map'
import type { FrameState } from 'ol/Map'
import type { Pixel } from 'ol/pixel'
import type { Coordinate } from 'ol/coordinate'

/** Event sent to the callback and dispatched on the map after a long touch. */
export interface LongTouchEvent {
  type: 'longtouch';
  originalEvent: PointerEvent;
  frameState: FrameState | null;
  pixel: Pixel;
  coordinate: Coordinate;
  map: Map | null;
}

export interface Options {
  handleLongTouchEvent?: (evt: LongTouchEvent) => void;
  pixelTolerance?: number;
  delay?: number;
}

/** Interaction to handle longtouch events
 * @constructor
 * @extends {ol_interaction_Interaction}

 */
export default class LongTouch extends Interaction {
  /**
   * @param {olx.interaction.LongTouchOptions}
   *  @param {function | undefined} options.handleLongTouchEvent Function handling 'longtouch' events, it will receive a mapBrowserEvent. Or listen to the map 'longtouch' event.
   *  @param {integer | undefined} [options.pixelTolerance=0] pixel tolerance before drag, default 0
   *  @param {integer | undefined} [options.delay=1000] The delay for a long touch in ms, default is 1000
   */
  constructor(options?: Options);
}
