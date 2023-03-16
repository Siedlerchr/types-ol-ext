import type { Layer } from 'ol/layer'
import { Pointer } from 'ol/interaction'
import type MapBrowserEvent from 'ol/MapBrowserEvent'
import type { Pixel } from 'ol/pixel'

export interface Options {
  radius?: number;
}

/** Clip interaction to clip layers in a circle
 * @constructor
 * @extends {ol_interaction_Pointer}

 */
export default class ClipMap extends Pointer {
  /**
   * @param {ol_interaction_ClipMap.options} options flashlight  param
   *  @param {number} options.radius radius of the clip, default 100 (px)
   */
  constructor(options?: Options);

  /** Set the map > start postcompose
   */
  setMap(): void;

  /** Set clip radius
   *  @param {number} radius
   */
  setRadius(radius: number): void;

  /** Add a layer to clip
   *  @param {layer|Array<layer>} layer to clip
   */
  addLayer(layer: Layer | Layer[]): void;

  /** Remove all layers
   */
  removeLayers(): void;

  /** Remove a layer to clip
   *  @param {layer|Array<layer>} layer to clip
   */
  removeLayer(layer: Layer | Layer[]): void;

  /** Set position of the clip
   *  @param {Pixel|MapBrowserEvent<UIEvent>}
   */
  setPosition(e: Pixel | MapBrowserEvent<UIEvent>): void;

  /** Set position of the clip
   * @param {Pixel} pixel
   */
  setPixelPosition(pixel: Pixel): void;

  /** Get position of the clip
   * @returns {Pixel} pixel
   */
  getPixelPosition(): Pixel;

  /**
   * Activate or deactivate the interaction.
   * @param {boolean} active Active.
   * @observable
   * @api
   */
  setActive(active: boolean): void;
}
