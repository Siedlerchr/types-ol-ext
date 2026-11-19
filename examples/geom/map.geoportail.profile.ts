import { Feature, Map, View } from 'ol';
import { LineString, Point } from 'ol/geom';
import Draw from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Style } from 'ol/style';
import Permalink from 'ol-ext/control/Permalink';
import Profile from 'ol-ext/control/Profile';
import { ol_coordinate_GPAltiCode, ol_geom_GPAltiCode } from 'ol-ext/geom/GPAltiCode';
import Geoportail from 'ol-ext/layer/Geoportail';

const map = new Map({ target: 'map', view: new View({ zoom: 12, center: [527172, 5691685] }),
  layers: [new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' })] });
map.addControl(new Permalink({ visible: false }));
const profile = new Profile({ target: document.querySelector<HTMLElement>('.options')!, width: 400, height: 200,
  style: new Style({ fill: new Fill({ color: '#ccc' }) }),
  info: { zmin: 'Zmin ', zmax: 'Zmax ', ytitle: 'Altitude', xtitle: 'Distance', time: 'Temps ',
    altitude: 'Altitude ', elevation: 'Dénivelé ', elevgain: 'Elevation gain', elevloss: 'Elevation loss',
    maxslope: 'Pente (max.) ', avgslope: 'Pente (moy.) ' } });
map.addControl(profile);
const source = new VectorSource();
map.addLayer(new VectorLayer({ source }));
const point = new Feature(new Point([0, 0]));
point.setStyle([]);
source.addFeature(point);
profile.on('over', event => {
  profile.popup(`${event.coord[2]} m`);
  point.setGeometry(new Point(event.coord));
  point.setStyle(null);
});
profile.on('out', () => point.setStyle([]));
const draw = new Draw({ type: 'LineString' });
map.addInteraction(draw);
let feature: Feature<LineString> | undefined;
draw.on('drawend', event => {
  const geometry = event.feature.getGeometry();
  if (!(geometry instanceof LineString)) return;
  document.body.classList.add('calculating');
  ol_geom_GPAltiCode(geometry, { sampling: 100, samplingDist: 500,
    success: result => {
      document.body.classList.remove('calculating');
      if (feature) source.removeFeature(feature);
      feature = new Feature(result);
      source.addFeature(feature);
      profile.setGeometry(feature, { amplitude: 500, zmin: 0 });
    },
    error: error => { document.body.classList.remove('calculating'); console.error(error); },
  });
});
map.on('click', event => ol_coordinate_GPAltiCode(event.coordinate, { success: result => console.log(result) }));
