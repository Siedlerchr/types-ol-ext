import type { Map as _ol_Map_ } from 'ol'
import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'
import type { Layer } from 'ol/layer'
import type { ProjectionLike } from 'ol/proj'
import type { Style } from 'ol/style'

export interface Options extends ControlOptions {
  projection: ProjectionLike;
  minZoom?: number;
  maxZoom?: number;
  rotation?: boolean;
  align: 'top' | 'bottom-left' | 'right';
  layers: Layer[];
  style?: Style | Style[];
  panAnimation?: boolean | 'elastic';
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

  /** Elastic bounce
   *  @param {number} bounce number of bounce
   *  @param {Number} amplitude amplitude of the bounce [0,1]
   *  @return {Number}
   * /
   var bounceFn = function (bounce, amplitude){
        var a = (2*bounce+1) * Math.PI/2;
        var b = amplitude>0 ? -1/amplitude : -100;
        var c = - Math.cos(a) * Math.pow(2, b);
        return function(t) {
          t = 1-Math.cos(t*Math.PI/2);
          return 1 + Math.abs( Math.cos(a*t) ) * Math.pow(2, b*t) + c*t;
        }
      }
   /** Elastic bounce
   *  @param {number} bounce number of bounce
   *  @param {Number} amplitude amplitude of the bounce [0,1]
   *  @return {Number}
   */
  elasticFn(bounce: number, amplitude: number): number;

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
  setPosition(align: 'top' | 'bottom-left' | 'right'): void;

  /**
   * Set the map instance the control associated with.
   * @param {Map} map The map instance.
   */
  setMap(map: _ol_Map_): void;
}
