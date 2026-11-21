import Map from 'ol/Map';
import View from 'ol/View';
import Geoportail from 'ol-ext/layer/Geoportail';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overview from 'ol-ext/control/Overview';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 15,
    center: [270148, 6247782],
  }),
  layers: [new Geoportail('GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2')],
});

// Layers for the overview
const layers = [
  new TileLayer({ source: new OSM() }),
  new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS'),
];
const layers2 = [
  new TileLayer({ source: new OSM() }),
  new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS'),
];

// New control on the map
const ov = new Overview({
  layers: layers,
  minZoom: Number(document.querySelector<HTMLInputElement>('#minzoom')!.value),
  maxZoom: Number(document.querySelector<HTMLInputElement>('#maxzoom')!.value),
  rotation: document.querySelector<HTMLInputElement>('#rotate')!.checked,
  align: document.querySelector<HTMLInputElement>('#align')!.value,
  panAnimation: 'elastic',
});
map.addControl(ov);

// New control outside the map (styled)
const ov2 = new Overview({
  target: document.querySelector<HTMLElement>('.overview')!,
  layers: layers2,
  minZoom: Number(document.querySelector<HTMLInputElement>('#minzoom')!.value),
  maxZoom: Number(document.querySelector<HTMLInputElement>('#maxzoom')!.value),
  rotation: document.querySelector<HTMLInputElement>('#rotate')!.checked,
  style: [
    new Style({
      image: new Circle({
        fill: new Fill({
          color: 'rgba(0,255,102, 1)',
        }),
        stroke: new Stroke({
          width: 7,
          color: 'rgba(0,255,102, 0.8)',
        }),
        radius: 5,
      }),
      stroke: new Stroke({
        width: 3,
        color: 'rgba(0,255,102,1)',
        lineDash: [5, 5],
      }),
    }),
  ],
});
map.addControl(ov2);

// Options changes
function setOVLayer(select: HTMLSelectElement) {
  const index = select.selectedIndex;
  ov.getOverviewMap().getLayers().getArray()[index].setVisible(true);
  ov.getOverviewMap().getLayers().getArray()[1 - index].setVisible(false);
  ov2.getOverviewMap().getLayers().getArray()[index].setVisible(true);
  ov2.getOverviewMap().getLayers().getArray()[1 - index].setVisible(false);
}
document.querySelector('#rotate')!.addEventListener('change', () => {
  ov.rotation = ov2.rotation =
    document.querySelector<HTMLInputElement>('#rotate')!.checked;
  ov.setView();
  ov2.setView();
});
document.querySelector('#minzoom')!.addEventListener('change', () => {
  ov.minZoom = ov2.minZoom = Number(
    document.querySelector<HTMLInputElement>('#minzoom')!.value,
  );
  ov.setView();
  ov2.setView();
});
document.querySelector('#maxzoom')!.addEventListener('change', () => {
  ov.maxZoom = ov2.maxZoom = Number(
    document.querySelector<HTMLInputElement>('#maxzoom')!.value,
  );
  ov.setView();
  ov2.setView();
});

Object.assign(window, { ov, setOVLayer });
