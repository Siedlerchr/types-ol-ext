import type { Map as _ol_Map_ } from 'ol'
import type { Options as ScaleLineOptions } from 'ol/control/ScaleLine'
import ol_control_ScaleLine from 'ol/control/ScaleLine'
import type { Style } from 'ol/style'

export interface Options extends ScaleLineOptions {
  style?: Style;
}

/**
 * @classdesc
 *    OpenLayers 3 Scale Line Control integrated in the canvas (for jpeg/png
 * @see http://www.kreidefossilien.de/webgis/dokumentation/beispiele/export-map-to-png-with-scale
 *
 * @constructor
 * @extends {contrScaleLine}

 */
export default class CanvasScaleLine extends ol_control_ScaleLine {
  /**
   * @param {Object=} options extend the contrScaleLine options.
   *  @param {Style} options.style used to draw the scale line (default is black/white, 10px Arial).
   */
  constructor(options?: Options);

  /**
   * Remove the control from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {Map} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_): void;

  /**
   * Change the control style
   * @param {Style} style
   */
  setStyle(style: Style): void;
}
