import type Geometry from 'ol/geom/Geometry';
import {
  LineString,
  LinearRing,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from 'ol/geom';

interface JstsGeometry {
  intersection(other: JstsGeometry): JstsGeometry;
  isEmpty(): boolean;
}

interface JstsParser {
  inject(...constructors: unknown[]): void;
  read(geometry: Geometry): JstsGeometry;
  write(geometry: JstsGeometry): Geometry;
}

/** Attach the CDN parser to the OpenLayers classes used by the bundles. */
export function createJstsParser() {
  const { jsts } = window as Window & {
    jsts?: { io: { OL3Parser: new () => JstsParser } };
  };
  if (!jsts) return undefined;
  const parser = new jsts.io.OL3Parser();
  parser.inject(
    Point,
    LineString,
    LinearRing,
    Polygon,
    MultiPoint,
    MultiLineString,
    MultiPolygon,
  );
  return parser;
}
