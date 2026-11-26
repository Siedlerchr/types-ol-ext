import Geoportail from 'ol-ext/layer/Geoportail';
import CSS from 'ol-ext/filter/CSS';
import Map from 'ol/Map';
import View from 'ol/View';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Permalink from 'ol-ext/control/Permalink';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { seaLevelMap } from 'ol-ext/util/imagesLoader';
import 'ol-ext/filter/Base';

declare const $: JQueryStatic;

/*
@see
- https://github.com/awoodruff/canvas-shaded-relief
- https://github.com/GeodanDemo/hillshaderjs
- https://github.com/slutske22/leaflet-topography
- https://observablehq.com/@awoodruff/diy-hillshade
*/
const plan = new Geoportail({
  layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
  className: 'plan',
});
plan.addFilter(new CSS({ filter: 'grayscale(1)' }));
// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 10,
    center: [497835, 5383773],
  }),
  layers: [plan],
});
map.addControl(new LayerSwitcher());
map.addControl(new Permalink({ visible: false }));

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
    title: 'RGE-Alti',
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
const layer = layers[2];
const elev = new TileLayer({
  properties: { title: 'Sea level (' + layer.title + ')' },
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
elev.addFilter(new CSS({ blend: 'multiply' }));
map.addLayer(elev);

elev.getSource()!.setTileLoadFunction(seaLevelMap(0));

function setLevel(val: string | number) {
  $('#level').text(val);
  elev.getSource()!.setTileLoadFunction(seaLevelMap(Number(val)));
}

Object.assign(window, { setLevel });
