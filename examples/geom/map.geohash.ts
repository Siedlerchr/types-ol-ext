import { Feature, Map, View } from 'ol'
import { fromExtent } from 'ol/geom/Polygon'
import { toLonLat } from 'ol/proj'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Style, Text } from 'ol/style'
import Geoportail from 'ol-ext/layer/Geoportail'
import Permalink from 'ol-ext/control/Permalink'
import defaultStyle from 'ol-ext/style/defaultStyle'
import { fromLonLat, getExtent } from 'ol-ext/geom/geohash'

const source = new VectorSource()
const map = new Map({ target: 'map', view: new View({ zoom: 4, center: [205461, 5867916] }), layers: [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })] })
map.addControl(new Permalink({ geohash: true, visible: false }))
map.addLayer(new VectorLayer({ source, style: feature => [
  ...defaultStyle(), new Style({ text: new Text({ font: 'bold 12px sans-serif', overflow: true, text: feature.get('name') }) }),
] }))
map.on('click', event => {
  const precision = Number(document.querySelector<HTMLInputElement>('#precision')!.value)
  const hash = fromLonLat(toLonLat(event.coordinate), precision)
  document.querySelector<HTMLElement>('#geohash')!.textContent = hash
  const extent = getExtent(hash)
  if (!extent) return
  const geometry = fromExtent(extent).transform('EPSG:4326', map.getView().getProjection())
  const feature = new Feature(geometry)
  feature.set('name', hash)
  source.clear()
  source.addFeature(feature)
})
