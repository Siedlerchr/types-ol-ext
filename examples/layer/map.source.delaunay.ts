import Polygon from 'ol/geom/Polygon';
import { downloadBlob } from '../.shared/download';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import RegularShape from 'ol/style/RegularShape';
import Text from 'ol/style/Text';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Delaunay from 'ol-ext/source/Delaunay';
import Bar from 'ol-ext/control/Bar';
import Draw from 'ol/interaction/Draw';
import Toggle from 'ol-ext/control/Toggle';
import Select from 'ol/interaction/Select';
import Hover from 'ol-ext/interaction/Hover';
import Circle from 'ol/geom/Circle';
import DropFile from 'ol-ext/interaction/DropFile';
import GeoJSON from 'ol/format/GeoJSON';
import { Geometry } from 'ol/geom';

declare const $: JQueryStatic;

function generate(nb: number) {
  const start = performance.now();
  const ext = map.getView().calculateExtent(map.getSize());
  for (let i = 0; i < nb; ++i) {
    const f = new Feature(
      new Point([
        ext[0] + (ext[2] - ext[0]) * Math.random(),
        ext[1] + (ext[3] - ext[1]) * Math.random(),
      ]),
    );
    nodes.addFeature(f);
  }
  console.log('Elapsed', (performance.now() - start) / 1000 + 's');
}

// Base layers
const layer = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' });

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 4,
    center: [205461, 5867916],
  }),
  layers: [layer],
});

// Default style
const fill = new Fill({
  color: 'rgba(255,255,255,0.4)',
});
const stroke = new Stroke({
  color: '#3399CC',
  width: 1.25,
});
const style = new Style({
  image: new RegularShape({
    stroke: stroke,
    points: 4,
    radius: 5,
    radius2: 0,
  }),
  text: new Text({
    font: 'bold 10px sans-serif',
    text: 'test',
    textAlign: 'left',
    textBaseline: 'bottom',
    offsetX: 3,
    offsetY: -3,
  }),
  fill: fill,
  stroke: stroke,
});

const redStyle = new Style({
  fill: new Fill({ color: [255, 0, 0, 0.2] }),
});
const voroStyle = new Style({
  stroke: new Stroke({ color: [128, 0, 0, 0.5], width: 1.25 }),
  fill: new Fill({ color: [128, 0, 0, 0.1] }),
});

// Node source
var nodes = new VectorSource();
let nb = 0;
nodes.on('addfeature', function (e) {
  e.feature?.set('id', nb++);
});
const vector = new VectorLayer({
  properties: { name: 'vector' },
  source: nodes,
  style: function (f) {
    style.getText()?.setText(String(f.get('id') || '0'));
    return style;
  },
});

// Delaunay source based on the node source
const delaunay = new Delaunay({
  source: nodes,
});
const triangle = new VectorLayer({
  properties: { name: 'triangle' },
  source: delaunay,
});

// In the map
map.addLayer(triangle);
map.addLayer(vector);

// Control Bar
const bar = new Bar({ toggleOne: true });
map.addControl(bar);

// Draw interaction to add new points
const draw = new Draw({ source: nodes, type: 'Point' });
bar.addControl(
  new Toggle({
    className: 'ol-text-button',
    html: 'add',
    interaction: draw,
    active: true,
  }),
);

// Delete
const del = new Select({
  layers: [vector],
  hitTolerance: 5,
});
del.on('select', function (e) {
  const f = e.selected[0];
  if (f) nodes.removeFeature(f);
  del.getFeatures().clear();
});
bar.addControl(
  new Toggle({
    className: 'ol-text-button',
    html: 'del',
    interaction: del,
  }),
);

/*
  // Draw interaction to add new points
  var modify = new ol.interaction.Modify({ source: nodes });
  bar.addControl(new ol.control.Toggle({
    className: 'ol-text-button',
    html: "mod",
    interaction: modify,
  }));
  modify.on('modifystart', function(e){
    console.log(e)
    var f = modify.dragSegments_[0][0].feature;
    //nodes.removeFeature(f)
  });
  modify.on('modifyend', function(e){
    console.log(e)
    var f = modify.dragSegments_[0][0].feature;
    //nodes.addFeature(f);
  });
*/

// Select
const circle = new VectorLayer({
  properties: { name: 'circle' },
  source: new VectorSource(),
  style: redStyle,
});
map.addLayer(circle);

// Voronoi
const voronoi = new VectorLayer({
  properties: { name: 'Voronoi' },
  source: new VectorSource(),
  style: voroStyle,
});
map.addLayer(voronoi);

let tout: string | number | NodeJS.Timeout | undefined;
delaunay.on('addfeature', function () {
  if (tout) clearTimeout(tout);
  tout = setTimeout(calculateVoronoi, 500);
});

function calculateVoronoi() {
  voronoi.getSource()!.clear();
  if (document.querySelector<HTMLInputElement>('#voronoi')!.checked) {
    const includeBorder =
      document.querySelector<HTMLInputElement>('#border')!.checked;
    voronoi.getSource()!.addFeatures(delaunay.calculateVoronoi(includeBorder));
  }
}
$('#voronoi').on('change', calculateVoronoi);
$('#border').on('change', calculateVoronoi);

// Show circumcircle on hover
const hover = new Hover({
  layers: [triangle],
});
hover.on('enter', function (e) {
  circle.getSource()!.clear();
  if (e.layer === triangle) {
    const geometry = e.feature.getGeometry();
    if (!(geometry instanceof Polygon)) return;
    const circleData = delaunay.getCircumCircle(geometry.getCoordinates()[0]);
    if (circleData.radius)
      circle
        .getSource()!
        .addFeature(
          new Feature(new Circle(circleData.center, circleData.radius)),
        );
  }
});
hover.on('leave', function (e) {
  circle.getSource()!.clear();
});
bar.addControl(
  new Toggle({
    className: 'ol-text-button',
    html: 'circle',
    interaction: hover,
  }),
);

// Import / export data
const dd = new DropFile();
map.addInteraction(dd);
dd.on('loadstart', function () {
  $('body').addClass('waiting');
});
dd.on('loadend', function () {
  $('body').removeClass('waiting');
});
dd.on('addfeatures', function (event) {
  const features = [];
  delaunay.clear();
  event.features.forEach(function (f) {
    if (f.getGeometry() instanceof Point) nodes.addFeature(f);
  });
});

function save(what: string) {
  const format = new GeoJSON();
  let features;
  if (what === 'delaunay') {
    features = delaunay.getFeatures();
  } else {
    features = voronoi.getSource()!.getFeatures();
  }
  const data = format.writeFeatures(features, {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection(),
  });
  const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, what + '.geojson');
}

Object.assign(window, { generate, save });
