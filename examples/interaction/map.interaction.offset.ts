import { Feature, Map, View } from 'ol'
import { LineString, Point, Polygon } from 'ol/geom'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Geoportail from 'ol-ext/layer/Geoportail'
import Offset from 'ol-ext/interaction/Offset'

const source = new VectorSource({ features: [
  new Feature(new Polygon([[[34243, 6305749], [-288626, 5757848], [210354, 5576845], [34243, 6305749]]])),
  new Feature(new LineString([[406033, 5664901], [689767, 5718712], [699551, 6149206], [425601, 6183449]])),
  new Feature(new Point([269914, 6248592])),
] })
const map = new Map({
  target: 'map', view: new View({ zoom: 5, center: [261720, 5951081] }),
  layers: [new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' }), new VectorLayer({ source })],
})
const interaction = new Offset({ source })
map.addInteraction(interaction)
const output = document.querySelector<HTMLElement>('#offset')!
interaction.on('offsetting', event => { output.textContent = event.offset.toFixed(0) })
interaction.on('offsetend', () => { output.textContent = '' })
