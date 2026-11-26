import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Placemark from 'ol-ext/overlay/Placemark';
import Storymap from 'ol-ext/control/Storymap';
import type { Coordinate } from 'ol/coordinate';
import * as proj from 'ol/proj';
import Overlay from 'ol-ext/control/Overlay';

// Two base layers
const carto = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' });

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 6,
    center: [173664, 6166327],
  }),
  layers: [carto],
});

// Add placemark
const placemark = new Placemark();
map.addOverlay(placemark);

// The storymap
const story = new Storymap({
  target: document.getElementById('story')!,
  minibar: true,
});

const positions: Record<string, { xy: Coordinate; z: number }> = {
  start: { xy: [173664, 6166327], z: 6 },
  Paris: { xy: proj.fromLonLat([2.351828, 48.856578]), z: 9 },
  London: { xy: proj.fromLonLat([-0.1275, 51.507222]), z: 8 },
  Berlin: { xy: proj.fromLonLat([13.383333, 52.516667]), z: 7 },
};

// Show image fullscreen on click
const fullscreen = new Overlay({ hideOnClick: true, target: document.body });
map.addControl(fullscreen);
story.on('clickimage', function (e) {
  fullscreen.showImage(e.img.src, { title: e.title });
});

// Fly to the chapter on the map
story.on('scrollto', function (e) {
  if (!e.name || !positions[e.name]) return;
  document
    .querySelectorAll('#story .chapter')
    .forEach((chapter) => chapter.classList.remove('select'));
  e.element.classList.add('select');
  map.getView().cancelAnimations();
  if (e.name === 'start') {
    placemark.hide();
    map.getView().animate({
      center: positions[e.name].xy,
      zoom: positions[e.name].z,
    });
  } else {
    placemark.show(positions[e.name].xy);
    // Fly to destination
    const duration = 2000;
    map.getView().animate({
      center: positions[e.name].xy,
      duration: duration,
    });
    map.getView().animate(
      {
        zoom: Math.min(map.getView().getZoom() ?? 6, positions[e.name].z) - 1,
        duration: duration / 2,
      },
      {
        zoom: positions[e.name].z,
        duration: duration / 2,
      },
    );
  }
});
map.addControl(story);
