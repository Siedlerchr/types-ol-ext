import { Map, View } from 'ol'
import { unByKey } from 'ol/Observable'
import { Tile, Vector } from 'ol/layer'
import { StadiaMaps, OSM, Vector as VectorSource } from 'ol/source'
import { GeoJSON } from 'ol/format'
import { Style, Stroke } from 'ol/style'
import { Select } from 'ol/interaction'
import type { FeatureLike } from 'ol/Feature'
import type { Point } from 'ol/geom'
import Photo from 'ol-ext/style/Photo'
import Imageline from 'ol-ext/control/Imageline'

declare global {
  interface Window {
    $(selector: any, context?: any): any,

    iline: Imageline
  }
}
const { $ } = window

// Two base layers
const stamen = new Tile({
  source: new StadiaMaps({
    layer: 'stamen_watercolor',
  }),
})
stamen.set('title', 'Watercolor')
stamen.set('baseLayer', true)

const osm = new Tile({
  source: new OSM(),
  visible: false,
})
osm.set('title', 'OSM')
osm.set('baseLayer', true)

// Style function
const cache: { [key: string]: Style; } = {}

function style(select?: boolean) {
  return function (f: FeatureLike, resolution: number): Style | Style[] {
    const id = f.get('img') + (select ? '-s' : '')
    let resultStyle = cache[id]
    if (!resultStyle) {
      resultStyle = new Style({
        image: new Photo({
          src: f.get('img'),
          radius: select ? 20 : 15,
          shadow: true,
          stroke: new Stroke({
            width: 4,
            color: select ? '#fff' : '#fafafa',
          }),
        }),
      })
      cache[id] = resultStyle
    }
    return resultStyle
  }
}

// GeoJSON layer with a preview attribute
const vectorSource = new VectorSource({
  url: '../data/fond_guerre.geojson',
  format: new GeoJSON({
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857',
  }),
  attributions: ['&copy; <a href=\'https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire\'>data.culture.gouv.fr</a>'],
})
const listenerKey = vectorSource.on('change', e => {
  if (vectorSource.getState() === 'ready') {
    unByKey(listenerKey)
    iline.refresh()
  }
})
const vector = new Vector({
  source: vectorSource,
  style: style(),
})
vector.set('name', '1914-18')
vector.set('preview', 'http://www.culture.gouv.fr/Wave/image/memoire/2445/sap40_z0004141_v.jpg')

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 6,
    center: [173664, 6166327],
  }),
  layers: [stamen, osm, vector],
})

// Create Imageline control when features are loaded
const iline = new Imageline({
  // source: vectorSource,
  // target: $('.options').get(0),
  collapsible: true,
  getImage(f) {
    return f.get('img')
  },
  getTitle(f) {
    return f.get('text')
  },
})
map.addControl(iline)
window.iline = iline

// Click on an image
iline.on('select', e => {
  map.getView().animate({
    center: (e.feature.getGeometry()! as Point).getCoordinates(),
    zoom: Math.round(8 + Math.random()),
  })
  select.getFeatures().clear()
  select.getFeatures().push(e.feature)
})
// Collapse the line
iline.on('collapse', e => {
  if (e.collapsed) $('#map').addClass('noimg')
  else $('#map').removeClass('noimg')
})

const select = new Select({ hitTolerance: 5, style: style(true) })
map.addInteraction(select)
select.on('select', e => {
  const f = e.selected[0]
  iline.select(f)
})

// Redraw layer when fonts are loaded
$(window).on('load', () => {
  console.log('loaded')
  vector.changed()
})
