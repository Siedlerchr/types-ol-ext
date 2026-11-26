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
import Point from 'ol/geom/Point';
import Splitter from 'ol-ext/interaction/Splitter';
import Select from 'ol/interaction/Select';
import Modify from 'ol/interaction/Modify';
import Draw from 'ol/interaction/Draw';
import Snap from 'ol/interaction/Snap';

// Layers
var layers = [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })];
// The map
var map = new Map({
  target: 'map',
  view: new View({
    /**/
    zoom: 5,
    center: [261720, 5951081],
    /*/
        zoom: 15,
        center: [0, 48],
        projection: 'EPSG:4326'
        /**/
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
    new LineString([
      [406033, 5664901],
      [689767, 5718712],
      [699551, 6149206],
      [425601, 6183449],
    ]),
  ),
);
source.addFeature(new Feature(new Point([261720, 5951081])));

// Add splitter before other interaction
var splitter = new Splitter({ source, tolerance: 1e-3 });
map.addInteraction(splitter);

// Add interactions to modify features
var interactions = {
  select: new Select(),
  modify: new Modify({ features }),
  draw: new Draw({
    source,
    type: 'LineString',
    // type: "Point"
  }),
};
Object.values(interactions).forEach((interaction) =>
  map.addInteraction(interaction),
);

// Add a snap
var snap = new Snap({ source });
map.addInteraction(snap);

// Activate modification
const info = document.querySelector('.options > div')!;
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
  info.textContent = `${source.getFeatures().length} features (${event.featureAdded.length} added, ${event.featureRemoved.length} removed)`;
});
