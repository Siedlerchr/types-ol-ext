import type { Feature } from 'ol'
import { Map, View } from 'ol'
import { defaults as interaction_defaults } from 'ol/interaction'
import TileLayer from 'ol/layer/Tile'
import { OSM } from 'ol/source'
import VectorSource from 'ol/source/Vector'
import { GeoJSON } from 'ol/format'
import type { Height } from 'ol-ext/source/Vector3D'
import Vector3D from 'ol-ext/source/Vector3D'
import { Stroke, Style } from 'ol/style'
import { Polygon } from 'ol/geom'

const map = new Map({
  target: 'map',
  view: new View({
    zoom: 13,
    center: [260841, 6250141],
  }),
  interactions: interaction_defaults(),
  layers: [new TileLayer({ source: new OSM() })],
})

// Create layer
const vectorSource = new VectorSource({
  attributions: ['&copy; <a href=\'https://cadastre.data.gouv.fr/dvf\'>DGFiP</a>'],
})

fetch('../data/dvf-75-2017-100m.geojson').then(resp => resp.json()).then(data => {
  const features = (new GeoJSON()).readFeatures(data)
  features.forEach(f => {
    f.getGeometry()?.transform('EPSG:4326', map.getView().getProjection())

    // const type = f.getGeometry();
    // if (type instanceof Polygon) {
    //     f.setGeometry(type.getInteriorPoint());
    // }
  })
  vectorSource.addFeatures(features)
  document.querySelector<HTMLDivElement>('.loading')!.style.display = 'none'
  doAnime()
})

const vector = new Vector3D({
  source: vectorSource,
  style: new Style({
    stroke: new Stroke({
      width: 5,
      color: [255, 0, 0, 0.5],
      // lineCap: 'round'
    }),
    geometry: f => {
      const type = f.getGeometry()
      if (type instanceof Polygon) {
        return type.getInteriorPoint()
      }
      return undefined
    },
  }),
  // center: [.5,1.5],
  height: 0,
  // maxResolution: 40,
  defaultHeight: 0,
})
map.addLayer(vector)

let height: Height = 0

function doAnime() {
  if (vector.animating()) return
  height = height ? 0 : ((f: Feature) => f.get('nb') * 20)
  vector.animate({ height })
}

declare global {
  interface Window {
    height: Height;

    doAnime(): void;
  }
}
window.height = height
window.doAnime = () => {
  doAnime()
}
