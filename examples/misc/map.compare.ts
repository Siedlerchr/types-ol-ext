import { View, Map as _ol_Map, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { Stamen, XYZ } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { GeoJSON } from 'ol/format';
import Synchronize from 'ol-ext/interaction/Synchronize';
import Clip from 'ol-ext/interaction/Clip';
import SwipeMap from 'ol-ext/control/SwipeMap';
import { Select } from 'ol/interaction';
import { click } from 'ol/events/condition';
import Popup from 'ol-ext/overlay/Popup';
import { containsCoordinate } from 'ol/extent';
import { CollectionEvent } from 'ol/Collection';
import Geometry from 'ol/geom/Geometry';
import GeometryType from 'ol/geom/GeometryType';
import { Point } from 'ol/geom';
// Layers
var mapbox = new TileLayer({
    minResolution: 306,
    source: new XYZ({
        url: 'https://{a-d}.tiles.mapbox.com/v3/mapbox.natural-earth-hypso-bathy/{z}/{x}/{y}.png',
        attributions: ['&copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ']
    })
});
var stamen = new TileLayer({
    source: new Stamen({ layer: 'watercolor' })
});

// The map
var map = new _ol_Map({
    target: 'map',
    view: new View({
        zoom: 10,
        center: [262600, 6250704]
    }),
    layers: [new TileLayer({
        source: new Stamen({ layer: 'watercolor' })
    })]
});

var map2 = new _ol_Map({
    target: 'map2',
    view: new View({
        zoom: 5,
        center: [166326, 5992663]
    }),
    layers: [new TileLayer({
        source: new Stamen({ layer: 'toner' })
    })]
});

function getLayer() {
    return new VectorLayer({
        className: 'vector',
        source: new VectorSource({
            url: '../data/fond_guerre.geojson',
            format: new GeoJSON({
                featureProjection: 'EPSG:3857',
            }),
            attributions: ['&copy; <a href="https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire">data.culture.gouv.fr</a>']
        })

    });
}
map.addLayer(getLayer());
map2.addLayer(getLayer());

// Select interaction
var select1 = new Select({ condition: click });
map.addInteraction(select1);
var select2 = new Select({ condition: click });
map2.addInteraction(select2);

var popup1 = new Popup({ anim: true, closeBox: true });
map.addOverlay(popup1);
var popup2 = new Popup({ anim: true, closeBox: true });
map2.addOverlay(popup2);

function showPopup(e: CollectionEvent<Feature<Geometry>>, popup: Popup) {
    var feature = e.element;
    var content = "";
    if (!feature.get('text')) return;
    content += "<img src='" + feature.get("img") + "'/>";
    content += feature.get("text");

    const f = feature.getGeometry();
    if (f instanceof Point) {
        if (/swipe/.test(currentMode)) {
            popup2.show(f.getFirstCoordinate(), content);

        } else {
            popup.show(f.getFirstCoordinate(), content);
        }
    }
}
function hidePopup() {
    popup1.hide();
    popup2.hide();
}
select1.getFeatures().on('add', function (e) { showPopup(e, popup1) });
select2.getFeatures().on('add', function (e) { showPopup(e, popup2) });
select1.getFeatures().on('remove', hidePopup);
select2.getFeatures().on('remove', hidePopup);

// Synchronize the maps
map.addInteraction(new Synchronize({ maps: [map2] }));
map2.addInteraction(new Synchronize({ maps: [map] }));

// Tools
var clip = new Clip({ radius: 150, layers: map2.getLayers().getArray() });
//var swipe = new ol.control.Swipe({ rightLayers: map2.getLayers().getArray(),  });
var swipe = new SwipeMap({ right: true });

// Change mode
var currentMode: string;
function setMode(mode: string) {
    if (mode) {
        currentMode = mode;
        // Remove tools
        map2.removeControl(swipe);
        map2.removeInteraction(clip);
        // Set interactions
        switch (mode) {
            case 'swipev':
            case 'swipeh': {
                map2.addControl(swipe);
                swipe.set('orientation', (mode === 'swipev' ? 'vertical' : 'horizontal'));
                break;
            }
            case 'clip': {
                map2.addInteraction(clip);
                break;
            }
        }
        // Update position
        const compare = document.getElementById("compare")
        if (compare) {
            compare.className = mode;
        }
        select1.getFeatures().clear();
        select2.getFeatures().clear();
    }
    map.updateSize();
    map2.updateSize();
}

// Check click and dispatch to map
map2.on('click', function (e) {
    if (/swipe/.test(currentMode)) {
        if (!containsCoordinate(swipe.getRectangle(), e.pixel)) {
            // Simulate map1 selection
            e.map = map;
            e.stopPropagation();
            select2.getFeatures().clear();
            select1.handleEvent(e);
        } else {
            select1.getFeatures().clear();
        }
    }
});
