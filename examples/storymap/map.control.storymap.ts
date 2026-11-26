import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import View from 'ol/View';
import Placemark from 'ol-ext/overlay/Placemark';
import Storymap from 'ol-ext/control/Storymap';
import Overlay from 'ol-ext/control/Overlay';

// Two base layers
const stamen = new TileLayer({
  properties: { title: 'OSM', baseLayer: true },
  source: new OSM(),
});

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 6,
    center: [173664, 6166327],
    padding: [0, 0, 0, 210],
  }),
  layers: [stamen],
});

// Add placemark
const placemark = new Placemark();
map.addOverlay(placemark);

// The storymap
const story = new Storymap({
  html: document.getElementById('story')!,
  //target: document.getElementById('story')
  minibar: true,
  //className: 'scrollBox'
});

// Show image fullscreen on click
const fullscreen = new Overlay({ hideOnClick: true, className: 'zoom' });
map.addControl(fullscreen);
story.on('clickimage', function (e) {
  console.log(e);
  fullscreen.showImage(e.img.src, {
    title: e.title,
    coordinate: e.coordinate ?? undefined,
  });
});

// Fly to the chapter on the map
story.on('scrollto', function (e) {
  if (e.name === 'start') {
    placemark.hide();
  } else {
    placemark.show(e.coordinate);
  }
});
map.addControl(story);

function setClassName(className: string) {
  const storyElement = map.getViewport()!.querySelector('.ol-storymap')!;
  storyElement.classList.remove('scrollLine', 'scrollBox');
  if (className) storyElement.classList.add(className);
  window.dispatchEvent(new Event('resize'));
}

Object.assign(window, { story, fullscreen, setClassName });
