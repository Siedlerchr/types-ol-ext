import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Permalink from 'ol-ext/control/Permalink';
import SearchNominatim from 'ol-ext/control/SearchNominatim';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import * as imageLoader from 'ol-ext/util/imagesLoader';
import CSS from 'ol-ext/filter/CSS';
import Tooltip from 'ol-ext/overlay/Tooltip';
import { getElevationFromPixel } from 'ol-ext/util/imagesLoader';
import 'ol-ext/filter/Base';

const plan = new Geoportail({
  layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
  className: 'plan',
});

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 0,
    center: [951487, 3467896],
  }),
  layers: [plan],
});
map.addControl(new LayerSwitcher());
map.addControl(new Permalink({ visible: false }));
map.addControl(new SearchNominatim({ zoomOnSelect: 16 }));

// A set of elevation layers
const layers = [
  {
    title: 'MNT SRTM3',
    url: 'https://data.geopf.fr/wms-r/wms',
    layer: 'ELEVATION.ELEVATIONGRIDCOVERAGE.SRTM3',
    //extent: [ -20037554.725947514, -8625918.87376409, 20037554.725947514, 8625918.87376409 ]
  },
  {
    title: 'MNS',
    url: 'https://data.geopf.fr/wms-r/wms',
    layer: 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES.MNS',
    extent: [
      -578959.605490584, 5203133.393641367, 921974.2487313666, 6643289.75487211,
    ],
  },
  {
    title: 'MNT-RGE-Alti',
    url: 'https://data.geopf.fr/wms-r/wms',
    layer: 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES',
    extent: [
      -7007874.496280316, -1460624.494037931, 5043253.3127169,
      6639937.650114076,
    ],
  },
  {
    title: 'MNT BDAlti V1',
    url: 'https://data.geopf.fr/wms-r/wms',
    layer: 'ELEVATION.ELEVATIONGRIDCOVERAGE',
    extent: [
      -7007874.496280316, -1460624.494037931, 5043253.3127169,
      6639937.650114076,
    ],
  },
];

// Add tile layer
const layer = layers[0];
const elev = new TileLayer({
  properties: { title: layer.title, displayInLayerSwitcher: false },
  extent: layer.extent,
  minResolution: 0,
  maxResolution: 197231.79878968254,
  source: new TileWMS({
    url: layer.url,
    projection: 'EPSG:3857',
    attributions: ['Geoservices-IGN'],
    crossOrigin: 'anonymous',
    params: {
      LAYERS: layer.layer,
      FORMAT: 'image/x-bil;bits=32',
      VERSION: '1.3.0',
    },
  }),
});
map.addLayer(elev);

// Tile load function to convert elevation
const alti = imageLoader.elevationMap();
elev.getSource()!.setTileLoadFunction(alti);

// Hide the layer (but keep it on the map)
const hide = new CSS({ display: false });
elev.addFilter(hide);

// Prevent layer smoothing
elev.on('prerender', ({ context }) => {
  if (context && 'imageSmoothingEnabled' in context)
    context.imageSmoothingEnabled = false;
});

// Add a popup to display elevation
const popup = new Tooltip();
map.addOverlay(popup);
map.on('pointermove', function (e) {
  const pix = elev.getData(e.pixel);
  const h = getElevationFromPixel(
    pix instanceof DataView
      ? new Uint8Array(pix.buffer, pix.byteOffset, pix.byteLength)
      : pix,
  );
  popup.setInfo(h > -5000 ? h.toFixed(2) + ' m' : '');
});

Object.assign(window, { hide });
