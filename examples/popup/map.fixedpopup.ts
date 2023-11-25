import { Map, View } from 'ol'
import { StadiaMaps, Vector as VectorSource } from 'ol/source'
import { GeoJSON } from 'ol/format'
import { Style, Fill, Icon } from 'ol/style'
import { Select } from 'ol/interaction'
import type Feature from 'ol/Feature'
import TileLayer from 'ol/layer/Tile'
import FixedPopup from 'ol-ext/overlay/FixedPopup'
import VectorLayer from 'ol/layer/Vector'
import type { Point } from 'ol/geom'
import type Popup from 'ol-ext/overlay/Popup'

// Layers
const layers = [
  new TileLayer({
    // title:'stamen_terrain-background',
    source: new StadiaMaps({ layer: 'stamen_terrain' }),
  }),
]

// Popup overlay
const popup = new FixedPopup({
  popupClass: 'default', // "tooltips", "warning" "black" "default", "tips", "shadow",
  // anim: true,
  closeBox: true,
})
const popup2 = new FixedPopup({
  popupClass: 'default', // "tooltips", "warning" "black" "default", "tips", "shadow",
  // anim: true,
  closeBox: true,
})

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers,
  overlays: [popup, popup2],
})

// GeoJSON layer
const vectorSource = new VectorSource({
  url: '../data/fond_guerre.geojson',
  // projection: 'EPSG:3857',
  format: new GeoJSON(),
  attributions: ['&copy; <a href=\'https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire\'>data.culture.gouv.fr</a>'],
  // logo:"https://www.data.gouv.fr/s/avatars/37/e56718abd4465985ddde68b33be1ef.jpg"
})

map.addLayer(new VectorLayer({
  // name: 'Fonds de guerre 14-18',
  source: vectorSource,
  style: new Style({ image: new Icon({ src: '../data/camera.png', scale: 0.8 }) }),
}))

// Control Select
const select = new Select({})
map.addInteraction(select)

// On selected => show/hide popup
select.getFeatures().on(['add'], (e: any) => {
  const feature = e.element as Feature<Point>
  let content = ''
  content += `<img src='${feature.get('img')}'/>`
  content += feature.get('text')
  content += '<br/><i>powered by <a href="https://github.com/Viglino/ol-ext" target="ol">ol-ext</a></i>'
  if (select.getFeatures().getLength() > 1) {
    popup2.show(feature.getGeometry()?.getFirstCoordinate(), content)
  } else {
    popup.show(feature.getGeometry()?.getFirstCoordinate(), content)
  }
})
select.getFeatures().on(['remove'], e => {
  popup.hide()
  popup2.hide()
})

function setStyle(st: string) {
  popup.setPopupClass(st)
  let color
  switch (st) {
    case 'default orange':
    case 'tips orange':
      color = '#f96'
      break
    case 'black':
      color = [0, 0, 0, 0.5]
      break
    case 'red black':
    case 'warning':
      color = 'red'
      break
    case 'tips':
      color = '#ad7'
      break
    case 'tooltips':
      color = '#ffa'
      break
    default:
      color = [102, 153, 255]
      break
  }
  popup.setLinkStyle(new Style({
    fill: new Fill({ color }),
  }))
  if ($('#ck').prop('checked')) popup.addPopupClass('shadow')
}

declare global {
  interface Window {
    popup: Popup,
    popup2: FixedPopup
    map: Map
    setStyle: (st: string) => void;
  }
}
window.popup = popup
window.map = map
window.setStyle = setStyle
