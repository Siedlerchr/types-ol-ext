import { Map, View } from 'ol';
import { Tile, Vector } from 'ol/layer';
import { Stamen, OSM, Vector as VectorSource } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { defaults as control_defaults } from 'ol/control';
import LayerPopup from 'ol-ext/control/LayerPopup';

// Two base layers
const stamen = new Tile(
    {	source: new Stamen({
            layer: 'watercolor'
        })
    });
stamen.set('title', "Watercolor");
stamen.set('baseLayer', true);

const stamen2 = new Tile(
    {	visible: false,
        source: new Stamen({
            layer: 'toner'
        })
    });
stamen2.set('title', "Toner");
stamen2.set('baseLayer', true);

const osm = new Tile(
    {	source: new OSM(),
        visible: false
    });
osm.set('title', "OSM");
osm.set('baseLayer', true);

// GeoJSON layer with a preview attribute
const vectorSource = new VectorSource(
    {	url: '../data/fond_guerre.geojson',
        format: new GeoJSON({
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        }),
        attributions: [ "&copy; <a href='https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire'>" +
                        "<img src='https://data.culture.gouv.fr/assets/logo' height='12px'>data.culture.gouv.fr</a>" ],
    });

const vector = new Vector(
    {	source: vectorSource
    });
vector.set('name', '1914-18');
vector.set('preview', "http://www.culture.gouv.fr/Wave/image/memoire/2445/sap40_z0004141_v.jpg");

// The map
const map = new Map
({	target: 'map',
    view: new View
    ({	zoom: 6,
        center: [173664, 6166327]
    }),
    controls: control_defaults().extend
    ([	new LayerPopup(),
    ]),
    layers: [stamen, stamen2, osm, vector]
});
