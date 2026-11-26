import { asString } from 'ol/color';
import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import FlowLine from 'ol-ext/style/FlowLine';
import VectorImage from 'ol/layer/VectorImage';
import VectorSource from 'ol/source/Vector';
import Collection from 'ol/Collection';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Modify from 'ol/interaction/Modify';
import Draw from 'ol/interaction/Draw';

// Layers
const layer = new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' });

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers: [layer],
});

// Default style
const defaultStyle = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({ color: [0, 153, 255, 1] }),
    stroke: new Stroke({ color: [255, 255, 255, 1], width: 1.5 }),
  }),
});
// Flow style
const flowStyle = new FlowLine({
  lineCap: 'round',
  color: function (f, step) {
    if (step < 0.5) return asString([255, 255 * step * 2, 0]);
    else return asString([255, 255 - 255 * (step - 0.5) * 2, 0]);
  },
  width: function (f, step) {
    return 30 * Math.sin(Math.PI * step);
  },
});
function getStyle() {
  return [defaultStyle, flowStyle];
}

// Nouvelle source de donnee
const features = new Collection<Feature>();
const source = new VectorSource({ features });
const vector = new VectorImage({
  source,
  style: getStyle,
});
map.addLayer(vector);
source.addFeature(
  new Feature(
    new LineString([
      [259274, 6398696],
      [63595, 5958419],
      [635956, 5772524],
    ]),
  ),
);

// modify and draw interaction
const interactions = {
  modify: new Modify({ features }),
  drawLine: new Draw({
    type: 'LineString',
    style: getStyle,
    source,
  }),
};
Object.values(interactions).forEach((interaction) =>
  map.addInteraction(interaction),
);
function setInteraction() {
  const selected = document.querySelector<HTMLInputElement>(
    '[name="op"]:checked',
  )?.value;
  for (const [name, interaction] of Object.entries(interactions)) {
    interaction.setActive(name === selected);
  }
}
setInteraction();
document.querySelectorAll('input[type="radio"][name="op"]').forEach((input) => {
  input.addEventListener('change', setInteraction);
});
