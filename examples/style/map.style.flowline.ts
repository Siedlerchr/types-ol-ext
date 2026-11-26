import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import FlowLine from 'ol-ext/style/FlowLine';
import VectorImage from 'ol/layer/VectorImage';
import VectorSource from 'ol/source/Vector';
import Collection from 'ol/Collection';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Select from 'ol/interaction/Select';
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

const flowStyle = new FlowLine({
  color: document.querySelector<HTMLInputElement>('.color')!.value,
  color2: document.querySelector<HTMLInputElement>('.color2')!.value,
  width: Number(document.querySelector<HTMLInputElement>('.width')!.value),
  width2: Number(document.querySelector<HTMLInputElement>('.width2')!.value),
});
function getStyle() {
  return flowStyle;
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

// global so we can remove it later
const interactions = {
  select: new Select({ hitTolerance: 3 }),
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

// Activate interaction
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

Object.assign(window, { flowStyle, vector });
