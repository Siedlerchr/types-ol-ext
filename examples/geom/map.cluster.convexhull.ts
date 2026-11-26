import { Feature, Map, View } from 'ol';
import type { Coordinate } from 'ol/coordinate';
import { Point, Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import Cluster from 'ol/source/Cluster';
import VectorSource from 'ol/source/Vector';
import { Circle, Fill, Stroke, Style, Text } from 'ol/style';
import convexHull from 'ol-ext/geom/ConvexHull';
import Hover from 'ol-ext/interaction/Hover';
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import Geoportail from 'ol-ext/layer/Geoportail';

const map = new Map({ target: 'map', view: new View({ zoom: 4, center: [205461, 5867916] }),
  layers: [new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' })] });
const points = new VectorSource();
const clusterSource = new Cluster({ distance: 40, source: points });
const cache: Record<number, Style[]> = {};
const clusterLayer = new AnimatedCluster({ source: clusterSource, style: feature => {
  const size = (feature.get('features') as Feature<Point>[]).length;
  if (!cache[size]) {
    const color = size > 25 ? '248,128,0' : size > 8 ? '248,192,0' : '128,192,64';
    const radius = Math.max(8, Math.min(size * 0.75, 20));
    cache[size] = [new Style({ image: new Circle({ radius: radius + 2, stroke: new Stroke({ color: `rgba(${color},0.3)`, width: 4 }) }) }),
      new Style({ image: new Circle({ radius, fill: new Fill({ color: `rgba(${color},0.6)` }) }),
        text: new Text({ text: String(size), fill: new Fill({ color: '#000' }) }) })];
  }
  return cache[size];
} });
map.addLayer(clusterLayer);
const extent = map.getView().calculateExtent(map.getSize());
for (let i = 0; i < 2000; i++) {
  const feature = new Feature(new Point([extent[0] + (extent[2] - extent[0]) * Math.random(), extent[1] + (extent[3] - extent[1]) * Math.random()]));
  feature.set('id', i);
  points.addFeature(feature);
}
const hullSource = new VectorSource();
new VectorLayer({ source: hullSource }).setMap(map);
const hover = new Hover({ cursor: 'pointer', layerFilter: layer => layer === clusterLayer });
map.addInteraction(hover);
hover.on('enter', event => {
  const feature = event.feature;
  let hull = feature.get('convexHull') as Coordinate[] | undefined;
  if (!hull) {
    const members = feature.get('features') as Feature<Point>[];
    hull = convexHull(members.map(member => member.getGeometry()!.getCoordinates()));
    if (feature instanceof Feature) feature.set('convexHull', hull);
  }
  hullSource.clear();
  if (hull.length > 2) hullSource.addFeature(new Feature(new Polygon([hull])));
});
hover.on('leave', () => hullSource.clear());
