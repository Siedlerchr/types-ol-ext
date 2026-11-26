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
import Raster from 'ol/source/Raster';
import Image from 'ol/layer/Image';
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
const layer = layers[2];
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

// SHADE
/**
 * Generates a shaded relief image given elevation data.  Uses a 3x3
 * neighborhood for determining slope and aspect.
 * @param {Array<ImageData>} inputs Array of input images.
 * @param {Object} data Data added in the "beforeoperations" event.
 * @return {ImageData} Output image.
 */
function calculateShade(
  inputs: number[][] | ImageData[],
  data: { resolution: number; sunEl: number; sunAz: number; vert: number },
) {
  const elevationImage = inputs[0] as ImageData;
  const width = elevationImage.width;
  const height = elevationImage.height;
  const elevationData = elevationImage.data;
  const shadeData = new Uint8ClampedArray(elevationData.length);
  const dp = data.resolution * 2;
  const maxX = width - 1;
  const maxY = height - 1;
  const pixel = [0, 0, 0, 0];
  const twoPi = 2 * Math.PI;
  const halfPi = Math.PI / 2;
  const sunEl = (Math.PI * data.sunEl) / 180;
  const sunAz = (Math.PI * data.sunAz) / 180;
  const cosSunEl = Math.cos(sunEl);
  const sinSunEl = Math.sin(sunEl);
  let pixelX,
    pixelY,
    x0,
    x1,
    y0,
    y1,
    offset,
    z0,
    z1,
    dzdx,
    dzdy,
    slope,
    aspect,
    cosIncidence,
    scaled;
  function calculateElevation(pixel: number[]) {
    // The method used to extract elevations from the DEM.
    // In this case the format used is
    // red + green * 2 + blue * 3
    //
    // Other frequently used methods include the Mapbox format
    // (red * 256 * 256 + green * 256 + blue) * 0.1 - 10000
    // and the Terrarium format
    // (red * 256 + green + blue / 256) - 32768
    //
    // return pixel[0] + pixel[1] * 2 + pixel[2] * 3;
    return -12000 + ((pixel[0] << 16) + (pixel[1] << 8) + pixel[2]) * 0.01;
    // return -12000 + ((pixel[0] * 256 * 256 + pixel[1] * 256 + pixel[2]) * 0.01)
  }
  for (pixelY = 0; pixelY <= maxY; ++pixelY) {
    y0 = pixelY === 0 ? 0 : pixelY - 1;
    y1 = pixelY === maxY ? maxY : pixelY + 1;
    for (pixelX = 0; pixelX <= maxX; ++pixelX) {
      x0 = pixelX === 0 ? 0 : pixelX - 1;
      x1 = pixelX === maxX ? maxX : pixelX + 1;

      // determine elevation for (x0, pixelY)
      offset = (pixelY * width + x0) * 4;
      pixel[0] = elevationData[offset];
      pixel[1] = elevationData[offset + 1];
      pixel[2] = elevationData[offset + 2];
      pixel[3] = elevationData[offset + 3];
      z0 = data.vert * calculateElevation(pixel);

      // determine elevation for (x1, pixelY)
      offset = (pixelY * width + x1) * 4;
      pixel[0] = elevationData[offset];
      pixel[1] = elevationData[offset + 1];
      pixel[2] = elevationData[offset + 2];
      pixel[3] = elevationData[offset + 3];
      z1 = data.vert * calculateElevation(pixel);

      dzdx = (z1 - z0) / dp;

      // determine elevation for (pixelX, y0)
      offset = (y0 * width + pixelX) * 4;
      pixel[0] = elevationData[offset];
      pixel[1] = elevationData[offset + 1];
      pixel[2] = elevationData[offset + 2];
      pixel[3] = elevationData[offset + 3];
      z0 = data.vert * calculateElevation(pixel);

      // determine elevation for (pixelX, y1)
      offset = (y1 * width + pixelX) * 4;
      pixel[0] = elevationData[offset];
      pixel[1] = elevationData[offset + 1];
      pixel[2] = elevationData[offset + 2];
      pixel[3] = elevationData[offset + 3];
      z1 = data.vert * calculateElevation(pixel);

      dzdy = (z1 - z0) / dp;

      slope = Math.atan(Math.sqrt(dzdx * dzdx + dzdy * dzdy));

      aspect = Math.atan2(dzdy, -dzdx);
      if (aspect < 0) {
        aspect = halfPi - aspect;
      } else if (aspect > halfPi) {
        aspect = twoPi - aspect + halfPi;
      } else {
        aspect = halfPi - aspect;
      }

      cosIncidence =
        sinSunEl * Math.cos(slope) +
        cosSunEl * Math.sin(slope) * Math.cos(sunAz - aspect);

      offset = (pixelY * width + pixelX) * 4;
      scaled = Math.round(255 * cosIncidence);

      shadeData[offset] = 0;
      shadeData[offset + 1] = 0;
      shadeData[offset + 2] = 0;
      shadeData[offset + 3] = scaled;
    }
  }

  return new ImageData(shadeData, width, height);
}

const raster = new Raster({
  sources: [elev.getSource()!],
  operationType: 'image',
  operation: calculateShade,
});
const shade = new Image({
  className: 'shade',
  opacity: 0.5,
  source: raster,
});
const blurFilter = new CSS({ filter: 'blur(2px)' });
shade.set('title', 'Shaded relief');
shade.addFilter(blurFilter);
map.addLayer(shade);
map.getView().on('change:resolution', function () {
  blurFilter.setFilter(
    'blur(' + Math.round((map.getView().getZoom() ?? 0) / 4) + 'px)',
  );
});

const controls = {
  vert: 5,
  sunEl: 0,
  sunAz: 180,
};
raster.on('beforeoperations', function (event) {
  // the event.data object will be passed to operations
  const data = event.data;
  data.resolution = event.resolution;
  Object.assign(data, controls);
});

Object.assign(window, { hide });
