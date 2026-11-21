import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Legend from 'ol-ext/legend/Legend';
import ExtLegend from 'ol-ext/control/Legend';
import Style from 'ol/style/Style';
import RegularShape from 'ol/style/RegularShape';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import 'ol-ext/style/FontAwesomeDef';

// Layers
const layer = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' });

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 6,
    center: [166326, 5992663],
  }),
  layers: [layer],
});

// Define a new legend
const legend = new Legend({
  title: 'Legend',
  margin: 5,
});
const legendCtrl = new ExtLegend({
  legend: legend,
  collapsed: false,
});
map.addControl(legendCtrl);
//legend.on('select', function(e){ console.log(e) });

// Add a new one
const legend2 = new Legend({
  title: ' ', // no title
  margin: 5,
});
map.addControl(
  new ExtLegend({
    legend: legend2,
    target: map.getViewport()!.querySelector<HTMLElement>('.ol-legend')!,
  }),
);

const form = { Triangle: 3, Square: 4, Pentagon: 5, Hexagon: 6 };
for (const [i, points] of Object.entries(form)) {
  legend.addItem({
    title: i,
    typeGeom: 'Point',
    style: new Style({
      image: new RegularShape({
        points,
        radius: 15,
        stroke: new Stroke({ color: [255, 128, 0, 1], width: 1.5 }),
        fill: new Fill({ color: [255, 255, 0, 0.3] }),
      }),
    }),
  });
  legend2.addItem({
    title: i,
    typeGeom: 'Point',
    style: new Style({
      image: new RegularShape({
        points,
        radius: 15,
        radius2: 7,
        stroke: new Stroke({ color: [0, 128, 255, 1], width: 1.5 }),
        fill: new Fill({ color: [0, 255, 255, 0.3] }),
      }),
    }),
  });
}
