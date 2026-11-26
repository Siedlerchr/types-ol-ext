import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol-ext/util/View';
import Blob from 'ol-ext/interaction/Blob';
import VideoRecorder from 'ol-ext/control/VideoRecorder';

// Layers
const photo = new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS');
const carte = new Geoportail({
  layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
  opacity: 0.8,
});

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 10,
    center: [256697, 6249708],
  }),
  layers: [photo, carte],
});

// Blob interaction
const blob = new Blob({ radius: 50, layers: carte });
map.addInteraction(blob);

// Record control
const rec = new VideoRecorder();
map.addControl(rec);
rec.on('stop', function (e) {
  document.querySelector('video')!.src = e.videoURL;
  document.querySelector('#video')!.classList.add('visible');
  document.querySelector('#map')!.classList.remove('recording');
});
rec.on('start', function () {
  document.querySelector('#map')!.classList.add('recording');
});
rec.on('error', console.log);

// Take a tour
function tour() {
  document.body.classList.add('noPointerEvent');
  carte.setVisible(false);
  rec.start();
  map.getView().takeTour(
    [
      [268923, 6248865, 15],
      [262707, 6262016, 16],
      [255386, 6250791, 16],
      [259984, 6251327, 16],
      [260022, 6251045, 13, 'moveTo'],
    ],
    {
      delay: 750,
      done: function () {
        // Wait 1s before stop
        setTimeout(function () {
          rec.stop();
          document.body.classList.remove('noPointerEvent');
          carte.setVisible(true);
        }, 1000);
      },
      step: function (step) {
        console.log('step: ', step);
      },
    },
  );
}

Object.assign(window, { tour });
