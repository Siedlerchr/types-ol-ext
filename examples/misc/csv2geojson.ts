import type { FeatureCollection, Geometry } from 'geojson';
import { getPapaParse } from '../.shared/papaparse';
import { downloadBlob } from '../.shared/download';
import Map from 'ol/Map';
import View from 'ol/View';
import Geoportail from 'ol-ext/layer/Geoportail';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';

declare const $: JQueryStatic;

let name = '';
let rows: Record<string, string>[] = [];
function getGeoJSON() {
  const json: FeatureCollection = { type: 'FeatureCollection', features: [] };
  const point = document.querySelector<HTMLInputElement>('#lonlat')!.checked;
  const [lon, lat, type, geom] = ['lon', 'lat', 'type', 'geometry'].map(
    (field) =>
      document.querySelector<HTMLSelectElement>(`label.${field} select`)!.value,
  );
  for (const row of rows) {
    const properties = { ...row };
    let geometry: Geometry;
    if (point) {
      const coordinates = [
        Number.parseFloat(row[lon]),
        Number.parseFloat(row[lat]),
      ];
      if (!coordinates.every(Number.isFinite)) continue;
      geometry = { type: 'Point', coordinates };
      delete properties[lon];
      delete properties[lat];
    } else {
      try {
        const coordinates = JSON.parse(row[geom]);
        geometry = (
          row[type] === 'GeometryCollection'
            ? { type: row[type], geometries: coordinates }
            : { type: row[type], coordinates }
        ) as Geometry;
      } catch {
        continue;
      }
      delete properties[type];
      delete properties[geom];
    }
    json.features.push({ type: 'Feature', properties, geometry });
  }
  const res = JSON.stringify(json, null, ' ');
  if (res.length > 5000) {
    $('textarea').val(res.slice(0, 5000) + '\n...');
  } else {
    $('textarea').val(res);
  }
  return res;
}
function download() {
  const res = getGeoJSON();
  const blob = new Blob([res], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, name + '.geojson');
}

$(document).on('dragover dragleave', function (e) {
  e.preventDefault();
  e.stopPropagation();
  if (e.type == 'dragover') $('#dropfile').addClass('hover');
  else $('#dropfile').removeClass('hover');
  return false;
});

function showLonlat() {
  if ($('label.lon select').val() && $('label.lat select').val()) {
    $('button').show();
    getGeoJSON();
  } else $('button').hide();
}
$('#lonlat').on('click', showLonlat);
$('label.lon select').on('change', showLonlat);
$('label.lat select').on('change', showLonlat);

function showGeom() {
  if ($('label.type select').val() && $('label.geometry select').val()) {
    $('button').show();
    getGeoJSON();
  } else $('button').hide();
}
$('#geom').on('click', showGeom);
$('label.type select').on('change', showGeom);
$('label.geometry select').on('change', showGeom);

$(document).on('drop', function (e) {
  const transfer = e.originalEvent?.dataTransfer;
  if (transfer) {
    if (transfer.files.length) {
      // Stop the propagation of the event
      e.preventDefault();
      e.stopPropagation();
      $('#dropfile').removeClass('hover');
      $('.loading').html(' loading...');
      // Main function to upload
      const file = transfer.files[0];
      name = file.name.split('.').slice(0, -1).join('.');
      getPapaParse().parse(file, {
        header: true,
        complete: function (results) {
          rows = results.data;
          $('label.lon select').html('');
          $('label.lat select').html('');
          $('label.type select').html('');
          $('label.geometry select').html('');
          results.meta.fields?.forEach(function (att) {
            $('<option>')
              .val(att)
              .text(att)
              .prop('selected', /^long?$|longitude/i.test(att))
              .appendTo($('label.lon select'));
            $('<option>')
              .val(att)
              .text(att)
              .prop('selected', /^lat$|latitude/i.test(att))
              .appendTo($('label.lat select'));
            $('<option>')
              .val(att)
              .text(att)
              .prop('selected', /^type$/i.test(att))
              .appendTo($('label.type select'));
            $('<option>')
              .val(att)
              .text(att)
              .prop('selected', /^geom|^coord/i.test(att))
              .appendTo($('label.geometry select'));
          });
          $('.loading').html('');
          $('label.lon select').change();
        },
      });
    }
  } else {
    $(this).css('border', '3px dashed #BBBBBB');
  }
  return false;
});

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 1,
    center: [270055, 3528229],
  }),
  layers: [new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' })],
});

const vector = new VectorLayer({
  source: new VectorSource(),
  style: new Style({
    image: new Circle({
      fill: new Fill({ color: 'rgba(102, 68, 68, 0.6)' }),
      radius: 5,
    }),
  }),
});
map.addLayer(vector);

Object.assign(window, { download });
