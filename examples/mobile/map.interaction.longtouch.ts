import { Feature, Map, View } from 'ol';
import type { Coordinate } from 'ol/coordinate';
import { easeOut } from 'ol/easing';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle, Stroke, Style } from 'ol/style';
import type { AnimatedMap } from 'ol-ext/featureanimation/FeatureAnimation';
import Zoom from 'ol-ext/featureanimation/Zoom';
import LongTouch from 'ol-ext/interaction/LongTouch';
import Geoportail from 'ol-ext/layer/Geoportail';

const source = new VectorSource();
const map = new Map({
  target: 'map',
  view: new View({ zoom: 5, center: [261720, 5951081] }),
  layers: [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' }),
    new VectorLayer({ source, updateWhileInteracting: true })],
});
function pulseFeature(coordinate: Coordinate) {
  const feature = new Feature(new Point(coordinate));
  feature.setStyle(new Style({ image: new Circle({ radius: 30, stroke: new Stroke({ color: 'red', width: 2 }) }) }));
  (map as AnimatedMap).animateFeature(feature, new Zoom({ fade: easeOut, duration: 800 }));
}
map.addInteraction(new LongTouch({
  pixelTolerance: 1,
  handleLongTouchEvent: (event) => {
    source.addFeature(new Feature(new Point(event.coordinate)));
    pulseFeature(event.coordinate);
    setTimeout(() => pulseFeature(event.coordinate), 400);
    document.querySelector('.options div')!.textContent = `${source.getFeatures().length} features added!`;
  },
}));
