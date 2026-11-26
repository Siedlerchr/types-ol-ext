import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import Permalink from 'ol-ext/control/Permalink';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import ScaleLine from 'ol/control/ScaleLine';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import SearchGeoportail from 'ol-ext/control/SearchGeoportail';
import PopupFeature from 'ol-ext/overlay/PopupFeature';
import GeoJSON from 'ol/format/GeoJSON';

// Key Capabilities
Geoportail.register('Aire-Parcellaire', {
  layer: 'Aire-Parcellaire',
  theme: 'parcellaire',
  desc: "Selon les règlements européens n°110/2008 du 15 janvier 2008, n°1151/2012 du 21 novembre 2012 et n°1308/2013 de l’OCM , le cahier des charges des appellations définit l’aire géographique. Le terme de « délimitation parcellaire » désigne une aire qui repose sur les limites administratives du cadastre (les parcelles) et dont le maillage suffisamment fin permet de tenir compte de variations très localisées des éléments du milieu physique. Elle correspond à l'aire de production de la matière première. Elle est incluse dans l'aire géographique. Données produites par l'Institut National des Origines et la Qualité (INAO)",
  server: 'https://data.geopf.fr/wmts',
  bbox: [-5.15047, 41.3252, 9.57054, 51.0991],
  format: 'image/png',
  minZoom: 0,
  maxZoom: 18,
  originators: {
    Geoservices: {
      attribution: 'Géoservices',
      href: 'https://geoservices.ign.fr/',
    },
  },
  queryable: true,
  style: 'normal',
  tilematrix: 'PM',
  title: 'Délimitation parcellaire AOC viticole',
});
// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 6,
    center: [261204, 6000000],
    /*
      center: [9.48, 42.738038240088095],
      projection: 'EPSG:4326'
      */
  }),
});

map.addLayer(
  new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS', {
    properties: { permalink: 'ortho' },
    className: 'photo',
  }),
);
map.addLayer(
  new Geoportail({
    layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
    properties: { permalink: 'plan' },
    className: 'plan',
    visible: true,
    opacity: 0.5,
  }),
);

map.addLayer(
  new TileLayer({
    properties: { title: 'Cartes géologiques', abstract: 'Cartes géologiques' },
    extent: [
      -20037508.342789244, -238107693.26496765, 20037508.342789244,
      238107693.26496765,
    ],
    visible: false,
    minResolution: 3.1750000000000003,
    maxResolution: 3527.777777777778,
    source: new TileWMS({
      url: 'http://geoservices.brgm.fr/geologie?language=fre&',
      projection: 'EPSG:3857',
      attributions: ['<a href="http://www.brgm.fr/">&copy; Brgm</a>'],
      crossOrigin: 'anonymous',
      params: {
        LAYERS: 'GEOLOGIE',
        FORMAT: 'image/png',
        VERSION: '1.3.0',
      },
    }),
  }),
);

var vignes = new Geoportail({
  layer: 'Aire-Parcellaire',
  className: 'AOC',
  title: 'Délimitation AOC viticole',
  opacity: 0.5,
});
map.addLayer(vignes);
map.addControl(new Permalink({ visible: false }));

var vector = new VectorLayer({
  properties: { title: 'vector' },
  className: 'vector',
  source: new VectorSource(),
});
map.addLayer(vector);

map.addControl(new ScaleLine());
map.addControl(new LayerSwitcher());
map.addControl(
  new SearchGeoportail({
    zoomOnSelect: 14,
  }),
);

// Show information on click (getFeatureInfo)
var popup = new PopupFeature({
  canFix: true,
  template: {
    attributes: [
      'id',
      'app',
      'denom',
      'dt',
      'type_prod',
      'categorie',
      'type_denom',
      'type_ig',
      'insee',
      'nomcom',
      'insee_2011',
      'nomcom_201',
      'crinao',
    ],
  },
});
map.addOverlay(popup);
map.on('click', (event) => {
  popup.hide();
  const resolution = map.getView().getResolution();
  const data = vignes.getData(event.pixel);
  const source = vignes.getSource();
  if (
    !vignes.getVisible() ||
    !data ||
    data instanceof DataView ||
    !data[3] ||
    resolution === undefined ||
    !source
  )
    return;
  vector.getSource()!.clear();
  source.getFeatureInfo(event.coordinate, resolution, {
    INFO_FORMAT: 'application/json',
    callback: (response) => {
      if (typeof response !== 'string' || !response) return;
      try {
        const features = new GeoJSON().readFeatures(response);
        if (features.length) {
          popup.show(event.coordinate, features);
          vector.getSource()!.addFeatures(features);
        }
      } catch (error) {
        console.warn('Unable to read AOC feature info', error);
      }
    },
  });
});
