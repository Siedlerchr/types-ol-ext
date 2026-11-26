import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import GeoImage from 'ol-ext/layer/GeoImage';
import ExtGeoImage from 'ol-ext/source/GeoImage';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';

declare const $: JQueryStatic;

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 14,
    center: [274770, 6243929],
  }),
  layers: [new TileLayer({ properties: { title: 'OSM' }, source: new OSM() })],
});

// Options
$('.option').on('change', resetSource);

const x = Number(document.querySelector<HTMLInputElement>('#x')!.value);
const y = Number(document.querySelector<HTMLInputElement>('#y')!.value);
const sx = Number(document.querySelector<HTMLInputElement>('#w')!.value);
const sy = Number(document.querySelector<HTMLInputElement>('#h')!.value);
const xmin = Number(document.querySelector<HTMLInputElement>('#xmin')!.value);
const ymin = Number(document.querySelector<HTMLInputElement>('#ymin')!.value);
const xmax = Number(document.querySelector<HTMLInputElement>('#xmax')!.value);
const ymax = Number(document.querySelector<HTMLInputElement>('#ymax')!.value);

const geoimg = new GeoImage({
  opacity: 0.7,
  source: new ExtGeoImage({
    url: '../data/IGNF_PVA_1-0__1976-03-24_pt.jpg',
    imageCenter: [x, y],
    imageScale: [sx, sy],
    imageCrop: [xmin, ymin, xmax, ymax],
    //imageMask: [[273137.343,6242443.14],[273137.343,6245428.14],[276392.157,6245428.14],[276392.157,6242443.14],[273137.343,6242443.14]],
    imageRotate:
      (Number(document.querySelector<HTMLInputElement>('#rotate')!.value) *
        Math.PI) /
      180,
    projection: 'EPSG:3857',
    attributions: [
      "<a href='http://www.geoportail.gouv.fr/actualite/181/telechargez-les-cartes-et-photographies-aeriennes-historiques'>Photo historique &copy; IGN</a>",
    ],
  }),
});
geoimg.set('name', 'Georef');
map.addLayer(geoimg);

function resetSource() {
  const x = Number(document.querySelector<HTMLInputElement>('#x')!.value);
  const y = Number(document.querySelector<HTMLInputElement>('#y')!.value);
  const sx = Number(document.querySelector<HTMLInputElement>('#w')!.value);
  const sy = Number(document.querySelector<HTMLInputElement>('#h')!.value);
  const xmin = Number(document.querySelector<HTMLInputElement>('#xmin')!.value);
  const ymin = Number(document.querySelector<HTMLInputElement>('#ymin')!.value);
  const xmax = Number(document.querySelector<HTMLInputElement>('#xmax')!.value);
  const ymax = Number(document.querySelector<HTMLInputElement>('#ymax')!.value);
  geoimg.getSource()!.setCenter([x, y]);
  geoimg
    .getSource()!
    .setRotation(
      (Number(document.querySelector<HTMLInputElement>('#rotate')!.value) *
        Math.PI) /
        180,
    );
  geoimg.getSource()!.setScale([sx, sy]);
  geoimg.getSource()!.setCrop([xmin, ymin, xmax, ymax]);
  const crop = geoimg.getSource()!.getCrop();
  if (!Array.isArray(crop)) return;
  document.querySelector<HTMLInputElement>('#xmin')!.value = String(crop[0]);
  document.querySelector<HTMLInputElement>('#ymin')!.value = String(crop[1]);
  document.querySelector<HTMLInputElement>('#xmax')!.value = String(crop[2]);
  document.querySelector<HTMLInputElement>('#ymax')!.value = String(crop[3]);
}

// Show extent in the layerswitcher
map.addControl(new LayerSwitcher({ extent: true }));
/*
  geoimg.getExtent = function() {
    return geoimg.getSource().getExtent();
  }
  */
