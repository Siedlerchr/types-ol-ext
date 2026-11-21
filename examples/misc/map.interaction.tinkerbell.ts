import Map from 'ol/Map';
import View from 'ol/View';
import Geoportail from 'ol-ext/layer/Geoportail';
import TinkerBell from 'ol-ext/interaction/TinkerBell';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 3,
    center: [270148, 6247782],
  }),
  layers: [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })],
});

// interaction
const tb = new TinkerBell();
map.addInteraction(tb);

//map.addInteraction(new ol.interaction.Draw ({ type: 'LineString' }));

Object.assign(window, { tb });
