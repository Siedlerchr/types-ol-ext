import { Feature, Map, View } from 'ol';
import { easeIn, easeOut, inAndOut, linear } from 'ol/easing';
import GPX from 'ol/format/GPX';
import { LineString, MultiLineString, Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, RegularShape, Stroke, Style } from 'ol/style';
import Path from 'ol-ext/featureanimation/Path';
import Geoportail from 'ol-ext/layer/Geoportail';

const map = new Map({ target: 'map', view: new View({ zoom: 13, center: [646752, 5407059] }),
  layers: [new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS')] });
const star = (color: string) => new Style({ image: new RegularShape({ radius: 10, radius2: 5, points: 5, fill: new Fill({ color }) }),
  stroke: new Stroke({ color: 'blue', width: 2 }), fill: new Fill({ color: [0, 0, 255, 0.3] }) });
const style = star('blue');
const red = star('red');
const triangle = new Style({ image: new RegularShape({ radius: 14, points: 3, scale: [0.6, 1],
  fill: new Fill({ color: '#00f' }), stroke: new Stroke({ color: '#fff', width: 2 }) }) });
const source = new VectorSource({ url: '../data/2009-09-04_rando.gpx', format: new GPX() });
const vector = new VectorLayer({ source, updateWhileAnimating: true, updateWhileInteracting: true, style });
map.addLayer(vector);
let path: LineString | undefined;
source.on('featuresloadend', event => {
  const geometry = event.features?.[0]?.getGeometry();
  path = geometry instanceof MultiLineString ? geometry.getLineString(0) || undefined : geometry instanceof LineString ? geometry : undefined;
  if (path) for (let i = 0; i < 4; i++) setTimeout(animateFeature, i * 500);
});
const easings: Record<string, (value: number) => number> = { linear, easeOut, easeIn, inAndOut };
function animateFeature() {
  if (!path) return;
  const rotate = (document.getElementById('rotation') as HTMLInputElement).checked;
  const feature = new Feature(new Point([0, 0]));
  feature.setStyle(rotate ? triangle : style);
  const animation = new Path({ path, rotate, easing: easings[(document.getElementById('easing') as HTMLSelectElement).value],
    speed: Number((document.getElementById('speed') as HTMLInputElement).value),
    revers: (document.getElementById('revers') as HTMLInputElement).checked });
  if (!rotate) animation.on('drawing', event => { if (event.time > 5000) event.style = [red]; });
  vector.animateFeature(feature, animation);
}
Object.assign(window, { animateFeature });
