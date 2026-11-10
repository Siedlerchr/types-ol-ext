import type { Map as _ol_Map_ } from 'ol'
import type GeolocationDraw from '../interaction/GeolocationDraw'
import type { Options as BarOptions } from './Bar'
import Bar from './Bar'
import type { GeolocationDrawOptions } from '../interaction/GeolocationDraw'

export interface Options extends BarOptions, Pick<GeolocationDrawOptions, 'source' | 'zoom' | 'minZoom' | 'tolerance' | 'followTrack' | 'minAccuracy'> {
  className?: string;
  centerLabel?: string;
  position?: string;
}

/** Geolocation bar
 * The control bar is a container for other controls. It can be used to create toolbars.
 * Control bars can be nested and combined with ol.control.Toggle to handle activate/deactivate.
 *
 * @constructor
 * @extends {ol_control_Bar}
 */
export default class GeolocationBar extends Bar {
  /**
   * @param {Object=} options Control bar options.
   *  @param {String} options.className class of the control
   *  @param {String} options.centerLabel label for center button, default center
   *  @param {String} options.position position of the control, default bottom-right
   * @param options
   */
  constructor(options?: Options);

  /** Get the GeolocationDraw associatedwith the bar
   * @return {GeolocationDraw}
   */
  getInteraction(): GeolocationDraw;

  /** Attach to or detach from a map. */
  setMap(map: _ol_Map_ | null): void;
}
