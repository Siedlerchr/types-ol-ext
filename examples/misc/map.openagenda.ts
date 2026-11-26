import { downloadBlob } from '../.shared/download';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Select from 'ol/interaction/Select';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import * as proj from 'ol/proj';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';

declare const $: JQueryStatic;

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 4,
    center: [166326, 5992663],
  }),
  layers: [new TileLayer({ source: new OSM() })],
});

var select = new Select();
map.addInteraction(select);
select.on('select', function (e) {
  if (e.selected.length) {
    var f = e.selected[0];
    if (f) {
      $('.options .info').html(
        f.get('description') + '<br/>' + f.get('locationName'),
      );
    } else {
      $('.options .info').html('');
    }
  } else {
    $('.options .info').html('');
  }
});

// Vector source
var source = new VectorSource();
var layerSource = new VectorLayer({ source: source });
map.addLayer(layerSource);

function load(id: string, i = 0) {
  $('body').addClass('waiting');
  i = i || 0;
  if (i === 0) source.clear();
  console.log('load', i);
  $.ajax({
    url:
      'https://openagenda.com/agendas/' +
      id +
      '/events.json?lang=fr&limit=' +
      (300 * i + 300) +
      '&offset=' +
      300 * i,
    success: function (r) {
      if (r.events && r.events.length) {
        getFeatures(r.events);
        console.log(source.getFeatures().length);
        load(id, i + 1);
      } else {
        $('body').removeClass('waiting');
        alert(source.getFeatures().length + ' features loaded...');
      }
    },
    error: function () {
      $('body').removeClass('waiting');
    },
  });
}

interface AgendaEvent {
  longitude: number;
  latitude: number;
  tags?: { label: string }[];
  [key: string]: unknown;
}

function getFeatures(events: AgendaEvent[]) {
  const fields = [
    'address',
    'city',
    'image',
    'description.fr',
    'locationName',
    'longDescription.fr',
    'firstDate',
    'range.fr',
    'canonicalUrl',
    'registrationUrl',
  ];
  for (const event of events) {
    if (!Number.isFinite(event.longitude) || !Number.isFinite(event.latitude))
      continue;
    const attributes: Record<string, unknown> = {};
    for (const field of fields) {
      const [key, subkey] = field.split('.');
      const value = event[key];
      attributes[key] =
        subkey && value && typeof value === 'object'
          ? ((value as Record<string, unknown>)[subkey] ?? '')
          : (value ?? '');
    }
    const tags = event.tags ?? [];
    attributes.tags =
      tags.length > 3 ? 'Divers' : tags.map((tag) => tag.label).join(' - ');
    const feature = new Feature(
      new Point(proj.fromLonLat([event.longitude, event.latitude])),
    );
    feature.setProperties(attributes);
    source.addFeature(feature);
  }
}

// Save
function save() {
  var format = new GeoJSON();
  var data = format.writeFeatures(source.getFeatures(), {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection(),
  });
  var blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'agenda.geojson');
}

Object.assign(window, { load, save });
