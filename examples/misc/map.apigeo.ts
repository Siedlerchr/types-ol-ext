import Map from 'ol/Map';
import View from 'ol/View';
import Geoportail from 'ol-ext/layer/Geoportail';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import GeoJSON from 'ol/format/GeoJSON';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 6,
    center: [285345, 5865529],
  }),
});

// Earth photo
map.addLayer(
  new Geoportail({
    layer: 'ORTHOIMAGERY.ORTHOPHOTOS',
  }),
);

const communes = new VectorSource({});
map.addLayer(
  new VectorLayer({
    properties: { title: 'Communes' },
    className: 'vector',
    source: communes,
    style: new Style({
      image: new Circle({
        radius: 2,
        fill: new Fill({ color: '#fff' }),
      }),
      stroke: new Stroke({
        color: [255, 255, 255, 0.75],
        width: 1.25,
      }),
    }),
  }),
);

const format = new GeoJSON();

// Chargement des communes par département
// https://api.gouv.fr/documentation/api-geo
async function loadDep(dep: number) {
  if (dep < 0) return;
  let cdep = ('0' + dep).substr(-2);
  if (dep === 20) cdep = '2A';
  if (dep === 0) cdep = '2B';
  console.log(dep, cdep);
  const response = await fetch(
    `https://geo.api.gouv.fr/communes?codeDepartement=${cdep}&fields=codesPostaux,centre,surface,population&format=geojson`,
  );
  if (!response.ok)
    throw new Error(`Department ${cdep}: HTTP ${response.status}`);
  const features = format.readFeatures(await response.json(), {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection(),
  });
  features.forEach((feature) => {
    feature.set('codesPostaux', feature.get('codesPostaux').join(','));
  });
  communes.addFeatures(features);
  await loadDep(dep - 1);
}
loadDep(95).catch(console.error);

function save() {
  const features = communes.getFeatures();
  const data = format.writeFeatures(features, {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection(),
    decimals: 4,
  });
  const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = 'communes.geojson';
  link.click();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}
