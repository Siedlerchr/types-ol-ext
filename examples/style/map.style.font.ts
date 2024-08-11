import type { Feature } from 'ol'
import { Map, View } from 'ol'
import { Tile, Vector } from 'ol/layer'
import { StadiaMaps, Vector as VectorSource } from 'ol/source'
import { Style, Fill, Stroke } from 'ol/style'
import { GeoJSON } from 'ol/format'
import type { FeatureLike } from 'ol/Feature'
import Ordering from 'ol-ext/render/Ordering'
import { Select } from 'ol/interaction'

import type { Form } from 'ol-ext/style/FontSymbol'
import FontSymbol from 'ol-ext/style/FontSymbol'
import Shadow from 'ol-ext/style/Shadow'

import 'ol-ext/style/FontMakiDef.js'
import 'ol-ext/style/FontMaki2Def.js'
import 'ol-ext/style/FontAwesomeDef.js'

// Using FontAwesome > 5, set package here
// FontSymbol.prototype.defs.fonts.FontAwesome.font = "Font Awesome 5 Free";

// Layers
const layer = new Tile({ source: new StadiaMaps({ layer: 'stamen_watercolor' }) })

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 6,
    center: [166326, 5992663],
  }),
  layers: [layer],
})

// Get font glyph
let theGlyph: string | null = 'maki-building'
let theText = ''

function setFont(g: string | HTMLElement) {
  if (typeof (g) === 'string') theGlyph = g
  else theGlyph = g.dataset.glyph!
  theText = ''
  vector.changed()
}

function setText(t: string) {
  theText = t
  theGlyph = null
  vector.changed()
}

// Fill font glyphs
const glyph = FontSymbol.defs.glyphs
const opt: HTMLDivElement = document.querySelector<HTMLDivElement>('.options')!
// eslint-disable-next-line guard-for-in,no-restricted-syntax
for (const font in FontSymbol.defs.fonts) {
  const h2 = document.createElement('h2')
  h2.textContent = `${font}:`
  opt.appendChild(h2)
  // eslint-disable-next-line no-restricted-syntax
  for (const i in glyph) {
    if (glyph[i].font === font) {
      const item: HTMLElement = document.createElement('i')
      item.className = `fa ${i}`
      item.dataset.glyph = i
      item.title = glyph[i].name || ''
      item.addEventListener('click', () => {
        setFont(item)
      })
      opt.appendChild(item)
    }
  }
}

// Style function
function getFeatureStyle(feature: FeatureLike): Style[] {
  const st = []
  // Shadow style
  if (document.querySelector<HTMLInputElement>('#shadow')!.checked) {
    st.push(new Style({
      image: new Shadow({
        radius: 15,
        blur: 5,
        offsetX: 0,
        offsetY: 0,
        fill: new Fill({
          color: 'rgba(0,0,0,0.5)',
        }),
      }),
    }))
  }
  // Font style
  st.push(new Style({
    image: new FontSymbol({
      form: document.querySelector<HTMLSelectElement>('#form')!.value as Form, // "hexagone",
      gradient: document.querySelector<HTMLInputElement>('#gradient')!.checked,
      glyph: theGlyph,
      text: theText, // text to use if no glyph is defined
      font: 'sans-serif',
      fontSize: Number(document.querySelector<HTMLInputElement>('#fontsize')!.value),
      fontStyle: document.querySelector<HTMLInputElement>('#style')!.value,
      radius: Number(document.querySelector<HTMLInputElement>('#radius')!.value),
      // offsetX: -15,
      // eslint-disable-next-line no-mixed-operators
      rotation: Number(document.querySelector<HTMLInputElement>('#rotation')!.value) * Math.PI / 180,
      rotateWithView: document.querySelector<HTMLInputElement>('#rwview')!.checked,
      offsetY: document.querySelector<HTMLInputElement>('#offset')!.checked
        ? -Number(document.querySelector<HTMLInputElement>('#radius')!.value) : 0,
      color: document.querySelector<HTMLInputElement>('#color')!.value,
      fill: new Fill({
        color: document.querySelector<HTMLInputElement>('#fill')!.value,
      }),
      stroke: new Stroke({
        color: document.querySelector<HTMLInputElement>('#stroke')!.value,
        width: Number(document.querySelector<HTMLInputElement>('#border')!.value),
      }),
    }),
    stroke: new Stroke({
      width: 2,
      color: '#f80',
    }),
    fill: new Fill({
      color: [255, 136, 0, 0.6],
    }),
  }))
  return st
}

function getStyle(feature: FeatureLike, resolution: number): Style | Style[] {
  const s = getFeatureStyle(feature)
  // Ne pas recalculer
  // feature.setStyle(s);
  return s
}

// GeoJSON layer
const vectorSource = new VectorSource({
  url: '../data/fond_guerre.geojson',
  format: new GeoJSON({
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857',
  }),
  attributions: ['&copy; <a href=\'https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire\'>'
    + '<img src=\'https://data.culture.gouv.fr/assets/logo\' height=\'12px\'>data.culture.gouv.fr</a>'],
})

const vector = new Vector({
  source: vectorSource,
  // y ordering
  renderOrder: Ordering.yOrdering(),
  style: getStyle,
})
vector.set('name', '1914-18')
vector.set('preview', 'http://www.culture.gouv.fr/Wave/image/memoire/2445/sap40_z0004141_v.jpg')

map.addLayer(vector)

//
function setOptions(
  glyphOpt: string,
  form: string,
  color: string,
  scolor: string,
  fcolor: string,
  border: number,
  radius: number,
  fsize: number,
  offset: boolean,
  gradient: boolean,
  shadow: boolean,
) {
  theGlyph = glyphOpt
  theText = ''
  document.querySelector<HTMLInputElement>('#style')!.value = ''
  document.querySelector<HTMLInputElement>('#color')!.value = color
  document.querySelector<HTMLInputElement>('#form')!.value = form
  document.querySelector<HTMLInputElement>('#fill')!.value = fcolor
  document.querySelector<HTMLInputElement>('#stroke')!.value = scolor
  document.querySelector<HTMLInputElement>('#border')!.value = border.toString()
  document.querySelector<HTMLInputElement>('#radius')!.value = radius.toString()
  document.querySelector<HTMLInputElement>('#fontsize')!.value = (fsize || 1).toString()
  document.querySelector<HTMLInputElement>('#offset')!.checked = offset || false
  document.querySelector<HTMLInputElement>('#gradient')!.checked = gradient || false
  document.querySelector<HTMLInputElement>('#shadow')!.checked = shadow || false
  // Refresh
  vector.changed()
}

// Redraw layer when fonts are loaded
window.addEventListener('load', () => {
  console.log('loaded')
  vector.changed()
})

map.addInteraction(new Select())

declare global {
  interface Window {
    vector: Vector<Feature, VectorSource>,

    setOptions(glyph: string, form: string, color: string, scolor: string, fcolor: string, border: number,
      radius: number, fsize: number, offset: boolean, gradient: boolean, shadow: boolean): void,

    setFont(g: string | HTMLElement): void,

    setText(t: string): void
  }
}
window.vector = vector
window.setOptions = (
  glyphOpt: string,
  form: string,
  color: string,
  scolor: string,
  fcolor: string,
  border: number,
  radius: number,
  fsize: number,
  offset: boolean,
  gradient: boolean,
  shadow: boolean,
): void => {
  setOptions(glyphOpt, form, color, scolor, fcolor, border, radius, fsize, offset, gradient, shadow)
}
window.setFont = (g: string | HTMLElement) => {
  setFont(g)
}
window.setText = (t: string) => {
  setText(t)
}
