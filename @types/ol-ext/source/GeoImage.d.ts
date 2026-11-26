import type { Coordinate } from 'ol/coordinate'
import type { Extent } from 'ol/extent'
import type { Size } from 'ol/size'
import type { AttributionLike } from 'ol/source/Source'
import type { ProjectionLike } from 'ol/proj'
import { ImageCanvas } from 'ol/source'

export interface Options {
  url?: string;
  image?: HTMLImageElement;
  imageCenter: Coordinate;
  imageScale: Size | number;
  imageRotate?: number;
  imageCrop?: Extent | number;
  imageMask?: Coordinate[];
  crossOrigin?: string | null;
  attributions?: AttributionLike;
  projection?: ProjectionLike;
}

/** Layer source with georeferencement to place it on a map
 * @constructor
 * @extends {ImageCanvas}
 */
export default class GeoImage extends ImageCanvas {
  /**
   * @param {Options} options
   */
  constructor(options: Options);

  /** calculate image at extent / resolution
   * @param {ol/extent/Extent} extent
   * @param {number} resolution
   * @param {number} pixelRatio
   * @param {ol/size/Size} size
   * @return {HTMLCanvasElement}
   */
  calculateImage(extent: Extent, resolution: number, pixelRatio: number, size: Size): HTMLCanvasElement

  /**
   * Get coordinate of the image center.
   * @return {Coordinate} coordinate of the image center.
   * @api stable
   */
  getCenter(): Coordinate;

  /**
   * Set coordinate of the image center.
   * @param {Coordinate} coordinate of the image center.
   * @api stable
   */
  setCenter(coordinate: Coordinate): void;

  /**
   * Get image scale.
   * @return {Size} image scale (along x and y axis).
   * @api stable
   */
  getScale(): Size;

  /**
   * Set image scale.
   * @param {Size|Number} image scale (along x and y axis or both).
   * @api stable
   */
  setScale(image: Size | number): void;

  /**
   * Get image rotation.
   * @return {Number} rotation in radian.
   * @api stable
   */
  getRotation(): number;

  /**
   * Set image rotation.
   * @param {Number} rotation in radian.
   * @api stable
   */
  setRotation(rotation: number): void;

  /**
   * Get the image.
   * @api stable
   */
  getGeoImage(): HTMLImageElement;

  /**
   * Get image crop Extent.
   * @return {Extent|number|undefined} Before the image loads, returns the supplied crop.
   * @api stable
   */
  getCrop(): Extent | number | undefined;

  /**
   * Set image mask.
   * @param {Coordinate[]} coords of the mask
   * @api stable
   */
  setMask(coords?: Coordinate[]): void;

  /**
   * Get image mask.
   * @return {Coordinate[]} coords of the mask
   * @api stable
   */
  getMask(): Coordinate[] | undefined;

  /**
   * Set image crop Extent.
   * @param {Extent|Number} image crop Extent or a number to crop from original Size.
   * @api stable
   */
  setCrop(image?: Extent | number): void;

  /** Get the extent of the source.
  * @param {Extent} extent If provided, its coordinates will be overwritten with the calculated extent.
  * @return {Extent}
  */
  getExtent(opt_extent?: Extent): Extent

  /** Calculate the extent of the source image.
  * @param {boolean} usemask return the mask extent, default return the image extent
  * @return {Extent}
  */
  calculateExtent(usemask?: boolean): Extent
}
