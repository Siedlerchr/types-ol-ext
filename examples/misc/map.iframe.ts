import Feature from 'ol/Feature';
import type { Coordinate } from 'ol/coordinate';
import { createEmpty, extend } from 'ol/extent';
import { fromLonLat, toLonLat } from 'ol/proj';
import { getLength, getArea } from 'ol/sphere';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import Select from 'ol/interaction/Select';
import Placemark from 'ol-ext/overlay/Placemark';
import DragOverlay from 'ol-ext/interaction/DragOverlay';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Permalink from 'ol-ext/control/Permalink';
import Notification from 'ol-ext/control/Notification';
import IFrameAPI from 'ol-ext/utils/IFrameAPI';
import GeoJSON from 'ol/format/GeoJSON';

/* Create map */
var osm = new TileLayer({
  properties: { title: 'OSM' },
  visible: false,
  source: new OSM(),
});
var geoportail = new Geoportail({
  layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
});

var layers = [osm, geoportail];

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 0,
    center: [0, 0],
  }),
  layers: layers,
});

// Permalink
var permalink = new Permalink({ visible: false });
map.addControl(permalink);
if (permalink.getUrlParam('layer') === 'OSM') {
  osm.setVisible(true);
  geoportail.setVisible(false);
}

// Notification
var notification = new Notification();
map.addControl(notification);

// NEW API
const origin = window.location.origin;
window.addEventListener('message', (event) => {
  if (
    event.source !== window.parent ||
    event.origin !== origin ||
    !event.data ||
    typeof event.data !== 'object'
  ) {
    event.stopImmediatePropagation();
  }
});
const api = new IFrameAPI(origin);
api.set('map', map);
const format = new GeoJSON<Feature>();
api.set('notification', notification);

// API setter
api.setAPI({
  // Show Geoportail layer
  setLayer: function (name) {
    geoportail.setVisible(name === 'geoportail');
    osm.setVisible(name !== 'geoportail');
  },
  // Show notification on the map
  notification: function (note) {
    notification.show(note);
  },
});

const view = map.getView();
const writeOptions = { featureProjection: view.getProjection() };
api.setAPI({
  setCenter(coordinate: Coordinate) {
    view.setCenter(fromLonLat(coordinate.slice(0, 2)));
    if (coordinate[2] !== undefined) view.setZoom(coordinate[2]);
  },
  getCenter() {
    return toLonLat(view.getCenter()!);
  },
  setZoom(zoom: number) {
    view.setZoom(zoom);
  },
  getZoom() {
    return view.getZoom();
  },
});
api.addListener('move', () => {
  map.on('moveend', () =>
    api.postMessage('move', {
      center: toLonLat(view.getCenter()!),
      zoom: view.getZoom(),
    }),
  );
});

const mark = new Placemark({ stopEvent: false });
const drag = new DragOverlay({ overlays: mark });
map.addOverlay(mark);
map.addInteraction(drag);

function position(): Coordinate {
  return mark.getPosition() ?? view.getCenter()!;
}
function updateAxis(axis: number, value?: number | string) {
  const lonLat = toLonLat(position());
  if (value !== undefined && Number.isFinite(Number(value))) {
    lonLat[axis] = Number(value);
    mark.show(fromLonLat(lonLat));
  }
  return lonLat[axis];
}
api.setAPI({
  getLon: (value?: number) => updateAxis(0, value),
  getLat: (value?: number) => updateAxis(1, value),
  setLonLat(lonLat: Coordinate) {
    mark.show(fromLonLat(lonLat));
    api.postMessage('getLon', lonLat[0]);
    api.postMessage('getLat', lonLat[1]);
  },
});
api.addListener('getLon', function (this: number | string | undefined) {
  api.postMessage('getLon', updateAxis(0, this));
});
api.addListener('getLat', function (this: number | string | undefined) {
  api.postMessage('getLat', updateAxis(1, this));
});
drag.on('dragend', () => {
  const lonLat = toLonLat(position());
  api.postMessage('getLon', lonLat[0]);
  api.postMessage('getLat', lonLat[1]);
});

const departments = new VectorSource({
  url: '../data/departements.geojson',
  format,
});
map.addLayer(new VectorLayer({ source: departments }));
const selection = new Select();
selection.setActive(false);
map.addInteraction(selection);

function selected() {
  return selection
    .getFeatures()
    .getArray()
    .map((feature) => format.writeFeatureObject(feature, writeOptions));
}
api.setAPI({
  activateSelection(active: boolean) {
    selection.setActive(active);
  },
  selectBy(attributes: Record<string, unknown>) {
    const features = selection.getFeatures();
    features.clear();
    const extent = createEmpty();
    for (const feature of departments.getFeatures()) {
      const geometry = feature.getGeometry();
      if (
        geometry &&
        Object.entries(attributes).some(
          ([field, value]) => String(feature.get(field)) === String(value),
        )
      ) {
        features.push(feature);
        extend(extent, geometry.getExtent());
      }
    }
    if (features.getLength()) view.fit(extent);
    api.postMessage('select', { selected: selected(), deselected: [] });
  },
});
api.addListener('select', () => {
  selection.on('select', (event) =>
    api.postMessage('select', {
      selected: selected(),
      deselected: event.deselected.map((feature) => feature.get('id')),
    }),
  );
});

const polygons = new VectorSource();
map.addLayer(new VectorLayer({ source: polygons }));
const modify = new Modify({ source: polygons });
const draw = new Draw({ type: 'Polygon', stopClick: true });
map.addInteraction(modify);
map.addInteraction(draw);
draw.setActive(false);
draw.on('change:active', () => modify.setActive(!draw.getActive()));

function polygonData(feature?: Feature) {
  const geometry = feature?.getGeometry();
  if (!feature || !geometry) return null;
  feature.setProperties({
    length: getLength(geometry),
    area: getArea(geometry),
  });
  return format.writeFeatureObject(feature, writeOptions);
}
api.setAPI({
  drawPolygon() {
    selection.getFeatures().clear();
    draw.setActive(!draw.getActive());
  },
  getPolygon() {
    return polygonData(polygons.getFeatures()[0]);
  },
  setPolygon(data: object) {
    const [feature] = format.readFeatures(data, writeOptions);
    const geometry = feature?.getGeometry();
    if (geometry) {
      polygons.clear();
      polygons.addFeature(feature);
      view.fit(geometry.getExtent());
    }
  },
});
draw.on('drawend', (event) => {
  polygons.clear();
  polygons.addFeature(event.feature);
  setTimeout(() => {
    draw.setActive(false);
    api.postMessage('drawPolygon', polygonData(event.feature));
  });
});
modify.on('modifyend', (event) =>
  api.postMessage('drawPolygon', polygonData(event.features.item(0))),
);
