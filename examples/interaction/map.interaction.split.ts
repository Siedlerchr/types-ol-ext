import SimpleGeometry from 'ol/geom/SimpleGeometry';
import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Collection from 'ol/Collection';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import RegularShape from 'ol/style/RegularShape';
import Fill from 'ol/style/Fill';
import MultiPoint from 'ol/geom/MultiPoint';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import Select from 'ol/interaction/Select';
import Draw from 'ol/interaction/Draw';
import Split from 'ol-ext/interaction/Split';
import Modify from 'ol/interaction/Modify';

// Layers
var layers = [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })];
// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [261720, 5951081],
  }),
  layers: layers,
});

// New vector layer
const features = new Collection<Feature>();
const source = new VectorSource({ features });
var vector = new VectorLayer({
  properties: { name: 'Vecteur' },
  source,
  style: function (f) {
    const geometry = f.getGeometry();
    return [
      new Style({
        stroke: new Stroke({ color: '#ffcc33', width: 2 }),
      }),
      new Style({
        image: new RegularShape({
          radius: 4,
          points: 4,
          fill: new Fill({ color: '#f00' }),
        }),
        geometry:
          geometry instanceof SimpleGeometry
            ? new MultiPoint([
                geometry.getFirstCoordinate(),
                geometry.getLastCoordinate(),
              ])
            : undefined,
      }),
    ];
  },
});
map.addLayer(vector);
source.addFeature(
  new Feature(
    new LineString([
      [-288626, 5757848],
      [210354, 5576845],
      [34243, 6305749],
    ]),
  ),
);
source.addFeature(
  new Feature(
    new Polygon([
      [
        [406033, 5664901],
        [689767, 5718712],
        [699551, 6149206],
        [425601, 6183449],
        [406033, 5664901],
      ],
    ]),
  ),
);

const selection = new Select();
const splitter = new Split({ sources: source });
const interactions = {
  select: selection,
  draw: new Draw({ source, type: 'LineString' }),
  split: splitter,
  modify: new Modify({ features: selection.getFeatures() }),
};
Object.values(interactions).forEach((interaction) =>
  map.addInteraction(interaction),
);

const info = document.querySelector('.options > div')!;
function setInteraction() {
  const selected = document.querySelector<HTMLInputElement>(
    '[name="op"]:checked',
  )?.value;
  selection.getFeatures().clear();
  info.textContent = '';
  for (const [name, interaction] of Object.entries(interactions)) {
    interaction.setActive(name === selected);
  }
  if (selected === 'modify') selection.setActive(true);
}
setInteraction();
document.querySelectorAll('input[type="radio"][name="op"]').forEach((input) => {
  input.addEventListener('change', setInteraction);
  if (
    input.nextElementSibling instanceof HTMLLabelElement &&
    !input.nextElementSibling.htmlFor
  ) {
    input.nextElementSibling.addEventListener('click', () =>
      (input as HTMLInputElement).click(),
    );
  }
});

splitter.on('aftersplit', (event) => {
  info.textContent = `1 feature split in ${event.features.length}`;
});
