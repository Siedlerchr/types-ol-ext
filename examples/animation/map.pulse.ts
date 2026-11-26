import { Feature, Map, View } from 'ol';
import type { Coordinate } from 'ol/coordinate';
import { easeOut, upAndDown } from 'ol/easing';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import { Circle, Icon, RegularShape, Stroke, Style } from 'ol/style';
import Zoom from 'ol-ext/featureanimation/Zoom';
import type { AnimatedMap } from 'ol-ext/featureanimation/FeatureAnimation';
import Geoportail from 'ol-ext/layer/Geoportail';
import 'ol-ext/render/AnimExtent';

const map = new Map({
  target: 'map',
  view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS'), new VectorLayer()],
});
const icon = new Icon({ src: '../data/smile.png' });
icon.load();
const bounce = (t: number) => {
  const a = 11 * Math.PI / 2;
  const b = -0.01;
  const c = -Math.cos(a) * Math.pow(2, b);
  const time = 1 - Math.cos(t * Math.PI / 2);
  return (1 + Math.abs(Math.cos(a * time)) * Math.pow(2, b * time) + c * time) / 2;
};
const value = (id: string) => (document.getElementById(id) as HTMLSelectElement).value;
function pulseFeature(coordinate: Coordinate) {
  const stroke = new Stroke({ color: value('color'), width: 2 });
  const form = value('form');
  const image = form === 'Icon' ? new Icon({ src: '../data/smile.png' })
    : form === 'RegularShape' ? new RegularShape({ radius: 30, points: 4, stroke })
      : new Circle({ radius: 30, stroke });
  const feature = new Feature(new Point(coordinate));
  feature.setStyle(new Style({ image }));
  const easing = value('easing');
  (map as AnimatedMap).animateFeature(feature, new Zoom({ fade: easeOut, duration: 3000,
    easing: easing === 'bounce' ? bounce : easing === 'upAndDown' ? upAndDown : easeOut }));
}
map.on('singleclick', event => pulseFeature(event.coordinate));
function pulse(lonlat: Coordinate) {
  const count = value('easing') === 'bounce' ? 1 : 3;
  for (let i = 0; i < count; i++) {
    setTimeout(() => pulseFeature(fromLonLat(lonlat, map.getView().getProjection())), i * 500);
  }
}
Object.assign(window, { pulse });
