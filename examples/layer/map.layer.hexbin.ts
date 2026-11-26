import { downloadBlob } from '../.shared/download';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Colorize from 'ol-ext/filter/Colorize';
import Map from 'ol/Map';
import View from 'ol/View';
import Select from 'ol/interaction/Select';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import Modify from 'ol/interaction/Modify';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import RegularShape from 'ol/style/RegularShape';
import Fill from 'ol/style/Fill';
import HexBin from 'ol-ext/source/HexBin';
import VectorImage from 'ol/layer/VectorImage';
import DropFile from 'ol-ext/interaction/DropFile';
import GeoJSON from 'ol/format/GeoJSON';
import * as extent from 'ol/extent';
import Polygon from 'ol/geom/Polygon';
import 'ol-ext/filter/Base';
import BaseLayer from 'ol/layer/Base';
import { Coordinate } from 'ol/coordinate';

declare const $: JQueryStatic;

const osm = new TileLayer({ properties: { title: 'OSM' }, source: new OSM() });
osm.addFilter(new Colorize({ operation: 'grayscale' }));
// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 4,
    center: [166326, 5992663],
  }),
  layers: [osm],
});

const select = new Select();
map.addInteraction(select);
select.on('select', function (e) {
  if (e.selected.length) {
    const f = e.selected[0].get('features');
    if (f) $('.options .info span').text(e.selected[0].get('features').length);
    else $('.options .info span').text('0');
  } else $('.options .info span').text('0');
});

// Create a set of features on seed points
function addFeatures(nb: number) {
  const ssize = 20; // seed size
  const ext = map.getView().calculateExtent(map.getSize());
  const dx = ext[2] - ext[0];
  const dy = ext[3] - ext[1];
  const dl = Math.min(dx, dy);
  const features = [];
  for (let i = 0; i < nb / ssize; ++i) {
    const seed = [ext[0] + dx * Math.random(), ext[1] + dy * Math.random()];
    for (let j = 0; j < ssize; j++) {
      const f = new Feature(
        new Point([
          seed[0] + (dl / 10) * Math.random(),
          seed[1] + (dl / 10) * Math.random(),
        ]),
      );
      f.set('id', i * ssize + j);
      features.push(f);
    }
  }
  source.clear(true);
  source.addFeatures(features);
}

// Print control
/*
  var printControl = new ol.control.Print({ copyToClipboard: true });
  printControl.on('print', function(e) {
    printControl.toClipboard(e, function(b) {
      if (b) console.log('Map has been copied...')
    });
  });
  map.addControl(printControl);
  */

// Vector source
var source = new VectorSource();
// add 2000 features
addFeatures(2000);
// Interaction to move the source features
const modify = new Modify({ source: source });
modify.setActive(false);
map.addInteraction(modify);
const layerSource = new VectorLayer({
  properties: { title: 'Source' },
  source: source,
  visible: false,
});
map.addLayer(layerSource);

let hexbin: HexBin | undefined;
let layer: VectorLayer<HexBin> | VectorImage<HexBin> | undefined;
let binSize = 0;
const style = $('#style');
let min = 0;
let max = 0;
const minRadius = 1;
const styleFn = function (f: import('ol/Feature').FeatureLike, res: number) {
  switch (style.val()) {
    // Display a point with a radius
    // depending on the number of objects in the aggregate.
    case 'point': {
      let radius =
        Math.round(binSize / res + 0.5) *
        Math.min(1, f.get('features').length / max);
      if (radius < minRadius) radius = minRadius;
      return [
        new Style({
          image: new RegularShape({
            points: 6,
            radius: radius,
            fill: new Fill({ color: [0, 0, 255] }),
            rotateWithView: true,
          }),
          geometry: new Point(f.get('center')),
        }),
        //, new ol.style.Style({ fill: new ol.style.Fill({color: [0,0,255,.1] }) })
      ];
    }
    // Display the polygon with a gradient value (opacity)
    // depending on the number of objects in the aggregate.
    case 'gradient': {
      const opacity = Math.min(1, f.get('features').length / max);
      return [new Style({ fill: new Fill({ color: [0, 0, 255, opacity] }) })];
    }
    // Display the polygon with a color
    // depending on the number of objects in the aggregate.
    case 'color':
    default: {
      let color;
      if (f.get('features').length > max) color = [136, 0, 0, 1];
      else if (f.get('features').length > min) color = [255, 165, 0, 1];
      else color = [0, 136, 0, 1];
      return [new Style({ fill: new Fill({ color: color }) })];
    }
  }
};

// Create HexBin and calculate min/max
function reset() {
  const size = Number(document.querySelector<HTMLInputElement>('#size')!.value);
  if (layer) map.removeLayer(layer);
  binSize = size;
  let features;
  hexbin = new HexBin({
    source: source, // source of the bin
    size: size, // hexagon size (in map unit)
  });
  const vClass = document.querySelector<HTMLInputElement>('#image')!.checked
    ? VectorImage
    : VectorLayer;
  layer = new vClass({
    properties: { title: 'Bin' },
    source: hexbin,
    opacity: 0.5,
    style: styleFn,
  });
  features = hexbin.getFeatures();
  // Calculate min/ max value
  min = Infinity;
  max = 0;
  for (var i = 0, f; (f = features[i]); i++) {
    const n = f.get('features').length;
    if (n < min) min = n;
    if (n > max) max = n;
  }
  const dl = max - min;

  min = Math.max(1, Math.round(dl / 4));
  max = Math.round(max - dl / 3);
  $('.min').text(min);
  $('.max').text(max);
  $('.imin').val(min);
  $('.imax').val(max);

  // Add layer
  map.addLayer(layer);
}
reset();

$('.interval').on('change', function () {
  min = Number($('.imin').val()) || min;
  max = Number($('.imax').val()) || max;
  $('.min').text(min);
  $('.max').text(max);
  hexbin?.changed();
});

// Add feature on drop
const dd = new DropFile();
map.addInteraction(dd);
dd.on('loadstart', function () {
  $('body').addClass('waiting');
});
dd.on('loadend', function () {
  $('body').removeClass('waiting');
});
dd.on('addfeatures', function (event) {
  const f = event.features;
  if (!document.querySelector<HTMLInputElement>('#add')!.checked) {
    source.clear(true);
  }
  source.addFeatures(f);
});

// Save
function save() {
  const format = new GeoJSON();
  if (!hexbin) return;
  const hexa = hexbin.getHexFeatures();
  if (style.val() === 'point') {
    const first = hexa[0]?.getGeometry();
    const resolution = map.getView().getResolution();
    if (first && resolution !== undefined) {
      const size = first.getExtent();
      const minVal = (minRadius * resolution) / (size[2] - size[0]);
      for (const feature of hexa) {
        const geometry = feature.getGeometry();
        if (geometry instanceof Polygon) {
          const radius = Math.max(minVal, Math.min(1, feature.get('nb') / max));
          geometry.scale(
            radius,
            radius,
            extent.getCenter(geometry.getExtent()),
          );
        }
      }
    }
  }
  const data = format.writeFeatures(hexa, {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection(),
  });
  const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'hexmap.geojson');
}

Object.assign(window, { map, modify, layerSource, reset, save });

Object.defineProperty(window, 'hexbin', { get: () => hexbin });
