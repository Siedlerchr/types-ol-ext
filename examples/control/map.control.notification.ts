import { Map, View } from 'ol'
import Draw from 'ol/interaction/Draw'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Geoportail from 'ol-ext/layer/Geoportail'
import Notification from 'ol-ext/control/Notification'

const source = new VectorSource()
const map = new Map({
  target: 'map',
  view: new View({ zoom: 5, center: [270701, 6247637] }),
  layers: [new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS'), new VectorLayer({ source })],
})
const notification = new Notification()
map.addControl(notification)
const draw = new Draw({ type: 'Point', source })
map.addInteraction(draw)
draw.on('drawend', event => {
  const content = document.createElement('div')
  content.append('One feature added to the map - ')
  const cancel = document.createElement('a')
  cancel.textContent = 'cancel'
  cancel.addEventListener('click', () => {
    source.removeFeature(event.feature)
    notification.hide()
  })
  content.append(cancel)
  notification.show(content)
})
