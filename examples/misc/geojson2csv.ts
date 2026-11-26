import type { FeatureCollection } from 'geojson';
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
let result = '';
function download() {
  const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, name + '.csv');
}

$(document).on('dragover dragleave', function (e) {
  e.preventDefault();
  e.stopPropagation();
  if (e.type == 'dragover') $('#dropfile').addClass('hover');
  else $('#dropfile').removeClass('hover');
  return false;
});

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
      name = file.name;
      const reader = new FileReader();
      reader.onload = function (event) {
        if (typeof reader.result !== 'string') return;
        try {
          const json: FeatureCollection = JSON.parse(reader.result);
          if (
            json.type !== 'FeatureCollection' ||
            !Array.isArray(json.features)
          )
            throw new Error('Expected a FeatureCollection');
          const features = json.features.filter((feature) => feature?.geometry);
          const fields = [
            ...new Set(
              features.flatMap((feature) =>
                Object.keys(feature.properties ?? {}),
              ),
            ),
          ];
          const pointOnly = features.every(
            (feature) => feature.geometry.type === 'Point',
          );
          const csv: (string | number)[][] = [
            [...fields, ...(pointOnly ? ['lon', 'lat'] : ['type', 'coord'])],
          ];
          for (const feature of features) {
            const geometry = feature.geometry;
            const row = fields.map((key) => {
              const value = feature.properties?.[key];
              return typeof value === 'number' || typeof value === 'string'
                ? value
                : value == null
                  ? ''
                  : JSON.stringify(value);
            });
            if (pointOnly && geometry.type === 'Point') {
              row.push(geometry.coordinates[0], geometry.coordinates[1]);
            } else {
              row.push(
                geometry.type,
                JSON.stringify(
                  geometry.type === 'GeometryCollection'
                    ? geometry.geometries
                    : geometry.coordinates,
                ),
              );
            }
            csv.push(row);
          }
          result = getPapaParse().unparse(csv);
          $('.loading').text(` ${features.length} feature(s) loaded.`);
        } catch {
          $('.loading').html('<span class="warn">No valid file...</span>');
          return;
        }
        document.querySelector<HTMLInputElement>('#result')!.value = String(
          result.slice(0, 50000) + (result.length > 50000 ? '\n...' : ''),
        );

        $('#pbar > div').width(0);
        $('button').show();
      };
      reader.readAsText(
        file,
        document.querySelector<HTMLInputElement>('#encode')!.value,
      );
    }
  } else $(this).css('border', '3px dashed #BBBBBB');
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
