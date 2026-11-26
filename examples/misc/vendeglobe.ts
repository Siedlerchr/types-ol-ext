import LineString from 'ol/geom/LineString';
import MultiLineString from 'ol/geom/MultiLineString';
import { register } from 'ol/proj/proj4';
import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Style from 'ol/style/Style';
import RegularShape from 'ol/style/RegularShape';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Icon from 'ol/style/Icon';
import VectorSource from 'ol/source/Vector';
import GPX from 'ol/format/GPX';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Path from 'ol-ext/featureanimation/Path';
import * as easing from 'ol/easing';
import proj4 from 'proj4';
import { Geometry } from 'ol/geom';
import RenderFeature from 'ol/render/Feature';

// Define proj4 projection
proj4.defs(
  'EPSG:3031',
  '+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs',
);
proj4.defs(
  'EPSG:3032',
  '+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=70 +x_0=6000000 +y_0=6000000 +datum=WGS84 +units=m +no_defs +type=crs',
);
proj4.defs(
  'EPSG:9354',
  '+proj=stere +lat_0=-90 +lat_ts=-65 +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs',
);
proj4.defs(
  'EPSG:3412',
  '+proj=stere +lat_0=-90 +lat_ts=-70 +lon_0=0 +x_0=0 +y_0=0 +a=6378273 +b=6356889.449 +units=m +no_defs +type=crs',
);
register(proj4);
var proj = 'EPSG:3032';

// Layers
var layer = new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS');

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 0,
    //center: [740741, 5776642]
    center: [646752, 5407059],
    projection: proj,
  }),
  layers: [layer],
});

var style = [
  new Style({
    image: new RegularShape({
      radius: 10,
      points: 5,
      fill: new Fill({ color: 'blue' }),
    }),
    stroke: new Stroke({
      color: [255, 255, 255, 0.3],
      lineDash: [5, 4],
      width: 1,
    }),
    fill: new Fill({
      color: [0, 0, 255, 0.3],
    }),
  }),
];

// Red style
var redStyle = [
  new Style({
    image: new Icon({
      src: '../data/boat.svg',
    }),
  }),
];

// Triangle style
var img = new Image();
img.src = '../data/boat.png';
document.body.append(img);

var triangle = new Icon({
  src: '../data/boat.png',
  scale: 0.5,
});
triangle.load();

var styleTriangle = new Style({
  image: triangle,
  stroke: new Stroke({
    color: [0, 0, 255],
    width: 2,
  }),
  fill: new Fill({
    color: [0, 0, 255, 0.3],
  }),
});

// Vector layer
var source = new VectorSource({
  url: '../data/course.geojson',
  format: new GeoJSON(),
});
var vector = new VectorLayer({
  source: source,
  updateWhileAnimating: true,
  updateWhileInteracting: true,
  style: style,
});
map.addLayer(vector);

// Animation
let path: LineString | undefined;
source.once('featuresloadend', (event) => {
  const geometry = event.features?.[0]?.getGeometry();
  if (geometry instanceof LineString) path = geometry;
  else if (geometry instanceof MultiLineString)
    path = geometry.getLineString(0) ?? undefined;
});
const easings: Record<string, (value: number) => number> = easing;
// Add a feature on the map
var f, anim, controler;
function animateFeature() {
  if (path) {
    f = new Feature(new Point([0, 0]));
    if (document.querySelector<HTMLInputElement>('#rotation')!.checked)
      f.setStyle(styleTriangle);
    else f.setStyle(style);
    anim = new Path({
      path: path,
      rotate: document.querySelector<HTMLInputElement>('#rotation')!.checked,
      easing:
        easings[document.querySelector<HTMLInputElement>('#easing')!.value],
      speed: Number(document.querySelector<HTMLInputElement>('#speed')!.value),
      revers: document.querySelector<HTMLInputElement>('#revers')!.checked,
    });
    anim.on('animating', (e) => {
      if (e.geom instanceof Point)
        map.getView().setCenter(e.geom.getCoordinates());
      // map.getView().setRotation(e.rotation||0)
    });
    controler = vector.animateFeature(f, anim);
  }
}

/*
  for (var i=0; i<4; i++){
    setTimeout (animateFeature, i*500);
  }
  */

Object.assign(window, { animateFeature });
