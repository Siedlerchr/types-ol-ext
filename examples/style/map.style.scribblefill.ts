import Feature, { type FeatureLike } from 'ol/Feature';
import type Geometry from 'ol/geom/Geometry';
import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import scribbleFill from 'ol-ext/geom/Scribble';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Select from 'ol/interaction/Select';
import Modify from 'ol/interaction/Modify';
import DrawHole from 'ol-ext/interaction/DrawHole';
import Draw from 'ol/interaction/Draw';

// Layers
const layer = new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' });

// The map
const map = new Map({
  target: 'map',
  view: new View({ zoom: 3, center: [166326, 5992663] }),
  layers: [layer],
});

const cache = new WeakMap<Feature, { step: number; geom: Geometry | null }>();

// Vector layer
const vector = new VectorLayer({
  source: new VectorSource({
    url: 'https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson',
    format: new GeoJSON<Feature>(),
  }),
  style: scribbleStyle,
});
map.addLayer(vector);

function scribbleStyle(feature: FeatureLike, resolution: number) {
  if (!(feature instanceof Feature)) return [];
  const geometry = feature.getGeometry();
  if (!geometry) return [];
  const colors = [
    'red',
    'green',
    'blue',
    'cyan',
    'magenta',
    'yellow',
    'orange',
    'purple',
    'GreenYellow',
  ];

  const a = feature.get('angle') || Math.random() * Math.PI;
  feature.set('angle', a);
  const color =
    feature.get('color') ||
    colors[Math.round(Math.random() * (colors.length - 1))];
  feature.set('color', color);
  // Calculate step according to resolution
  const maxres = 10000;
  const step = Math.max(8 * maxres, 8 * resolution);
  const width = Math.max(2, (2 * maxres) / resolution);

  // cache scribble geom in the feature to prevent calculating
  let scribble = cache.get(feature);
  if (!scribble || scribble.step !== step) {
    scribble = {
      step: step,
      geom: scribbleFill(geometry, { interval: step, angle: a }), // feature.getGeometry().scribbleFill({ interval: step, angle: a })
    };
    cache.set(feature, scribble);
    // console.log('calculating')
  }

  return [
    new Style({
      stroke: new Stroke({
        width: 0.5,
        color: color, //'rgba(255,0,0,.5)'
      }),
      fill: new Fill({ color: 'transparent' }),
    }),
    new Style({
      stroke: new Stroke({
        width: width,
        color: color,
      }),
      geometry: scribble.geom ?? undefined,
    }),
  ];
}

// interactions
const interactions = {
  select: new Select({ hitTolerance: 5 }),
  modify: new Modify({ source: vector.getSource()! }),
  drawHole: new DrawHole({
    // source: vector.getSource()!,
    layers: [vector],
  }),
  drawPoly: new Draw({
    type: 'Polygon',
    source: vector.getSource()!,
  }),
};
Object.values(interactions).forEach((interaction) =>
  map.addInteraction(interaction),
);

interactions.drawHole.on('drawend', function (e) {
  cache.delete(e.feature);
});
interactions.modify.on('modifyend', function (e) {
  for (const f of e.features.getArray()) {
    cache.delete(f);
    f.changed();
  }
});

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

Object.assign(window, { layer });
