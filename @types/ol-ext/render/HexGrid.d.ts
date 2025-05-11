import type { Coordinate } from 'ol/coordinate'

export interface Options {
  size?: number;
  origin?: Coordinate;
  layout?: HexagonLayout;
}

/** @typedef {'pointy' | 'flat'} HexagonLayout
 *  Layout of a Hexagon. Flat means the bottom part of the hexagon is flat.
 */
export declare type HexagonLayout = 'pointy' | 'flat';
/**
 * Hexagonal grids
 * @classdesc HexGrid is a class to compute hexagonal grids
 * @see http://www.redblobgames.com/grids/hexagons
 *
 * @constructor HexGrid
 * @extends {Object}

 */
export default class HexGrid extends Object {
  /**
   * @param {Object} [options]
   *  @param {number} [options.size] size of the hexagon in map units, default 80000
   *  @param {Coordinate} [options.origin] orgin of the grid, default [0,0]
   *  @param {HexagonLayout} [options.layout] grid layout, default pointy
   */
  constructor(options?: Options);

  /** Layout
   */
  layout: any

  /** Set layout
   * @param {HexagonLayout | undefined} layout name, default pointy
   */
  setLayout(layout: HexagonLayout | undefined): void;

  /** Get layout
   * @return {HexagonLayout} layout name
   */
  getLayout(): HexagonLayout;

  /** Set hexagon origin
   * @param {Coordinate} coord origin
   */
  setOrigin(coord: Coordinate): void;

  /** Get hexagon origin
   * @return {Coordinate} coord origin
   */
  getOrigin(): Coordinate;

  /** Set hexagon size
   * @param {number} hexagon size
   */
  setSize(hexagon: number): void;

  /** Get hexagon size
   * @return {number} hexagon size
   */
  getSize(): number;

  /** Convert cube to axial coords
   * @param {Coordinate} c cube coordinate
   * @return {Coordinate} axial coordinate
   */
  cube2hex(c: Coordinate): Coordinate;

  /** Convert axial to cube coords
   * @param {Coordinate} h axial coordinate
   * @return {Coordinate} cube coordinate
   */
  hex2cube(h: Coordinate): Coordinate;

  /** Convert offset to axial coords
   * @param {Coordinate} h axial coordinate
   * @return {Coordinate} offset coordinate
   */
  hex2offset(h: Coordinate): Coordinate;

  /** Convert axial to offset coords
   * @param {Coordinate} o offset coordinate
   * @return {Coordinate} axial coordinate
   */
  offset2hex(o: Coordinate): Coordinate;

  /** Convert offset to cube coords
   * @param {Coordinate} c cube coordinate
   * @return {Coordinate} offset coordinate
   */
  cube2offset(c: Coordinate): Coordinate

  /** Convert cube to offset coords
  * @param {Coordinate} o offset coordinate
  * @return {Coordinate} cube coordinate
  */
  offsetToCube(o: Coordinate): Coordinate

  /** Round cube coords
  * @param {Coordinate} h cube coordinate
  * @return {Coordinate} rounded cube coordinate
  */
  cube_round(c: Coordinate, o: Coordinate, h: Coordinate): Coordinate;

  /** Round axial coords
   * @param {Coordinate} h axial coordinate
   * @return {Coordinate} rounded axial coordinate
   */
  hex_round(h: Coordinate): Coordinate;

  /** Get hexagon corners
   */
  hex_corner(): void;

  /** Get hexagon coordinates at a coordinate
   * @param {Coordinate} coord
   * @return {Arrary<Coordinate>}
   */
  getHexagonAtCoord(coord: Coordinate): Array<Coordinate>;

  /** Get hexagon coordinates at hex
   * @param {Coordinate} hex
   * @return {Arrary<Coordinate>}
   */
  getHexagon(hex: Coordinate): Array<Coordinate>;

  /** Convert hex to coord
   * @param {hex} hex
   * @return {Coordinate}
   */
  hex2coord(hex: Array<Coordinate>): Coordinate;

  /** Convert coord to hex
   * @param {Coordinate} coord
   * @return {hex}
   */
  coord2hex(coord: Coordinate): Array<Coordinate>;

  /** Calculate distance between to hexagon (number of cube)
   * @param {Coordinate} a first cube coord
   * @param {Coordinate} a second cube coord
   * @return {number} distance
   */
  cube_distance(a: Coordinate, b: Coordinate): number;

  /** Calculate line between to hexagon
   * @param {Coordinate} a first cube coord
   * @param {Coordinate} b second cube coord
   * @return {Array<Coordinate>} array of cube coordinates
   */
  cube_line(a: Coordinate, b: Coordinate): Coordinate[];

  /** Get the neighbors for an hexagon
   * @param {Coordinate} h axial coord
   * @param {number} direction
   * @return { Coordinate | Array<Coordinate> } neighbor || array of neighbors
   */
  hex_neighbors(h: Coordinate, direction: number): Coordinate | Coordinate[];

  /** Get the neighbors for an hexagon
   * @param {Coordinate} c cube coord
   * @param {number} direction
   * @return { Coordinate | Array<Coordinate> } neighbor || array of neighbors
   */
  cube_neighbors(c: Coordinate, direction: number): Coordinate | Coordinate[];
}
