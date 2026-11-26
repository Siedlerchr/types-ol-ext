import { downloadBlob } from '../.shared/download';
import { register } from 'ol/proj/proj4';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Select from 'ol/interaction/Select';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import DropFile from 'ol-ext/interaction/DropFile';
import * as proj from 'ol/proj';
import { ol_coordinate_dist2d } from 'ol-ext/geom/GeomUtils';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import GeoJSON from 'ol/format/GeoJSON';
import proj4 from 'proj4';

declare const $: JQueryStatic;

// Define proj4 projection
proj4.defs(
  'EPSG:2154',
  '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);
proj4.defs(
  'EPSG:3035',
  '+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +units=m +no_defs',
);
proj4.defs(
  'EPSG:27700',
  '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs',
);
proj4.defs(
  'EPSG:23032',
  '+proj=utm +zone=32 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs',
);
proj4.defs(
  'EPSG:2163',
  '+proj=laea +lat_0=45 +lon_0=-100 +x_0=0 +y_0=0 +a=6370997 +b=6370997 +units=m +no_defs',
);

// Define projection extent
register(proj4);

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 4,
    center: [166326, 5992663],
  }),
  layers: [new TileLayer({ source: new OSM() })],
});

var select = new Select();
map.addInteraction(select);
select.on('select', function (e) {
  if (e.selected.length) {
    var f = e.selected[0].get('features');
    console.log(f.getProperties());
    if (f) $('.options .info span').text(e.selected[0].get('features').length);
    else $('.options .info span').text('0');
  } else $('.options .info span').text('0');
});

// Vector source
var source = new VectorSource();

// The grid layer
var grid = new VectorLayer({
  source: new VectorSource(),
});
map.addLayer(grid);

// Add feature on drop
var dd = new DropFile();
map.addInteraction(dd);
dd.on('loadstart', function () {
  $('body').addClass('waiting');
});
dd.on('loadend', function () {
  $('body').removeClass('waiting');
});
dd.on('addfeatures', function (event) {
  var f = event.features;
  if (!document.querySelector<HTMLInputElement>('#add')!.checked)
    source.clear(true);
  source.addFeatures(f);
  const extent = source.getExtent();
  if (extent) map.getView().fit(extent);
  //    reset()
});

function setProjection(p: string) {
  var p1 = map.getView().getCenter();
  if (!p1) return;
  const p2 = [p1[0], p1[1] + 1];
  var p01 = proj.transform(
    p1,
    map.getView().getProjection(),
    grid.getSource()!.get('gridProjection'),
  );
  var p02 = proj.transform(
    p2,
    map.getView().getProjection(),
    grid.getSource()!.get('gridProjection'),
  );
  grid.getSource()!.set('gridProjection', 'EPSG:' + p);
  var p11 = proj.transform(
    p1,
    map.getView().getProjection(),
    grid.getSource()!.get('gridProjection'),
  );
  var p12 = proj.transform(
    p2,
    map.getView().getProjection(),
    grid.getSource()!.get('gridProjection'),
  );
  var d =
    (Number(document.querySelector<HTMLInputElement>('#size')!.value) *
      ol_coordinate_dist2d(p11, p12)) /
    ol_coordinate_dist2d(p01, p02);
  document.querySelector<HTMLInputElement>('#size')!.value = String(
    Math.max(0.5, Math.round(d)),
  );
  //grid.getSource().setGridProjection('EPSG:'+p);
  //calcMinMax();
  reset();
}

function reset() {
  grid.getSource()!.clear();
  const ext = map.getView().calculateExtent();
  var step = parseFloat(
    document.querySelector<HTMLInputElement>('#size')!.value,
  );
  if (!Number.isFinite(step) || step <= 0) return;
  ext.forEach((c, i) => (ext[i] = Math.round(c / step) * step));
  /* split */
  // ext[2] = (ext[0]+ext[2])/2
  // ext[3] = (ext[1]+ext[3])/2
  /**/
  console.log('RESET', ext, step);
  // map.getView().fit(ext)
  var features = [];
  for (var x = ext[0]; x < ext[2]; x += step) {
    for (var y = ext[1]; y < ext[3]; y += step) {
      var f = source.getFeaturesAtCoordinate([x, y])[0];
      if (f) {
        var fp = new Feature(new Point([x, y]));
        Object.keys(f.getProperties()).forEach((p) => {
          if (!fp.get(p)) {
            fp.set(p, f.get(p));
          }
        });
        features.push(fp);
      }
    }
  }
  grid.getSource()!.addFeatures(features);
  console.log('finish');
}

// Save
function save() {
  console.log('save');
  var format = new GeoJSON();
  var features = grid.getSource()!.getFeatures();
  var data = format.writeFeatures(features, {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection(),
  });
  var blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'grid.geojson');
}

/*
  grid.getSource().setFlatAttributesFn(function (bin, features) {
  });
  */

Object.assign(window, { setProjection, reset, save });
