import GeoTIFF from 'ol/source/GeoTIFF';
import WebGLTile from 'ol/layer/WebGLTile';
import Map from 'ol/Map';
import Swipe from 'ol-ext/control/Swipe';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';

const source1 = new GeoTIFF({
  sources: [
    {
      url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/TCI.tif',
    },
  ],
});
const cogLeft = new WebGLTile({
  properties: { title: 'left' },
  source: source1,
});
const cogRight = new WebGLTile({
  properties: { title: 'right' },
  className: 'right',
  source: new GeoTIFF({
    sources: [
      {
        url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/TCI.tif',
      },
    ],
  }),
});
// The map
const map = new Map({
  target: 'map',
  view: source1.getView(),
  layers: [cogLeft, cogRight],
});

const ctrl = new Swipe();
map.addControl(ctrl);
ctrl.addLayer(cogRight, true);
ctrl.addLayer(cogLeft, false);

map.addControl(new LayerSwitcher());

Object.assign(window, { ctrl });
