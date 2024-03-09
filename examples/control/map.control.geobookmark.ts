import { Map, View } from 'ol'
import GeoBookmark from 'ol-ext/control/GeoBookmark'
import Geoportail from 'ol-ext/layer/Geoportail'
import { transform } from 'ol/proj'

declare global {
  interface Window {
    bm: GeoBookmark;
  }
}

// The map
const map = new Map
({
  target: 'map',
  view: new View({ zoom: 13, center: [649083, 5408224] }),
  layers: [new Geoportail('GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2')],
})

const bm = new GeoBookmark({
  marks:
    {
      Paris: { pos: transform([2.351828, 48.856578], 'EPSG:4326', 'EPSG:3857'), zoom: 11, permanent: true },
      London: { pos: transform([-0.1275, 51.507222], 'EPSG:4326', 'EPSG:3857'), zoom: 11, permanent: true },
      Geneve: { pos: transform([6.149985, 46.200013], 'EPSG:4326', 'EPSG:3857'), zoom: 13, permanent: true },
      Bruxelles: { pos: transform([4.35, 50.83], 'EPSG:4326', 'EPSG:3857'), zoom: 12, permanent: true },
      Berlin: { pos: transform([13.383333, 52.516667], 'EPSG:4326', 'EPSG:3857'), zoom: 12, permanent: true },
      Madrid: { pos: transform([-3.683333, 40.433333], 'EPSG:4326', 'EPSG:3857'), zoom: 12 },
      Roma: { pos: transform([12.48657, 41.888732], 'EPSG:4326', 'EPSG:3857'), zoom: 12 },
    },
})
map.addControl(bm)

window.bm = bm
