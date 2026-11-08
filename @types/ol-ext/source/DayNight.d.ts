import type { Options as VectorSourceOptions } from 'ol/source/Vector'
import VectorSource from 'ol/source/Vector'
import type { Coordinate } from 'ol/coordinate'
import type Feature from 'ol/Feature'

export interface Options extends VectorSourceOptions<Feature> {
  time?: string | Date;
  step?: number;
}

/** DayNight source: a source to display day/night on a map
 * @constructor
 * @extends {ol.source.Vector}

 */
export default class DayNight extends VectorSource {
  /**
   * @param {any} options Vector source options
   *  @param {string|Date} time source date time
   *  @param {number} step step in degree for coordinate precision
   */
  constructor(options?: Options);

  /** Get the day/night separation latitude for a longitude. */
  static getNightLat(lon: number, time?: string | Date): number;

  /** Get the sun's position in longitude and latitude. */
  getSunPosition(time?: string | Date): Coordinate;

  /** Set source date time
   * @param {string|Date} time source date time
   */
  setTime(time: string | Date): void

  /** Get night-day separation line
   * @param {string} time DateTime string, default yet
   * @param {string} options use 'line' to get the separation line, 'day' to get the day polygon, 'night' to get the night polygon or 'daynight' to get both polygon, default 'night'
   * @return Coordinates of the separation line or polygon; 'daynight' returns both polygons.
   */
  getCoordinates(time: string | Date | undefined, options: 'daynight'): Coordinate[][];
  getCoordinates(time?: string | Date, options?: 'line' | 'day' | 'night'): Coordinate[];
  getCoordinates(time?: string | Date, options?: 'line' | 'day' | 'night' | 'daynight'): Coordinate[] | Coordinate[][];
}
