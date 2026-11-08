import type Feature from 'ol/Feature'
import type MultiPolygon from 'ol/geom/MultiPolygon'
import VectorSource, { Options as VectorSourceOptions } from 'ol/source/Vector'

export interface GridData {
  x: number[][];
  y: number[][];
  z: (number | null | undefined)[][];
}

/** The subset of a d3-contour generator used by Contour. */
export interface ContourGenerator {
  (values: number[]): Array<{ value: number; coordinates: number[][][][] }>;
  size(size: [number, number]): ContourGenerator;
  thresholds(count: number): ContourGenerator;
}

export interface Options extends VectorSourceOptions<Feature<MultiPolygon>> {
  factory?: () => ContourGenerator;
  data?: GridData;
  thresholds?: number;
}

/** Generates contour polygon features from a regular grid using d3-contour. */
export default class Contour extends VectorSource<Feature<MultiPolygon>> {
  constructor(options?: Options);
  thresholds: number | undefined;
  setData(data: GridData): void;
  calculateContours(): void;
}
