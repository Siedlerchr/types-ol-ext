import Map from 'ol/Map';
import View from 'ol/View';
import Geoportail from 'ol-ext/layer/Geoportail';
import Permalink from 'ol-ext/control/Permalink';
import Button from 'ol-ext/control/Button';
import GeoBookmark from 'ol-ext/control/GeoBookmark';
import type { BookmarkEvent } from 'ol-ext/control/GeoBookmark';
import Print from 'ol-ext/control/Print';
import SearchGeoportail from 'ol-ext/control/SearchGeoportail';
import LayerSwitcherImage from 'ol-ext/control/LayerSwitcherImage';
import GeolocationButton from 'ol-ext/control/GeolocationButton';
import { downloadBlob } from './download';

declare const $: JQueryStatic;

export function setupPaintMap(center: [number, number, number]) {
  const photoLayer = new Geoportail({
    layer: 'ORTHOIMAGERY.ORTHOPHOTOS',
    visible: false,
    baseLayer: true,
  });
  const layers = [
    new Geoportail({
      layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
      visible: false,
      baseLayer: true,
    }),
    photoLayer,
  ];

  // The map
  const map = new Map({
    target: 'map',
    view: new View({
      zoom: center[2],
      center: center.slice(0, 2),
    }),
    layers: layers,
  });

  // Handle hover
  $('body').addClass('out');
  $('#map').on('mouseenter', function () {
    $('body').removeClass('out');
  });
  $('#map').on('mouseleave', function () {
    $('body').addClass('out');
  });

  // Permalink
  const plink = new Permalink({ visible: false });
  map.addControl(plink);

  $('.frame h2').click(function () {
    const name = prompt('Title', $(this).text());
    plink.setUrlParam('title', name || '');
    $(this).text(name || 'ol-ext');
  });

  // Info
  map.addControl(
    new Button({
      html: '?',
      className: 'help',
      handleClick: function () {
        $('.options').toggleClass('visible');
      },
    }),
  );

  // Bookmarks
  const bmark = new GeoBookmark({
    namespace: 'paint',
    marks: {
      "Baie de l'Authie": {
        pos: [178343, 6510825],
        zoom: 14.4,
        permanent: true,
      },
      Honfleur: { pos: [25944, 6346465], zoom: 19.5, permanent: true },
      'jardins de Villandry': {
        pos: [57211, 5997720],
        zoom: 19.1,
        permanent: true,
      },
      'Montagne Sainte-Victoire': {
        pos: [625817, 5392910],
        zoom: 13.8,
        permanent: true,
      },
      Collioure: { pos: [343599, 5240060], zoom: 16.8, permanent: true },
      'Cathédrale de Rouen': {
        pos: [121894, 6349901],
        zoom: 19.1,
        permanent: true,
        rot: 3.14,
      },
      'Port Grimaud': { pos: [732138, 5353219], zoom: 19.3, permanent: true },
      'La Réunion': { pos: [6182310, -2407847], zoom: 10.9, permanent: true },
      'Neuf-Brisach': { pos: [838014, 6109780], zoom: 16.5, permanent: true },
      'Le Crotoy': { pos: [179282, 6484201], zoom: 12.9, permanent: true },
      'Bazoches-les-Gallerandes': {
        pos: [229523, 6130842],
        zoom: 13.1,
        permanent: true,
      },
      'Salin de Giraud': { pos: [525309, 5371750], zoom: 13, permanent: true },
    },
  });
  map.addControl(bmark);
  function showBookmark(e: BookmarkEvent) {
    $('.frame h2').text(e.name);
    plink.setUrlParam('title', e.name);
  }
  bmark.on('add', showBookmark);
  bmark.on('select', showBookmark);

  // Print control
  const print = new Print();
  map.addControl(print);
  print.on('print', function (e) {
    e.canvas.toBlob(function (blob) {
      downloadBlob(blob, 'map.' + e.imageType.replace('image/', ''));
    }, e.imageType);
  });

  // Search control
  const search = new SearchGeoportail();
  // var search = new ol.control.SearchBAN();
  map.addControl(search);
  search.on('select', function (e) {
    map.getView().setCenter(e.coordinate);
    if ((map.getView().getZoom() ?? 0) < 14) map.getView().setZoom(14);
  });

  // Switcher
  map.addControl(new LayerSwitcherImage());

  // Geooc
  map.addControl(new GeolocationButton());

  const title = plink.getUrlParam('title');
  if (title) {
    $('.frame h2').text(title);
    $('.options').removeClass('visible');
  }
  return { map, plink, photoLayer, print };
}
