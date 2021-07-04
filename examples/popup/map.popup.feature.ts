import { Map, View } from 'ol';
import { Tile, Vector } from 'ol/layer';
import { Stamen, Vector as VectorSource } from 'ol/source';
import { defaults as interaction_defaults } from 'ol/interaction';
import { GeoJSON } from 'ol/format';
import { Style, RegularShape, Stroke, Text, Fill } from 'ol/style';
import { Select } from 'ol/interaction';
import Feature from 'ol/Feature';
import { singleClick } from 'ol/events/condition';

import PopupFeature, { ol_Overlay_PopupFeature_localString as localString } from 'ol-ext/overlay/PopupFeature';

// Layers
const stamen = new Tile({
    source: new Stamen({ layer: 'terrain' })
});
stamen.set('title', 'terrain-background');

const layers = [stamen];

// The map
const map = new Map({
    target: 'map',
    view: new View({
        zoom: 5,
        center: [166326, 5992663]
    }),
    interactions: interaction_defaults({ altShiftDragRotate:false, pinchRotate:false }),
    layers: layers
});

// GeoJSON layer
const vectorSource = new VectorSource({
    url: '../data/departements.geojson',
    format: new GeoJSON(),
    attributions: [ "&copy; <a href='https://www.insee.fr'>INSEE</a>", "&copy; <a href='https://www.data.gouv.fr/fr/datasets/geofla-r/'>IGN</a>" ],
});

const vector = new Vector({
    source: vectorSource,
    style: function(f) {
        return new Style({
            image: new RegularShape({
                radius: 5,
                radius2: 0,
                points: 4,
                stroke: new Stroke({ color: "#000", width:1 })
            }),
            text: new Text ({
                text: f.get('id').toString(),
                font: 'bold 11px sans-serif',
            }),
            stroke: new Stroke({
                width: 1,
                color: [255,128,0]
            }),
            fill: new Fill({
                color: [255,128,0,.2]
            })
        })
    }
});
vector.set('name', 'Departements');
map.addLayer(vector);

// Select  interaction
const select = new Select({
    hitTolerance: 5,
    multi: true,
    condition: singleClick
});
map.addInteraction(select);

// Select control
const popup = new PopupFeature({
    popupClass: 'default anim',
    select: select,
    canFix: true,
    template: {
        title:
        // 'nom',   // only display the name
            function(f: Feature) {
                return f.get('nom')+' ('+f.get('id')+')';
            },
        attributes: // [ 'region', 'arrond', 'cantons', 'communes', 'pop' ]
            {
                'region': { title: 'Région' },
                'arrond': { title: 'Arrondissement' },
                'cantons': { title: 'Cantons' },
                'communes': { title: 'Communes' },
                // with prefix and suffix
                'pop': {
                    title: 'Population',  // attribute's title
                    before: '',           // something to add before
                    format: localString(),  // format as local string
                    after: ' hab.'        // something to add after
                },
                // calculated attribute
                'pop2': {
                    title: 'Population (kHab.)',  // attribute's title
                    format: function(val: string, f: any) {
                        return Math.round(parseInt(f.get('pop'))/100).toLocaleString() + ' kHab.'
                    }
                }
                /* Using localString with a date * /
                'date': { 
                  title: 'Date', 
                  format: PopupFeature.localString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) 
                }
                /**/
            }
    }
});
map.addOverlay (popup);
