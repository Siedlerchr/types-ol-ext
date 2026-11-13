import type { FeatureCollection, Point } from 'geojson'

export interface Options {
  /** Include camera information. */
  camera?: boolean;
  /** Include photo date. */
  date?: boolean;
  /** Include image information. */
  image?: boolean;
  /** Called with the number of images left to process. */
  loading?: (remaining: number) => void;
  /** Called with the resulting GeoJSON collection. */
  onLoad?: (geojson: FeatureCollection<Point>) => void;
}
/** Convert images or files with GPS EXIF tags to GeoJSON. Requires global EXIF-JS. */
export default function exif2geojson(images: ArrayLike<HTMLImageElement | File>, options?: Options): void
