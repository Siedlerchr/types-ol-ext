import Map from 'ol/Map';
import View from 'ol/View';
import Permalink from 'ol-ext/control/Permalink';
import Geoportail from 'ol-ext/layer/Geoportail';
import Dialog from 'ol-ext/control/Dialog';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import MultiPolygon from 'ol/geom/MultiPolygon';
import type { GeoJsonProperties, Position } from 'geojson';
import { downloadBlob } from '../.shared/download';
import 'ol-ext/style/FontAwesomeDef';

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 15,
    center: [261204.43490751847, 6250258.191535994],
  }),
});
var plink = new Permalink({ visible: false });
map.addControl(plink);

map.addLayer(
  new Geoportail({
    layer: 'ORTHOIMAGERY.ORTHOPHOTOS',
    visible: true,
  }),
);
map.addLayer(
  new Geoportail({
    layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
    visible: false,
  }),
);

interface CarteFeature {
  attributes: GeoJsonProperties;
  type: string;
  coords: Position | Position[][] | Position[][][];
  style?: object;
  popupcontent?: object;
}

interface CarteLayer {
  title: string;
  theme?: string;
  dessin?: boolean;
  url?: string;
  features?: CarteFeature[];
  crop?: { coordinates: Position[][][] };
}

interface Carte {
  param: { lon: number; lat: number };
  layers: CarteLayer[];
}

const dialog = new Dialog({ closeBox: false, closeOnSubmit: false });
map.addControl(dialog);
const content = document.querySelector('#commune')!;
const info = content.querySelector('.info')!;
const input = content.querySelector<HTMLInputElement>('.insee')!;
const format = new GeoJSON<Feature>();
const projection = map.getView().getProjection();
dialog.show({
  title: 'Commune',
  content,
  buttons: { submit: 'charger' },
  onButton(button) {
    if (button !== 'submit' || input.disabled) return;
    input.disabled = true;
    getCommune(input.value.trim())
      .catch((error) => {
        info.textContent =
          error instanceof Error ? error.message : String(error);
      })
      .finally(() => {
        input.disabled = false;
      });
  },
});

async function getCommune(insee: string) {
  const response = await fetch(
    `https://geo.api.gouv.fr/communes?code=${encodeURIComponent(insee)}&fields=nom,code,contour&format=geojson&geometry=contour`,
  );
  if (!response.ok)
    throw new Error('Erreur lors de la récupération des données de la commune');
  const [commune] = format.readFeatures(await response.json());
  const boundary = commune?.getGeometry();
  if (!(boundary instanceof Polygon || boundary instanceof MultiPolygon)) {
    throw new Error('Aucune commune trouvée pour le code INSEE fourni');
  }
  const extent = boundary.getExtent();
  const template = await fetch('commune.carte');
  if (!template.ok)
    throw new Error('Erreur lors du chargement du modèle de carte');
  const carte: Carte = await template.json();
  carte.param.lon = (extent[0] + extent[2]) / 2;
  carte.param.lat = (extent[1] + extent[3]) / 2;
  for (const layer of carte.layers) {
    if (layer.features) layer.features = [];
  }
  const projected = boundary.clone().transform('EPSG:4326', projection);
  for (const layer of carte.layers) {
    if (layer.title === 'Commune') {
      const type = projected.getType();
      const coords = projected.getCoordinates();
      layer.features = [
        {
          attributes: commune.getProperties(),
          type,
          coords,
          style: {},
          popupcontent: {},
        },
      ];
      delete layer.features[0].attributes?.[commune.getGeometryName()];
      if (layer.crop) {
        layer.crop.coordinates =
          projected instanceof Polygon
            ? [projected.getCoordinates()]
            : projected.getCoordinates();
      }
    }
    if (!layer.url) continue;
    const url = new URL(layer.url, window.location.href);
    for (const [key, value] of url.searchParams) {
      if (!/BBOX/.test(value)) continue;
      const tokens = value.split(',');
      const index = tokens.findIndex((token) => /BBOX/.test(token));
      tokens.splice(index + 1, 4, ...extent.map(String));
      url.searchParams.set(key, tokens.join(','));
    }
    layer.url = url.toString();
    const points = carte.layers.find(
      (candidate) =>
        candidate !== layer &&
        candidate.dessin &&
        (candidate.title === layer.title || candidate.title === layer.theme),
    );
    if (!points) continue;
    const features = await fetch(url);
    if (!features.ok)
      throw new Error(`Erreur lors du chargement de ${layer.title}`);
    points.features ??= [];
    for (const feature of format.readFeatures(await features.json(), {
      featureProjection: projection,
    })) {
      const geometry = feature.getGeometry();
      const point =
        geometry instanceof Polygon
          ? geometry.getInteriorPoint()
          : geometry instanceof MultiPolygon
            ? geometry.getPolygons()[0]?.getInteriorPoint()
            : undefined;
      if (!point) continue;
      const attributes = feature.getProperties();
      delete attributes[feature.getGeometryName()];
      points.features.push({
        attributes,
        type: 'Point',
        coords: point.getCoordinates(),
      });
    }
  }
  downloadBlob(
    new Blob([JSON.stringify(carte, null, ' ')], { type: 'application/json' }),
    `commune-${insee}.carte`,
  );
  info.textContent = `ℹ️ ${commune.get('nom')} (${commune.get('code')}) chargée`;
}
