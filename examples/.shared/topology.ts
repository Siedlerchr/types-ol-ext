import type { FeatureCollection } from 'geojson';
import type { Objects, Topology } from 'topojson-specification';

declare const topojson: {
  topology(objects: Record<string, FeatureCollection>): Topology<Objects>;
};

export function createTopology(
  collection: FeatureCollection,
): Topology<Objects> {
  // The upstream HTML loads the TopoJSON browser bundle.
  return topojson.topology({ layer: collection });
}
