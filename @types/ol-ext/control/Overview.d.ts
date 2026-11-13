import type { Collection, Map as _ol_Map_ } from 'ol'
import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'
import type BaseLayer from 'ol/layer/Base'
import type LayerGroup from 'ol/layer/Group'
import type { ProjectionLike } from 'ol/proj'
import type { Style } from 'ol/style'

export interface Options extends ControlOptions {
  projection?: ProjectionLike;
  minZoom?: number;
  maxZoom?: number;
  rotation?: boolean;
  align?: string;
  layers?: BaseLayer[] | Collection<BaseLayer> | LayerGroup;
  style?: Style | Style[];
  panAnimation?: boolean | 'elastic';
  elasticPan?: boolean;
}

/**
 * OpenLayers 3 Layer Overview Control.
 * The overview can rotate with map.
 * Zoom levels are configurable.
 * Click on the overview will center the map.
 * Change width/height of the overview trough css.
 *
 * @constructor
 * @extends {ol_control_Control}
 */
export default class Overview extends ol_control_Control {
  /**
   * @param {Object=} options Control options.
   *  @param {ol.ProjectionLike} options.projection The projection. Default is EPSG:3857 (Spherical Mercator).
   *  @param {Number} options.minZoom default 0
   *  @param {Number} options.maxZoom default 18
   *  @param {boolean} options.rotation enable rotation, default false
   *  @param {top|bottom-left|right} options.align position
   *  @param {Array<ol.layer>} options.layers list of layers
   *  @param {ol.style.Style | Array.<ol.style.Style> | undefined} options.style style to draw the map extent on the overveiw
   *  @param {bool|elastic} options.panAnimation use animation to center map on click, default true
   */
  constructor(options?: Options);

  /** Get overview map
   *  @return {Map}
   */
  getOverviewMap(): _ol_Map_;

  /** Toggle overview map
   */
  toggleMap(): void;

  /** Set overview map position
   *  @param {top|bottom-left|right}
   */
  setPosition(align: string): void;

  /**
   * Set the map instance the control associated with.
   * @param {Map} map The map instance.
   */
  setMap(map: _ol_Map_ | null): void;
}
