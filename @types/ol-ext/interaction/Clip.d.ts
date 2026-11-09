import type BaseLayer from 'ol/layer/Base'
import { Pointer } from 'ol/interaction'
import type Map from 'ol/Map'
import type { Pixel } from 'ol/pixel'
import type { Coordinate } from 'ol/coordinate'

export interface Options {
  radius?: number;
  layers?: BaseLayer | BaseLayer[];
}

/** Clip interaction to clip layers in a circle
 * @constructor
 * @extends {interaction.Pointer}

 */
export default class Clip extends Pointer {
  /**
   * @param {interaction.Clip.options} options flashlight  param
   *  @param {number} options.radius radius of the clip, default 100
   *  @param {layer|Array<layer>} options.layers layers to clip
   */
  constructor(options?: Options);

  /** Set the map > start postcompose
   */
  setMap(map: Map | null): void;

  /** Set clip radius
   *  @param {number} radius
   */
  setRadius(radius: number): void;

  /** Get clip radius. */
  getRadius(): number;
  /** Get position of the clip. */
  getPosition(): Coordinate | null;

  /** Add a layer to clip
   *  @param {layer|Array<layer>} layer to clip
   */
  addLayer(layer: BaseLayer | BaseLayer[]): void;

  /** Remove all layers
   */
  removeLayers(): void;

  /** Remove a layer to clip
   *  @param {layer|Array<layer>} layer to clip
   */
  removeLayer(layer: BaseLayer | BaseLayer[]): void;

  /** Set position of the clip
   *  @param coordinate Position in map coordinates.
   */
  setPosition(coordinate: Coordinate): void;

  /** Set position of the clip
   * @param {Pixel} pixel
   */
  setPixelPosition(pixel: Pixel): void;

  /** Get position of the clip
   * @returns {Pixel} pixel
   */
  getPixelPosition(): Pixel | false;

  /**
   * Activate or deactivate the interaction.
   * @param {boolean} active Active.
   * @observable
   * @api
   */
  setActive(active: boolean): void;
}
