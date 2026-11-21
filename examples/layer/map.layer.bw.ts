import Map from 'ol/Map';
import View from 'ol/View';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Permalink from 'ol-ext/control/Permalink';
import Geoportail from 'ol-ext/layer/Geoportail';
import Raster from 'ol/source/Raster';
import Image from 'ol/layer/Image';
import * as imageLoader from 'ol-ext/util/imagesLoader';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 10,
    center: [819375, 5465467],
  }),
});
map.addControl(new LayerSwitcher({ extent: true }));
map.addControl(new Permalink({ visible: false }));

// WMTS layer
const gp = new Geoportail('GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2');
map.addLayer(gp);

// Use raster source
const raster = new Raster({
  sources: [gp.getSource()!],
  operation: function (pixels) {
    const pixel = pixels[0] as number[];
    const lightness = (3 * pixel[0] + 4 * pixel[1] + pixel[2]) >>> 3;
    return [lightness, lightness, lightness, pixel[3]];
  },
});
const rasterLayer = new Image({
  visible: false,
  minResolution: gp.getMinResolution(),
  maxResolution: gp.getMaxResolution(),
  extent: gp.getExtent(),
  source: raster,
});
rasterLayer.set('title', gp.get('title') + ' - Raster op');
map.addLayer(rasterLayer);
gp.setVisible(false);

// Modify tiles on the flow using a tileload function
const gpbw = new Geoportail('GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2');
gpbw.set('title', gpbw.get('title') + ' - Grayscale');
gpbw.getSource()!.setTileLoadFunction(imageLoader.grayscale());
map.addLayer(gpbw);

// new layer JPG + turns white pixels transparent
Geoportail.register('ORTHOIMAGERY.ORTHOPHOTOS.URGENCE.ALEX', {
  layer: 'ORTHOIMAGERY.ORTHOPHOTOS.URGENCE.ALEX',
  theme: 'ortho',
  desc: 'Orthophotographie réalisée suite au passage de la tempête Alex dans les Alpes Maritimes',
  server: 'https://data.geopf.fr/wmts',
  bbox: [7.07917, 43.8095, 7.64199, 44.1903],
  format: 'image/jpeg',
  minZoom: 6,
  maxZoom: 20,
  originators: {
    Geoservices: {
      attribution: 'Géoservices',
      href: 'https://geoservices.ign.fr/',
    },
  },
  queryable: false,
  style: 'normal',
  tilematrix: 'PM',
  title: 'Orthophotographie d’urgence Alex',
});
const layer = new Geoportail({
  title: 'JPEG layer + transparent',
  layer: 'ORTHOIMAGERY.ORTHOPHOTOS.URGENCE.ALEX',
});
layer.getSource()!.setTileLoadFunction(
  imageLoader.transparent([
    [250, 250, 250],
    [255, 255, 255],
  ]),
);
map.addLayer(layer);
