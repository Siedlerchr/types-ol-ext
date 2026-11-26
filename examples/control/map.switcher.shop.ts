import type { FrameState } from 'ol/Map';
import Layer from 'ol/layer/Layer';
import type { LayerSwitcherEvent } from 'ol-ext/control/LayerSwitcher';
import Group from 'ol/layer/Group';
import Geoportail from 'ol-ext/layer/Geoportail';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import View from 'ol/View';
import LayerShop from 'ol-ext/control/LayerShop';
import WMSCapabilities from 'ol-ext/control/WMSCapabilities';
import Button from 'ol-ext/control/Button';
import Dialog from 'ol-ext/control/Dialog';
import CSS from 'ol-ext/filter/CSS';
import element from 'ol-ext/util/element';
import Colorize from 'ol-ext/filter/Colorize';
import Slider from 'ol-ext/util/input/Slider';
import 'ol-ext/filter/Base';

declare const $: JQueryStatic;

// A group layer for base layers
const baseLayers = new Group({
  properties: { title: 'Base Layers', openInLayerSwitcher: true },
  layers: [
    new Geoportail({
      baseLayer: true,
      visible: false,
      layer: 'ORTHOIMAGERY.ORTHOPHOTOS',
    }),
    new Geoportail({
      baseLayer: true,
      layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
    }),
    new TileLayer({
      properties: { title: 'OSM', baseLayer: true },
      source: new OSM(),
      visible: false,
    }),
  ],
});
Geoportail.register('LANDCOVER.CLC18', {
  layer: 'LANDCOVER.CLC18',
  theme: 'clc',
  desc: "Inventaire biophysique de l'occupation des sols en 2018 en 50 postes pour les DOM et 44 postes pour la Métropole. CORINE Land Cover est une base de données d’occupation des sols produite dans le cadre du programme européen d’observation de la Terre Copernicus. Cet inventaire biophysique de l’occupation des terres fournit une information géographique de référence pour 39 États européens. La continuité du programme et la diffusion des données CORINE Land Cover sont pilotées par l'Agence européenne pour l'environnement. Le producteur pour la France est le Service de la donnée et des études statistiques du ministère chargé de l’écologie. L'utilisation de cette base de données permet des applications variées adaptées aux problématiques de l'environnement et à celles de l'aménagement du territoire : production cartographique, exploitation à des fins statistiques ou bien encore analyses géographiques en combinaison avec d'autres bases de données. Outil de connaissance et d'analyse, CORINE Land Cover apporte également une aide à la décision comme instrument de suivi, de surveillance et de gestion de l'environnement, des milieux naturels et de l'aménagement de l'espace. La base de données CORINE Land Cover 2018 a été réalisée à partir de CORINE Land Cover 2012 révisée et de la base des changements 2012-2018.",
  server: 'https://data.geopf.fr/wmts',
  bbox: [-63.3725, -21.4756, 55.9259, 51.4428],
  format: 'image/png',
  minZoom: 0,
  maxZoom: 16,
  originators: {
    Geoservices: {
      attribution: 'Géoservices',
      href: 'https://geoservices.ign.fr/',
    },
  },
  queryable: false,
  style: 'CORINE Land Cover',
  tilematrix: 'PM',
  title: 'CORINE Land Cover - 2018',
});
const clc = new Geoportail({
  layer: 'LANDCOVER.CLC18',
  //className: 'clc'
});
// The Map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 11,
    center: [260497, 6249720],
  }),
  layers: [
    baseLayers,
    new Geoportail({
      layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
      className: 'PLANIGNV2',
      visible: false,
    }),
    new Geoportail({
      layer: 'ORTHOIMAGERY.ORTHOPHOTOS',
      className: 'ORTHOPHOTOS',
    }),
    new Geoportail({
      layer: 'CADASTRALPARCELS.PARCELLAIRE_EXPRESS',
      className: 'PARCELLAIRE_EXPRESS',
    }),
    clc,
    new Geoportail({
      title: 'Labels',
      className: 'Labels',
      layer: 'GEOGRAPHICALNAMES.NAMES',
    }),
  ],
});

// Add control inside the map
const ctrl = new LayerShop({
  counter: true,
  minibar: true,
});
map.addControl(ctrl);

// WMS control
const wms = new WMSCapabilities({
  target: document.body,
  title: 'Add WMS',
  services: {
    BRGM: 'https://geoservices.brgm.fr/geologie',
    OSM: 'https://wms.openstreetmap.fr/wms',
    'OSM-Mundialis': 'https://ows.mundialis.de/services/service',
    'IGN-Géoservices': 'https://data.geopf.fr/wms-r/wms',
  },
  onselect: function (layer) {
    if (!layer) return;
    const selection = ctrl.getSelection();
    const index = selection
      ? map.getLayers().getArray().indexOf(selection)
      : -1;
    map.getLayers().insertAt(index + 1, layer);
    ctrl.selectLayer(layer);
  },
});
ctrl.addControl(wms, 'bottom');

// Remove layer button
ctrl.addControl(
  new Button({
    html: '<i class="fa fa-trash-o"></i>',
    title: 'Remove layer',
    handleClick: function () {
      const selection = ctrl.getSelection();
      if (selection) map.removeLayer(selection);
    },
  }),
  'bottom',
);

let lastFrameState: FrameState | null = null;
map.on('postrender', (event) => {
  lastFrameState = event.frameState;
});

// Info dialogue
const dlg = new Dialog({ closeBox: true, hideOnBack: true, fullscreen: true });
map.addControl(dlg);
// Show info
ctrl.addControl(
  new Button({
    html: '<i class="fa fa-info-circle"></i>',
    title: 'Information',
    handleClick: function () {
      const d = $('<div>');
      const layer = ctrl.getSelection();
      if (layer) {
        $('<h2>').text(layer.get('title')).appendTo(d);
        $('<p>')
          .text(layer.get('desc') || layer.get('abstract'))
          .appendTo(d);
        const frameState = lastFrameState;
        const attribution =
          layer instanceof Layer ? layer.getSource()?.getAttributions() : null;
        if (frameState && attribution) {
          const credits = attribution(frameState);
          if (credits)
            $('<div>').html([credits].flat().join('<br/>')).appendTo(d);
        }
        dlg.show(d.get(0));
      }
    },
  }),
  'bottom',
);

// Mix blend Menu
const blendFilter: Partial<Record<string, CSS>> = {
  multiply: new CSS({ blend: 'multiply' }),
  luminosity: new CSS({ blend: 'luminosity' }),
  color: new CSS({ blend: 'color' }),
  'color-burn': new CSS({ blend: 'color-burn' }),
  difference: new CSS({ blend: 'difference' }),
  overlay: new CSS({ blend: 'overlay' }),
};
clc.addFilter(blendFilter.multiply!);
// Add selector
const blend = element.create('SELECT', {
  options: {
    Mode: '',
    Multiply: 'multiply',
    Luminosity: 'luminosity',
    Color: 'color',
    'Color burn': 'color-burn',
    Difference: 'difference',
    Overlay: 'overlay',
  },
  on: {
    change: function (e) {
      const selection = ctrl.getSelection();
      if (!selection) return;
      for (const mode of Object.values(blendFilter))
        if (mode) selection.removeFilter(mode);
      const chosen = blendFilter[blend.value];
      if (chosen) selection.addFilter(chosen);
    },
  },
  parent: ctrl.getBarElement(),
});
// Update filter on select layer
ctrl.on('select', function (e) {
  blend.value = '';
  const filters = e.layer?.getFilters() ?? [];
  for (const [name, mode] of Object.entries(blendFilter)) {
    if (mode && filters.includes(mode)) blend.value = name;
  }
});

// Grayscale filter menu
const filter = new Colorize('grayscale');
filter.set('preserveAlpha', true);
const sel = element.create('SELECT', {
  options: {
    Filter: 'normal',
    Grayscale: 'grayscale',
  },
  on: {
    change: function () {
      const selection = ctrl.getSelection();
      if (!selection) return;
      if (sel.value === 'grayscale') selection.addFilter(filter);
      else selection.removeFilter(filter);
    },
  },
  parent: ctrl.getBarElement(),
});
// Update filter on select layer
ctrl.on('select', function (e) {
  if (!e.layer?.getFilters().includes(filter)) sel.value = 'normal';
  else sel.value = 'grayscale';
});

// Opacity slider
const opacity = new Slider({
  className: 'opacity',
  align: 'right',
  type: 'number',
  min: 0,
  max: 100,
  parent: ctrl.getBarElement(),
});
opacity.on('change:value', function (e) {
  ctrl.getSelection()?.setOpacity(e.value / 100);
});
function updateOpacity(e: LayerSwitcherEvent) {
  if (e.layer && e.layer === ctrl.getSelection()) {
    opacity.setValue(Math.round(e.layer.getOpacity() * 100));
  }
}
ctrl.on('layer:opacity', updateOpacity);
ctrl.on('select', updateOpacity);

// Select first layer
ctrl.selectLayer();
