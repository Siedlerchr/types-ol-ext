import Polygon from 'ol/geom/Polygon';
import { downloadBlob } from '../.shared/download';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Select from 'ol/interaction/Select';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import Modify from 'ol/interaction/Modify';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Circle from 'ol/geom/Circle';
import InseeBin from 'ol-ext/source/InseeBin';
import DropFile from 'ol-ext/interaction/DropFile';
import GeoJSON from 'ol/format/GeoJSON';
import * as proj from 'ol/proj';

declare const $: JQueryStatic;

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 4,
    center: [166326, 5992663],
  }),
  layers: [new TileLayer({ source: new OSM() })],
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
  const ext = grid.getSource()!.getGridExtent();
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
      features.push(f);
    }
  }
  source.clear(true);
  source.addFeatures(features);
  reset();
}

// Vector source
var source = new VectorSource();
// Interaction to move the source features
const modify = new Modify({ source: source });
modify.setActive(false);
map.addInteraction(modify);
const layerSource = new VectorLayer({ source: source, visible: false });
map.addLayer(layerSource);

// Style function
let min: number, max: number;
const circle = document.querySelector<HTMLInputElement>('#circle')!;
const prop = document.querySelector<HTMLInputElement>('#prop')!;
const styleFn = function (f: import('ol/Feature').FeatureLike) {
  let color;
  if (f.get('features').length > min + (2 * (max - min)) / 3)
    color = [136, 0, 0, 0.5];
  else if (f.get('features').length > min + (max - min) / 3)
    color = [255, 165, 0, 0.5];
  else color = [0, 136, 0, 0.5];
  // Proportional form
  return [
    new Style({
      fill: new Fill({ color: color }),
      geometry: (f) => {
        let scale = Math.min(1.2, f.get('features').length / max);
        const original = f.getGeometry();
        if (!(original instanceof Polygon)) return;
        let geom: Polygon | Circle = original;
        if (circle.checked) {
          const ext = original.getExtent();
          if (!prop.checked) scale = 1;
          geom = new Circle(
            [(ext[0] + ext[2]) / 2, (ext[1] + ext[3]) / 2],
            (scale * (ext[2] - ext[0])) / 2,
          );
        } else if (prop.checked) {
          geom = geom.clone();
          geom.scale(scale);
        }
        return geom;
      },
    }),
  ];
};
// The rid layer
var grid = new VectorLayer({
  style: styleFn,
  source: new InseeBin({
    source: source,
    size: 100000,
  }),
});
map.addLayer(grid);
// add 1000 features
addFeatures(1000);

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
  if (!document.querySelector<HTMLInputElement>('#add')!.checked)
    source.clear(true);
  source.addFeatures(f);
});

// Create Bin
function reset() {
  grid
    .getSource()!
    .setSize(
      Number(document.querySelector<HTMLInputElement>('#size')!.value) * 1000,
    );
  max = 0;
  min = Infinity;
  grid
    .getSource()!
    .getFeatures()
    .forEach(function (f) {
      const nb = f.get('features').length;
      if (nb > max) max = nb;
      if (nb < min) min = nb;
    });
  grid.changed();
}

// Save bin
function save() {
  let pop = false;
  $('.attributes select').each(function () {
    if (/pop/.test(String($(this).val() ?? ''))) pop = true;
  });
  if (pop) saveWithPop();
  else saveBin();
}

// Save
function saveBin(point = false) {
  const format = new GeoJSON();
  const features = grid.getSource()!.getGridFeatures();
  if (point) {
    features.forEach(function (f) {
      const geometry = f.getGeometry();
      if (geometry instanceof Polygon)
        f.setGeometry(geometry.getInteriorPoint());
    });
  }
  const data = format.writeFeatures(features, {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection(),
  });
  const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'grid.geojson');
}

// Add population to the grid
function saveWithPop() {
  $('body').addClass('waiting');
  $.ajax('../data/insee_1km.csv', {
    success: function (res) {
      const rows = String(res).split('\n').slice(1);
      grid
        .getSource()!
        .getFeatures()
        .forEach(function (b) {
          b.set('pop', 0);
        });
      rows.forEach(function (row) {
        const source = grid.getSource()!;
        const data = row.split(',').map(Number);
        if (data.length < 3 || !data.every(Number.isFinite)) return;
        let coord = [
          Number(data[0] * 1000) + 500,
          Number(data[1] * 1000) + 500,
        ];
        coord = proj.transform(
          coord,
          'EPSG:3035',
          map.getView().getProjection(),
        );
        const bin = source.getBinAt(coord);
        if (bin) {
          bin.set('pop', (bin.get('pop') || 0) + Number(data[2]));
        }
      });
      saveBin();
      $('body').removeClass('waiting');
    },
  });
}

// List of attribute to add to the cluster on save
function updateAttributes() {
  const f = source.getFeatures()[0];
  const ul = $('.attributes').html('');
  let found = false;
  for (const p in f.getProperties()) {
    if (p === 'geometry') continue;
    found = true;
    var li = $('<li>').appendTo(ul);
    $('<label>').text(p).appendTo(li);
    var sel = $('<select>').data('attr', p).appendTo(li);
    [
      'none',
      'nb/pop',
      'sum()',
      'sum()/pop',
      'sum()/area',
      'sum()/area/pop',
      'moy()',
      'moy()/pop',
      'moy()/area',
      'moy()/area/pop',
    ].forEach(function (op) {
      $('<option>').text(op).appendTo(sel);
    });
  }
  if (!found) {
    var li = $('<li>').text('no attributes to report...').appendTo(ul);
  }
  $('p.pop').show();
}

// Flatten attributes on save
grid.getSource()!.setFlatAttributesFn(function (bin, features) {
  /*
    if (bin.get('pop')) {
      bin.set('nb_pop',100*bin.get('nb')/bin.get('pop'));
    }
    */
  $('.attributes select').each(function () {
    const att = $(this).data('attr');
    let val = 0;
    const what = String($(this).val() ?? '');
    switch (what) {
      case 'nb/pop': {
        val = bin.get('nb');
        break;
      }
      case 'sum()':
      case 'sum()/pop':
      case 'sum()/area':
      case 'sum()/area/pop': {
        features.forEach(function (f) {
          val += parseFloat(f.get(att) || 0);
        });
        break;
      }
      case 'moy()':
      case 'moy()/pop':
      case 'moy()/area':
      case 'moy()/area/pop': {
        features.forEach(function (f) {
          val += parseFloat(f.get(att) || 0);
        });
        val /= features.length;
        break;
      }
      default:
        break;
    }
    if (what !== 'none') {
      if (/area/.test(what)) {
        const s = parseFloat(
          document.querySelector<HTMLInputElement>('#size')!.value,
        );
        val /= s * s;
      }
      if (/pop$/.test(what)) {
        const per = Number($('p.pop input').val() || 1);
        const p = per === 1 ? '' : '_' + per;
        if (what === 'nb/pop')
          bin.set('nb_pop' + p, (per * val) / bin.get('pop'));
        else bin.set(att + '_pop' + p, (per * val) / bin.get('pop'));
      } else {
        bin.set(att, val);
      }
    }
  });
});

Object.assign(window, {
  map,
  modify,
  layerSource,
  prop,
  reset,
  save,
  saveWithPop,
  updateAttributes,
});
