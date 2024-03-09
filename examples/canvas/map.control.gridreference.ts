import type { Feature } from 'ol'
import { Map, View } from 'ol'
import { defaults, Select } from 'ol/interaction'
import { GeoJSON } from 'ol/format'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Style, Icon } from 'ol/style'
import GridReference from 'ol-ext/control/GridReference'
import type { Point } from 'ol/geom'
import Geoportail from 'ol-ext/layer/Geoportail'
// Layers
const layers = [
  new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS'),
  new Geoportail('GEOGRAPHICALNAMES.NAMES'),
]

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  interactions: defaults({ altShiftDragRotate: false, pinchRotate: false }),
  layers,
})

// GeoJSON layer
const vectorSource = new VectorSource({
  url: '../data/fond_guerre.geojson',
  // projection: 'EPSG:3857',
  format: new GeoJSON(),
  attributions: [
    '&copy; <a href=\'https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire\'>data.culture.gouv.fr</a>',
  ],
  // logo:"https://www.data.gouv.fr/s/avatars/37/e56718abd4465985ddde68b33be1ef.jpg"
})

map.addLayer(
  new VectorLayer({
    // name: 'Fonds de guerre 14-18',
    source: vectorSource,
    style: new Style({
      image: new Icon({ src: '../data/camera.png', scale: 0.8 }),
    }),
  }),
)

// Control Select
const select = new Select({})
map.addInteraction(select)

// Set the control grid reference
let ref: GridReference

function setControl() {
  if (ref) map.removeControl(ref)
  // Sort by region
  let sort; let
    title
  if ((document.querySelector('#region') as HTMLInputElement).checked) {
    // Sort by region + name
    sort = function (this: GridReference, a: Feature, b: Feature) {
      const c1 = `${a.get('region')} ${this.getFeatureName(a)}`
      const c2 = `${b.get('region')} ${this.getFeatureName(b)}`
      // eslint-disable-next-line eqeqeq
      return c1 == c2 ? 0 : c1 < c2 ? -1 : 1
    }
    // display region as title
    title = (f: Feature) => {
      return f.get('region')
    }
  }

  // New control
  ref = new GridReference({
    extent: [-550000, 5250000, 850000, 6650000],
    size: [10, 12],
    target: document.querySelector('.options div') as HTMLElement,
    source: vectorSource,
    property: 'commune',
    sortFeatures: sort,
    indexTitle: title,
  })
  map.addControl(ref)

  // Select feature when click on the reference index
  ref.on('select', e => {
    select.getFeatures().clear()
    select.getFeatures().push(e.feature)
    console.log(e.feature.getGeometry()?.getType())

    const p = (e.feature.getGeometry() as Point).getFirstCoordinate()

    map.getView().animate({
      center: p,
      duration: 500,
    })
  })
}

setControl()
