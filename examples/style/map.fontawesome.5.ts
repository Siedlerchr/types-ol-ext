import { Feature, Map, View } from 'ol'
import Point from 'ol/geom/Point'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import { Fill, Stroke, Style } from 'ol/style'
import FontSymbol from 'ol-ext/style/FontAwesome5Def'

const map = new Map({
  target: 'map',
  view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new TileLayer({ source: new OSM() })],
})

const vector = new VectorLayer({
  source: new VectorSource({ features: [new Feature(new Point([259274, 6398696]))] }),
  style: () => new Style({
    image: new FontSymbol({
      glyph: 'fa-wheelchair',
      fontStyle: 'bold',
      form: 'circle',
      radius: 20,
      fill: new Fill({ color: '#369' }),
      stroke: new Stroke({ color: '#fff', width: 2 }),
    }),
  }),
})
map.addLayer(vector)
