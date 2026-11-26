import { downloadBlob } from '../.shared/download';
import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';
import GeoJSONX from 'ol-ext/format/GeoJSONX';
import VectorImage from 'ol/layer/VectorImage';
import DropFile from 'ol-ext/interaction/DropFile';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Select from 'ol/interaction/Select';
import Simplificator from 'ol-ext/geom/Simplificator';
import Range from 'ol-ext/util/input/Range';
import Switch from 'ol-ext/util/input/Switch';
import { ol_coordinate_dist2d } from 'ol-ext/geom/GeomUtils';
import GeoJSON from 'ol/format/GeoJSON';

// Two base layers
var layer = new Geoportail({
  layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
  visible: false,
});

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 7,
    center: [205461, 5867916],
  }),
  layers: [layer],
});

var vectorSource = new VectorSource({
  url: '../data/departements.geojsonx',
  format: new GeoJSONX(),
  attributions: [
    "&copy; <a href='https://www.insee.fr'>INSEE</a>",
    "&copy; <a href='https://www.data.gouv.fr/fr/datasets/geofla-r/'>IGN</a>",
  ],
});
map.addLayer(
  new VectorImage({
    properties: { name: 'Departements' },
    source: vectorSource,
  }),
);

var ddrop = new DropFile();
map.addInteraction(ddrop);
ddrop.on('addfeatures', function (e) {
  console.log('loading');
  vectorSource.clear();
  vectorSource.addFeatures(e.features);
  const extent = vectorSource.getExtent();
  if (extent) map.getView().fit(extent);
  simplify();
});

/*
  var result = new ol.source.Vector
  map.addLayer(new ol.layer.Vector({
    name: 'Simplify',
    source: result,
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'red',
        width: 1.5
      })
    })
  }))
*/

const edges = new VectorSource();
const edgeLayer = new VectorImage({
  source: edges,
  style: function (f) {
    return new Style({
      stroke: new Stroke({
        color: f.get('edge').length > 1 ? 'red' : 'green',
        width: 1.5,
      }),
    });
  },
});
map.addLayer(edgeLayer);

var sel = new Select({
  // layers: [layer],
  hitTolerance: 3,
  multi: true,
});
map.addInteraction(sel);
sel.on('select', function (e) {
  var f = e.selected[0];
  if (f) {
    console.log(e.selected, f.getProperties());
  }
});

const simplificator = new Simplificator();
let nb0 = 0;
function simplify() {
  simplificator.setFeatures(vectorSource.getFeatures(), 3);
  edges.clear();
  edges.addFeatures(simplificator.getEdges());
  // Count vertex
  nb0 = 0;
  simplificator.getEdges().forEach(function (f) {
    nb0 += f.getGeometry()?.getCoordinates().length ?? 0;
  });
  document.querySelector('.nb')!.textContent = nb0.toLocaleString();
  document.getElementById('simplificator')!.style.display = 'block';
  document.querySelector<HTMLButtonElement>('.options button')!.style.display =
    'none';
}

var range = new Range({
  input: document.querySelector<HTMLInputElement>('#simplificator input')!,
});
range.on('change:value', function (e) {
  if (!filtering) {
    filter(e.value);
  }
});

var check = new Switch({
  input: document.querySelector('#simplificator input[type="checkbox"]')!,
  html: 'Douglas Peucker',
  after: 'Visvalingam',
});
check.on('check', function () {
  filter(range.getValue());
});

var filtering = false;
function filter(val: string | number) {
  val = Number(val);
  const ex = vectorSource.getFeatures()[0]?.getGeometry()?.getExtent();
  if (ex) {
    filtering = true;
    if (check.isChecked()) {
      var d = ol_coordinate_dist2d([ex[0], ex[1]], [ex[2], ex[3]]) / 50000;
      simplificator.simplifyVisvalingam({
        dist: d * val * val || 0.1,
        minPoints: 4,
      });
    } else {
      var d = ol_coordinate_dist2d([ex[0], ex[1]], [ex[2], ex[3]]) / 500000;
      simplificator.simplify(d * val * val);
    }
    var nb = 0;
    simplificator.getEdges().forEach(function (f) {
      nb += f.getGeometry()?.getCoordinates().length ?? 0;
    });
    document.querySelector('.nb')!.textContent =
      nb.toLocaleString() + '/' + nb0.toLocaleString();
    setTimeout(function () {
      filtering = false;
      if (range.getValue() != val) filter(range.getValue());
    }, 0);
  }
}

function save() {
  var features = vectorSource.getFeatures();
  var format = new GeoJSON();
  var data = format.writeFeatures(features, {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection(),
  });
  var blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'map.geojson');
}

Object.assign(window, { simplificator, simplify, save });
