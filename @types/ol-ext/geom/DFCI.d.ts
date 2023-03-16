import type { Coordinate } from 'ol/coordinate'
import type { ProjectionLike } from 'ol/proj'

/** Convert coordinate to French DFCI grid
 * @param {Coordinate} coord
 * @param {number} level [0-3]
 * @param {Projection} projection of the coord, default EPSG:27572
 * @return {String} the DFCI index
 */
export function ol_coordinate_toDFCI(coord: Coordinate, level: number, projection: ProjectionLike): string;

/** Get coordinate from French DFCI index
 * @param {String} index the DFCI index
 * @param {Projection} projection result projection, default EPSG:27572
 * @return {Coordinate} coord
 */
export function ol_coordinate_fromDFCI(index: string, projection: ProjectionLike): Coordinate;

/** The string is a valid DFCI index
 * @param {string} index DFCI index
 * @return {boolean}
 */
export function ol_coordinate_validDFCI(index: string): boolean;

/** Coordinate is valid for DFCI
 * @param {Coordinate} coord
 * @param {Projection} projection result projection, default EPSG:27572
 * @return {boolean}
 */
export function ol_coordinate_validDFCICoord(coord: Coordinate, projection: ProjectionLike): boolean;
