import type { FeatureCollection } from 'geojson';
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
  downloadBlob(blob, name);
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
        let data: FeatureCollection;
        try {
          data = JSON.parse(reader.result);
          if (
            data.type !== 'FeatureCollection' ||
            !Array.isArray(data.features)
          )
            throw new Error('Expected a FeatureCollection');
        } catch (e) {
          $('.loading').html('<span class="warn">No valid file...</span>');
          return;
        }

        const goodFeatures = data.features.filter(
          (feature) => feature?.geometry,
        );
        $('.loading').html(
          ' ' +
            goodFeatures.length +
            ' feature(s) loaded / ' +
            data.features.length,
        );
        $('#pbar > div').width(0);
        $('button').show();
        data.features = goodFeatures;
        result = JSON.stringify(data); //, null, ' ')
        document.querySelector<HTMLInputElement>('#result')!.value = String(
          result.slice(0, 50000) + (result.length > 50000 ? '\n...' : ''),
        );
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
