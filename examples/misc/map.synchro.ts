import Geoportail from 'ol-ext/layer/Geoportail';
import { Coordinate } from 'ol/coordinate';
import Map from 'ol/Map';
import View from 'ol/View';

declare const $: JQueryStatic;
interface ViewState {
  pt?: Coordinate;
  z?: number;
  rot: number;
}
declare const WSynchro: {
  source?: Window & { map?: Map };
  open(): void;
  on(type: 'synchronize', listener: (state: ViewState) => void): void;
  synchronize(state?: ViewState): void;
};

// Two base layers
var layer = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' });

// The map
const source = WSynchro.source?.map?.getView();
const z = source?.getZoom() ?? 6;
const pt = source?.getCenter() ?? [270148, 6247782];
const rot = source?.getRotation() ?? 0;
var map = new Map({
  target: 'map',
  view: new View({
    zoom: z,
    center: pt,
    rotation: rot,
  }),
  layers: [layer],
});

// Open a new window
function openWin() {
  WSynchro.open();
}

// synchro count
var nb = 0;
// Synchronize function => set map position
WSynchro.on('synchronize', function (e) {
  var view = map.getView();
  // Tell we are synchro
  if (
    e.pt == view.getCenter() &&
    e.z == view.getZoom() &&
    e.rot == view.getRotation()
  ) {
    WSynchro.synchronize();
  } else {
    // Set position (will call WSynchro.synchronize on move end)
    view.setCenter(e.pt);
    if (e.z !== undefined) view.setZoom(e.z);
    view.setRotation(e.rot || 0);
    $('#nb').text(++nb);
  }
});

// Synchronize on move / rotate
map.on('moveend', function () {
  var view = map.getView();
  WSynchro.synchronize({
    pt: view.getCenter(),
    z: view.getZoom(),
    rot: view.getRotation(),
  });
});

Object.assign(window, { map, openWin });
