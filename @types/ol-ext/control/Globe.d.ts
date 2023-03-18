import type { Collection, Map as _ol_Map_ } from 'ol'
import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'
import type { Coordinate } from 'ol/coordinate'
import type LayerGroup from 'ol/layer/Group'
import type { Style } from 'ol/style'
import type BaseLayer from 'ol/layer/Base'

export interface Options extends ControlOptions {
  follow?: boolean;
  align: 'top' | 'bottom-left' | 'right';
  layers?: BaseLayer[] | Collection<BaseLayer> | LayerGroup;
  style?: Style | Style[];
}

/**
 * OpenLayers 3 lobe Overview Contr
 * The globe can rotate with map (follow.)
 *
 * @constructor
 * @extends {contrControl}
 */
export default class Globe extends ol_control_Control {
  /**
   * @param {Object=} options Control options.
   *  @param {boolean} follow follow the map when center change, default false
   *  @param {top|bottom-left|right} align position as top-left, etc.
   *  @param {Array<layer>} layers list of layers to display on the globe
   *  @param {Style | Array.<Style> | undefined} style style to draw the position on the map , default a marker
   */
  constructor(options?: Options);

  /**
   * Set the map instance the control associated with.
   * @param {_ol_Map_} map The map instance.
   */
  setMap(map: _ol_Map_): void;

  /** Set the globe center with the map center
   */
  setView(): void;

  /** Get globe map
   *  @return {_ol_Map_}
   */
  getGlobe(): _ol_Map_;

  /** Show/hide the globe
   */
  show(b: boolean): void;

  /** Set position on the map
   *  @param {top|bottom-left|right}  align
   */
  setPosition(align: 'top' | 'bottom-left' | 'right'): void;

  /** Set the globe center
   * @param {Coordinate} center the point to center to
   * @param {boolean} show show a pointer on the map, defaylt true
   */
  setCenter(center?: Coordinate, show?: boolean): void;
}
