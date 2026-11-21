import { register } from 'ol/proj/proj4';
import * as proj from 'ol/proj';
import Map from 'ol/Map';
import View, { FitOptions } from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Graticule from 'ol-ext/control/Graticule';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import proj4 from 'proj4';
import { Control } from 'ol/control';

// Define proj4 projection
proj4.defs(
  'EPSG:2154',
  '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);
proj4.defs(
  'EPSG:27700',
  '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs',
);
//proj4.defs("EPSG:32662","+proj=eqc +lat_ts=0 +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs");
//proj4.defs("EPSG:54024","+proj=bonne +lon_0=0 +lat_1=60 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs ");
proj4.defs(
  'EPSG:5479',
  '+proj=lcc +lat_1=-76.66666666666667 +lat_2=-79.33333333333333 +lat_0=-78 +lon_0=163 +x_0=7000000 +y_0=5000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);
proj4.defs(
  'EPSG:23032',
  '+proj=utm +zone=32 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs',
);
proj4.defs(
  'EPSG:21781',
  '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs',
);
proj4.defs(
  'EPSG:3413',
  '+proj=stere +lat_0=90 +lat_ts=70 +lon_0=-45 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs',
);
proj4.defs(
  'EPSG:2163',
  '+proj=laea +lat_0=45 +lon_0=-100 +x_0=0 +y_0=0 +a=6370997 +b=6370997 +units=m +no_defs',
);
proj4.defs(
  'ESRI:54009',
  '+proj=moll +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs',
);

// Define projection extent
register(proj4);
proj.get('EPSG:2154')!.setExtent([0, 6000000, 1250000, 7200000]);
proj.get('EPSG:27700')!.setExtent([0, 0, 800000, 1400000]);
proj
  .get('EPSG:5479')!
  .setExtent([6825737.53, 4189159.8, 9633741.96, 5782472.71]);
proj
  .get('EPSG:23032')!
  .setExtent([-1206118.71, 4021309.92, 1295389.0, 8051813.28]);
proj.get('EPSG:21781')!.setExtent([485071.54, 75346.36, 828515.78, 299941.84]);
proj.get('EPSG:3413')!.setExtent([-4194304, -4194304, 4194304, 4194304]);
proj
  .get('EPSG:2163')!
  .setExtent([
    /*-8040784.5135*/ -4000000, -2577524.921, 3668901.4484,
    /*4785105.1096*/ 4450000,
  ]);
proj.get('ESRI:54009')!.setExtent([-18e6, -9e6, 18e6, 9e6]);

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 6,
    center: [-20094, 6234453],
  }),
  // controls: ol.control.defaults({ "attribution": false }),
  layers: [
    new TileLayer({
      properties: { name: 'OSM' },
      source: new OSM(),
      visible: true,
    }),
  ],
});

const grat: Record<string, Graticule> = {
  '4326': new Graticule({
    step: 0.1,
    stepCoord: 5,
    margin: 5,
    projection: 'EPSG:4326',
    formatCoord: function (c) {
      return c.toFixed(1) + '°';
    },
  }),
  //'32662': new ol.control.Graticule({ step: 1000, stepCoord: 1, projection: 'EPSG:32662' }),
  '5479': new Graticule({ step: 1000, stepCoord: 1, projection: 'EPSG:5479' }),
  '23032': new Graticule({
    step: 1000,
    stepCoord: 1,
    projection: 'EPSG:23032',
  }),
  '21781': new Graticule({
    step: 1000,
    stepCoord: 5,
    projection: 'EPSG:21781',
  }),
  '3413': new Graticule({ step: 1000, stepCoord: 5, projection: 'EPSG:3413' }),
  '2163': new Graticule({ step: 1000, stepCoord: 5, projection: 'EPSG:2163' }),
  '54009': new Graticule({
    step: 1000,
    stepCoord: 5,
    projection: 'ESRI:54009',
  }),
  '2154': new Graticule({ step: 1000, stepCoord: 5, projection: 'EPSG:2154' }),
  '27700': new Graticule({
    step: 1000,
    stepCoord: 5,
    projection: 'EPSG:27700',
  }),
};

let graticule: Graticule | undefined;
function setGraticule(fit = false) {
  if (graticule) map.removeControl(graticule);
  graticule = grat[document.querySelector<HTMLInputElement>('#grat')!.value];
  const c = document.querySelector<HTMLInputElement>('#color')!.value;
  const style = new Style();
  if (document.querySelector<HTMLInputElement>('#line')!.checked)
    style.setStroke(new Stroke({ color: c, width: 1 }));
  if (document.querySelector<HTMLInputElement>('#border')!.checked)
    style.setFill(
      new Fill({
        color: document.querySelector<HTMLInputElement>('#line')!.checked
          ? '#fff'
          : '#000',
      }),
    );
  if (document.querySelector<HTMLInputElement>('#coords')!.checked)
    style.setText(
      new Text({
        stroke: new Stroke({ color: '#fff', width: 2 }),
        fill: new Fill({ color: c }),
        font:
          document.querySelector<HTMLInputElement>('#fontstyle')!.value +
          ' ' +
          document.querySelector<HTMLInputElement>('#fontsize')!.value +
          'px ' +
          document.querySelector<HTMLInputElement>('#font')!.value,
      }),
    );
  graticule.setStyle(style);
  map.addControl(graticule);
  const projection = graticule.get('projection');
  const extent = proj.get(projection)?.getExtent();
  if (fit && extent) {
    const view = map.getView();
    view.fit(proj.transformExtent(extent, projection, view.getProjection()), {
      size: map.getSize(),
    });
    const zoom = view.getZoom();
    if (zoom !== undefined) view.setZoom(zoom + 1);
  }
}
setGraticule();

/*
    var mousePositionControl = new ol.control.MousePosition(
    {	coordinateFormat: ol.coordinate.createStringXY(0),
      projection: 'EPSG:2154',
      undefinedHTML: '&nbsp;'
    });
    map.addControl (mousePositionControl);
    */

Object.assign(window, { setGraticule });
