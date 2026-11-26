import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Draw from 'ol/interaction/Draw';
import DrawHole from 'ol-ext/interaction/DrawHole';

// Layers
const layers = [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })];
// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [261720, 5951081],
  }),
  layers: layers,
});

// New vector layer
const vector = new VectorLayer({
  properties: { name: 'Vecteur' },
  source: new VectorSource(),
});
map.addLayer(vector);
vector.getSource()!.addFeature(
  new Feature(
    new Polygon([
      [
        [34243, 6305749],
        [-288626, 5757848],
        [210354, 5576845],
        [34243, 6305749],
      ],
    ]),
  ),
);
/*
    var select = new ol.interaction.Select();
    function setSelect(b) {
      select.setActive(b);
      draw.setActive(!b);
      drawhole.setActive(false);
    }
    map.addInteraction(select)
    */
const draw = new Draw({
  source: vector.getSource()!,
  type: 'Polygon',
});
map.addInteraction(draw);
const drawhole = new DrawHole({
  layers: [vector],
});
drawhole.setActive(false);
map.addInteraction(drawhole);

function toggle(active: boolean) {
  draw.setActive(!active);
  drawhole.setActive(active);
}

Object.assign(window, { toggle });
