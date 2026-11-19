import type { Color } from 'ol/color'
import type { Map } from 'ol'
import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'

export interface WindOptions {
  windAngle?: number;
  windSpeed?: number;
}

export interface Options extends ControlOptions, WindOptions {
  hue?: Color;
  saturation?: number;
  opacity?: number;
  density?: number;
  img?: HTMLImageElement;
  bird?: HTMLImageElement;
}

/** ol_control_Cloud adds an old map effect on a canvas renderer.
 * It colors the map, adds a parchment texture and compass onto the map.
 * @constructor
 */
export default class Cloud extends ol_control_Control {
  /**
   * @param {Object} options
   *  @param {_ol_color_} options.hue color to set hue of the map, default #963
   *  @param {Number} options.saturation saturation of the hue color, default 0.6
   *  @param {Number} options.opacity opacity of the overimpose image, default 0.7
   * @todo add effects on pan / zoom change
   */
  constructor(options?: Options);

  setMap(map: Map | null): void;
  setWind(options?: WindOptions): void;
  cloud: HTMLImageElement;
  bird: HTMLImageElement;
  wind: { angle: number; cos: number; sin: number; speed: number };
}
