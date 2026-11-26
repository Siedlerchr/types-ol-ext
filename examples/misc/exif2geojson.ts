import { downloadBlob } from '../.shared/download';
import exif2geojson from 'ol-ext/utils/Exif2Geojson';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import Geoportail from 'ol-ext/layer/Geoportail';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';

declare const $: JQueryStatic;

function download() {
  const blob = new Blob(
    [document.querySelector<HTMLInputElement>('#result')!.value],
    { type: 'text/plain;charset=utf-8' },
  );
  console.log(blob);
  downloadBlob(blob, 'photo.geojson');
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
      const files = transfer.files;
      const nb = files.length;
      exif2geojson(files, {
        camera: document.querySelector<HTMLInputElement>('#camera')!.checked,
        image: document.querySelector<HTMLInputElement>('#image')!.checked,
        date: document.querySelector<HTMLInputElement>('#date')!.checked,
        loading: function (n: number) {
          $('#pbar > div').css('width', ((nb - n) / nb) * 100 + '%');
        },
        onLoad: function (json) {
          document.querySelector<HTMLInputElement>('#result')!.value = String(
            JSON.stringify(json, null, ' '),
          );
          $('.loading').html(
            ' ' + json.features.length + ' feature(s) loaded.',
          );
          $('#pbar > div').width(0);
          $('button').show();
          // Read the features
          const format = new GeoJSON();
          const features = format.readFeatures(json, {
            featureProjection: map.getView().getProjection(),
          });
          vector.getSource()!.addFeatures(features);
        },
      });
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
