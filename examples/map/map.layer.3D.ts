import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import Renderer from 'ol-ext/layer/Render3D';
import 'ol-ext/filter/Base';

const layer = new TileLayer({ source: new OSM() });
// layer.addFilter(new ol.filter.Colorize('invert'));

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 19,
    center: [-245406, 5986536], // [-245575, 5986863], //[-244777, 5989809]
  }),
  layers: [layer],
});

// Create layer
const vectorSource = new VectorSource({
  url: '../data/ignf.json',
  // projection: 'EPSG:3857',
  format: new GeoJSON(),
  attributions: [
    "&copy; <a href='http://professionnels.ign.fr/bdtopo'>ign.fr</a>",
  ],
});
const vector = new VectorLayer({
  source: vectorSource,
  /*
    style: new ol.style.Style({
      fill: new ol.style.Fill({ color: '#333' })
    }),
    */
  maxResolution: 2,
});
map.addLayer(vector);

const dbpSource = new VectorSource({
  url: '../data/dbpedia.json',
  format: new GeoJSON(),
  attributions: ['&copy; DBPedia'],
});
const dbp = new VectorLayer({
  source: dbpSource,
});
map.addLayer(dbp);

// Set 3D renderer
const r3D = new Renderer({
  /** /
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'blue',
        width: 2
      }),
      fill: new ol.style.Fill({ color: 'red' })
    }),
    /**/
  // ghost: true,
  height: 0,
  maxResolution: 0.6,
  defaultHeight: 3.5,
});
vector.setRender3D(r3D);
vectorSource.once('featuresloadend', () => {
  document.querySelector<HTMLElement>('.loading')!.hidden = true;
  setTimeout(doAnime, 200);
});
const r3D2 = new Renderer({ height: 100, maxResolution: 10 });
dbp.setRender3D(r3D2);

let height: number | string = 0;
function doAnime() {
  if (r3D.animating()) return;
  r3D2.animate({ height: height ? 0 : 100 });
  height = height ? 0 : 'HAUTEUR';
  r3D.animate({ height: height });
}

Object.assign(window, { doAnime });
