import MapIFrameAPI from 'ol-ext/utils/MapIFrameAPI';

const frame = document.querySelector<HTMLIFrameElement>('#map')!;
const origin = window.location.origin;

// The release bridge validates protocol identifiers. Limit access to this frame before handing it messages.
window.addEventListener('message', (event) => {
  if (
    event.source !== frame.contentWindow ||
    event.origin !== origin ||
    !event.data ||
    typeof event.data !== 'object'
  ) {
    event.stopImmediatePropagation();
  }
});

MapIFrameAPI.ready(
  frame,
  (api) => {
    document.getElementById('loading')!.style.display = 'none';
    Object.assign(window, { mapAPI: api });
    api.on('move', (data) => console.log('Move:', data));
    api.on('select', (data) => console.log('Select:', data));
    api.on('drawPolygon', (value) => console.log('Draw:', value));
    api.mapInput('getLon', 'lon');
    api.mapInput('getLat', 'lat');
  },
  origin,
);
