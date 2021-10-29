import { Map as _ol_Map_ } from "ol";
import ol_control_Control, { Options as ControlOptions } from "ol/control/Control";
import { Layer } from "ol/layer";
import { Extent } from "ol/extent";

export interface Options extends ControlOptions {
  layers?: Layer;
  rightLayers?: Layer;
  className?: string;
  position?: number;
  orientation?: "vertical" | "horizontal;";
}

/**
 * @classdesc Swipe Control.
 *
 * @constructor
 * @extends {ol_control_Control}
 * @param {Object=} Control options.
 *  @param {ol.layer} options.layers layer to swipe
 *  @param {ol.layer} options.rightLayer layer to swipe on right side
 *  @param {string} options.className control class name
 *  @param {number} options.position position propertie of the swipe [0,1], default 0.5
 *  @param {string} options.orientation orientation propertie (vertical|horizontal), default vertical
 */
export default class Swipe extends ol_control_Control {
  constructor(options?: Options);
  /**
   * Set the map instance the control associated with.
   * @param {_ol_Map_} map The map instance.
   */
  setMap(map: _ol_Map_): void;
  /** Add a layer to clip
   *	@param {layer|Array<layer>} layer to clip
   *	@param right: add layer in the right part of the map, default left.
   */
  addLayer(layer: Layer | Layer[], right: boolean): void;
  /** Remove a layer to clip
   *	@param {layer|Array<layer>} layer to clip
   */
  removeLayer(layer: Layer | Layer[]): void;

  /** Get visible rectangle
   * @returns {Extent}
   */
  getRectangle(): Extent;
}
