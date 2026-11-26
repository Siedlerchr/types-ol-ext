import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorImage from 'ol/layer/VectorImage';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 4,
    center: [166326, 5992663],
  }),
  layers: [new TileLayer({ properties: { title: 'OSM' }, source: new OSM() })],
});

// Create a set of features on seed points
function addFeatures(nb: number) {
  const ext = map.getView().calculateExtent(map.getSize());
  const dx = ext[2] - ext[0];
  const dy = ext[3] - ext[1];
  const features = [];
  for (let i = 0; i < nb; i++) {
    const seed = [ext[0] + dx * Math.random(), ext[1] + dy * Math.random()];
    const f = new Feature(new Point(seed));
    features.push(f);
  }
  source.addFeatures(features);
}

// Vector source
const source = new VectorSource();
addFeatures(10);

const layerSource = new VectorImage({
  properties: { title: 'Source' },
  source: source,
  opacity: 0.7,
  visible: true,
  style: new Style({
    image: new Circle({
      radius: 10,
      fill: new Fill({ color: '#00F' }),
    }),
  }),
});
map.addLayer(layerSource);

const op = document.querySelector<HTMLInputElement>('.options input')!;
op.addEventListener('change', function () {
  layerSource.setOpacity(parseFloat(op.value));
});
