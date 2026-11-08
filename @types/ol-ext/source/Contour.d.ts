import type Feature from 'ol/Feature'
import type MultiPolygon from 'ol/geom/MultiPolygon'
import VectorSource, { Options as VectorSourceOptions } from 'ol/source/Vector'

export interface GridData {
  /** Longitude/easting matrix. */
  x: number[][];
  /** Latitude/northing matrix. */
  y: number[][];
  /** Value matrix; null and undefined are treated as no-data. */
  z: (number | null | undefined)[][];
}

/** The subset of a d3-contour generator used by Contour. */
export interface ContourGenerator {
  (values: number[]): Array<{ value: number; coordinates: number[][][][] }>;
  size(size: [number, number]): ContourGenerator;
  thresholds(count: number): ContourGenerator;
}

export interface Options extends VectorSourceOptions<Feature<MultiPolygon>> {
  /** d3-contour factory; falls back to the global d3.contours when omitted. */
  factory?: () => ContourGenerator;
  /** Regular grid data. */
  data?: GridData;
  /** Number of contour levels passed to d3-contour. */
  thresholds?: number;
}

/**
 * Generate contour polygons from regular grid data using d3-contour.
 * Coordinates are assumed to be in EPSG:4326. This source does not compute
 * min/max, normalize values, or transform coordinates. Generated features have
 * a `value` attribute that can be used for styling.
 */
export default class Contour extends VectorSource<Feature<MultiPolygon>> {
  constructor(options?: Options);
  /** Number of contour levels; changing it recomputes the polygons. */
  thresholds: number | undefined;
  /** Set grid data and recompute the polygons. */
  setData(data: GridData): void;
  /** Recompute contour polygons. */
  calculateContours(): void;
}
