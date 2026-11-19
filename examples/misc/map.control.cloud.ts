import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import Cloud from 'ol-ext/control/Cloud'

const imagery = new TileLayer({
  source: new XYZ({
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg',
    attributions: ['&copy; <a href="http://www.arcgis.com/home/">Esri</a>', '&copy; DigitalGlobe, Earthstar Geographics and contributors'],
  }),
})
const map = new Map({ target: 'map', view: new View({ zoom: 14, center: [-305977, 6026830] }), layers: [imagery] })
map.getView().fit([-375917, 5976764, -229158, 6025378], { size: map.getSize() })
const value = (id: string): number => Number(document.querySelector<HTMLInputElement>(`#${id}`)!.value)
const ctrl = new Cloud({ opacity: value('opacity'), density: value('density'), windSpeed: value('ws'), windAngle: value('wa') * Math.PI / 180 })
map.addControl(ctrl)
Object.assign(window, { ctrl })
