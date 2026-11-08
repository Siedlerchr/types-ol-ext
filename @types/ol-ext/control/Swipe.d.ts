import type { Map as _ol_Map_ } from 'ol'
import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'
import type { Layer } from 'ol/layer'
import type { Extent } from 'ol/extent'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { OnSignature } from 'ol/Observable'
import type { Size } from 'ol/size'
import type { Pixel } from 'ol/pixel'

export interface Options extends ControlOptions {
  layers?: Layer | Layer[];
  rightLayers?: Layer | Layer[];
  className?: string;
  position?: number;
  orientation?: 'vertical' | 'horizontal';
}

export interface SwipeMovingEvent extends BaseEvent {
  type: 'moving';
  size: Size;
  position: Pixel;
}

/**
 * @classdesc Swipe Control.
 *
 * @constructor
 * @extends {ol_control_Control}

 */
export default class Swipe extends ol_control_Control {
  /**
   * @param {Object=} Control options.
   *  @param {ol.layer|Array<ol.layer>} options.layers layers to swipe
   *  @param {ol.layer|Array<ol.layer>} options.rightLayers layers to swipe on right side
   *  @param {string} options.className control class name
   *  @param {number} options.position position property of the swipe [0,1], default 0.5
   *  @param {string} options.orientation orientation property (vertical|horizontal), default vertical
   */
  constructor(options?: Options);

  /**
   * Set the map instance the control associated with.
   * @param {_ol_Map_} map The map instance.
   */
  setMap(map: _ol_Map_ | null): void;

  /** Add a layer to clip
   *  @param {layer|Array<layer>} layer to clip
   *  @param right: add layer in the right part of the map, default left.
   */
  addLayer(layer: Layer | Layer[], right?: boolean): void;

  /** Remove a layer to clip
   *  @param {layer|Array<layer>} layer to clip
   */
  removeLayer(layer: Layer | Layer[]): void;

  /** Remove all clipped layers. */
  removeLayers(): void;

  /** Get visible rectangle
   * @returns {Extent}
   */
  getRectangle(): Extent;

  on: ol_control_Control['on'] & OnSignature<'moving', SwipeMovingEvent, EventsKey>;
  once: ol_control_Control['once'] & OnSignature<'moving', SwipeMovingEvent, EventsKey>;
  un: ol_control_Control['un'] & OnSignature<'moving', SwipeMovingEvent, void>;
}
