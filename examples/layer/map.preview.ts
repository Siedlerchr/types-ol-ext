import Geoportail from 'ol-ext/layer/Geoportail';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import View from 'ol/View';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import type Layer from 'ol/layer/Layer';
import 'ol-ext/layer/GetPreview';

// Two base layers
const carto = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' });
const osm = new TileLayer({
  properties: { title: 'OSM', baseLayer: true },
  source: new OSM(),
  visible: false,
});

// WMS Layer BRGM
const brgm = new TileLayer({
  properties: { name: 'Geologie (WMS)' },
  visible: false,
  minResolution: 200000 / ((72 / 2.54) * 100),
  maxResolution: 10000000 / ((72 / 2.54) * 100),
  source: new TileWMS({
    url: 'https://geoservices.brgm.fr/geologie',
    attributions: ['&copy; BRGM (French USGS equivalent)'],
    projection: 'EPSG:3857',
    params: {
      LAYERS: 'SCAN_F_GEOL1M', //'SCAN_D_GEOL50',
      FORMAT: 'image/png',
      VERSION: '1.1.1',
    },
    //crossOrigin: 'anonymous',
  }),
});
// GeoJSON layer
const vectorSource = new VectorSource({
  url: '../data/fond_guerre.geojson',
  format: new GeoJSON(),
  attributions: [
    "&copy; <a href='https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire'>data.culture.gouv.fr</a>",
  ],
});
const vector = new VectorLayer({
  properties: {
    name: '1914-18 (vector)',
    preview:
      'https://www.culture.gouv.fr/Wave/image/memoire/2484/sap40_z0002136_v.jpg',
  },
  source: vectorSource,
});

// The map
const map = new Map({
  target: 'map',
  //renderer: ["canvas", "webgl", "dom"],  /* ["webgl", "canvas", "dom"] */
  view: new View({
    zoom: 6,
    center: [270148, 6247782],
  }),
  layers: [osm, carto, brgm, vector],
});
// Add a new Layerswitcher to the map
map.addControl(new LayerSwitcher());

// Fill select with maps layer
const select = document.querySelector<HTMLSelectElement>('#preview select')!;
const images = document.querySelector('#preview .img')!;
const layers = [osm, carto, brgm, vector];
layers.forEach((layer, i) => {
  select.add(new Option(layer.get('title') || layer.get('name'), String(i)));
});
select.addEventListener('change', () =>
  showPreview(layers[select.selectedIndex]),
);

function showPreview(layer: Layer) {
  const urls = layer.getPreview(map.getView().getCenter());
  images.replaceChildren(
    ...urls.map((url) => {
      const image = document.createElement('img');
      image.src = url;
      return image;
    }),
  );
}
showPreview(layers[0]);
