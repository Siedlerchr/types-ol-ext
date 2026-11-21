import Geoportail from 'ol-ext/layer/Geoportail';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import Map from 'ol/Map';
import View from 'ol/View';
import Legend from 'ol-ext/legend/Legend';
import ExtLegend from 'ol-ext/control/Legend';
import Style from 'ol/style/Style';
import RegularShape from 'ol/style/RegularShape';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Image from 'ol-ext/legend/Image';
import 'ol-ext/style/FontAwesomeDef';

// Layers
const layer = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' });
const geology = new TileLayer({
  properties: {
    title: 'Cartes géologiques',
    queryable: false,
    abstract: 'Cartes géologiques',
  },
  extent: [
    -20037508.342789244, -238107693.26496765, 20037508.342789244,
    238107693.26496765,
  ],
  minResolution: 3.1750000000000003,
  maxResolution: 3527.777777777778,
  source: new TileWMS({
    url: 'http://geoservices.brgm.fr/geologie?language=fre&',
    projection: 'EPSG:3857',
    attributions: ["<a href='http://www.brgm.fr/'>&copy; Brgm</a>"],
    crossOrigin: 'anonymous',
    params: {
      LAYERS: 'GEOLOGIE',
      FORMAT: 'image/png',
      VERSION: '1.3.0',
    },
  }),
});

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 7,
    center: [166326, 5992663],
  }),
  layers: [geology],
});

// Define a new legend
const legend = new Legend({
  title: 'Legend',
  margin: 5,
  maxWidth: 300,
});
const legendCtrl = new ExtLegend({
  legend: legend,
  collapsed: false,
});
map.addControl(legendCtrl);

const form = { Triangle: 3, Square: 4, Pentagon: 5, Hexagon: 6 };
for (const [i, points] of Object.entries(form)) {
  legend.addItem({
    title: i,
    typeGeom: 'Point',
    style: new Style({
      image: new RegularShape({
        points,
        radius: 15,
        stroke: new Stroke({ color: [255, 128, 0, 1], width: 1.5 }),
        fill: new Fill({ color: [255, 255, 0, 0.3] }),
      }),
    }),
  });
}
legend.addItem(
  new Image({
    title: 'Geology',
    src: 'http://geoservices.brgm.fr/geologie?language=fre&version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=GEOSERVICES_GEOLOGIE&format=image/png&STYLE=default',
  }),
);
