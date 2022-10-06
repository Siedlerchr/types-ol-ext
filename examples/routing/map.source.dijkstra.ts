
import { Map, View, Map as _ol_Map } from 'ol';
import { Stamen, Vector as VectorSource } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { Style, Circle, Stroke, Fill } from 'ol/style';
import TileLayer from 'ol/layer/Tile';
import Dijskra from 'ol-ext/geom/Dijkstra';
import { getLength } from 'ol/sphere'
import { Coordinate } from 'ol/coordinate';
import { unByKey } from 'ol/Observable';
import VectorLayer from 'ol/layer/Vector';
import Placemark from 'ol-ext/overlay/Placemark';
import { Geometry } from 'ol/geom';
import Feature from 'ol/Feature';

// Calculate the speed fsactor
var speed: {[char: string]: number } = { A: 1, P: 1, R: 1, L: 1 };
declare global {
    interface Window {
        map: _ol_Map;
        nodes: VectorLayer<VectorSource<Geometry>>;
    }
}
const $ = window.$;


function calcSpeed() {
    if ($("#speed").prop('checked')) {
        speed.A = 1 / Math.max(Number($(".speed #A").val()), 1);
        speed.P = 1 / Math.max(Number($(".speed #P").val()), 1);
        speed.R = 1 / Math.max(Number($(".speed #R").val()), 1);
        speed.L = 1 / Math.max(Number($(".speed #L").val()), 1);
    } else {
        speed = { A: 1, P: 1, R: 1, L: 1 };
    }
}
calcSpeed();

// Layers
var layers = [new TileLayer({ source: new Stamen({ layer: 'watercolor' }) })];

// The map
var map = new Map({
    target: 'map',
    view: new View({
        zoom: 6,
        center: [166326, 5992663]
    }),
    layers: layers
});

// The vector graph
var graph = new VectorSource({
    url: '../data/ROUTE120.geojson',
    format: new GeoJSON()
});
var listenerKey = graph.on('change', function () {
    if (graph.getState() == 'ready') {
        $('.loading').hide();
        unByKey(listenerKey);
    }
});
var vector = new VectorLayer({
    source: graph
});
map.addLayer(vector);

// A layer to draw the result
var result = new VectorSource();
map.addLayer(new VectorLayer({
    source: result,
    style: new Style({
        stroke: new Stroke({
            width: 2,
            color: "#f00"
        })
    })
}));

// Dijkstra
var dijkstra = new Dijskra({
    source: graph
});
// Start processing
dijkstra.on('start', function (e) {
    $('#warning').hide();
    $("#notfound").hide();
    $("#notfound0").hide();
    $("#result").hide();
    result.clear();
});
// Finish > show the route
dijkstra.on('finish', function (e) {
    $('#warning').hide();
    result.clear();
    console.log(e);
    if (!e.route.length) {
        if (e.wDistance === -1) $("#notfound0").show();
        else $("#notfound").show();
        $("#result").hide();
    } else {
        $("#result").show();
        var t = (e.distance / 1000).toFixed(2) + 'km';
        // Weighted distance
        if ($("#speed").prop('checked')) {
            var h = e.wDistance / 1000;
            var mn: string | number = Math.round((e.wDistance % 1000) / 1000 * 60);
            if (mn < 10) mn = '0' + mn;
            t += '<br/>' + h.toFixed(0) + 'h ' + mn + 'mn';
        }
        $("#result span").html(t);
    }
    result.addFeatures(e.route);
    start = end;
    popStart.show(start);
    popEnd.hide();
});
// Paused > resume
dijkstra.on('pause', function (e) {
    if (e.overflow) {
        $('#warning').show();
        dijkstra.resume();
    } else {
        // User pause
    }
});
// Calculating > show the current "best way"
dijkstra.on('calculating', function (e) {
    if ($('#path').prop('checked')) {
        var route = dijkstra.getBestWay();
        result.clear();
        result.addFeatures(route);
    }
});

// Get the weight of an edge
dijkstra.weight = function (feature) {
    var type = feature ? feature.get('type') as keyof typeof speed : 'A';
    if (!speed[type]) console.error(type)
    return speed[type] || speed.L;
};
// Get direction of the edge
dijkstra.direction = function (feature) {
    return feature.get('dir');
}
// Get the real length of the geom
dijkstra.getLength = function (geom) {
    let castedGeom: Geometry;
    if (geom instanceof Feature<Geometry>) {
        castedGeom = geom.getGeometry()!;
        return getLength(castedGeom)
    }
    return getLength(geom);
}

// Display nodes in a layer
var nodes = new VectorLayer({
    source: dijkstra.getNodeSource(),
    style: new Style({
        image: new Circle({
            radius: 5,
            fill: new Fill({ color: [255, 0, 0, .1] })
        })
    })
});
map.addLayer(nodes);

// Start / end Placemark
var popStart = new Placemark({ popupClass: 'flagv', color: '#080' });
map.addOverlay(popStart);
var popEnd = new Placemark({ popupClass: 'flag finish', color: '#000' });
map.addOverlay(popEnd);

// Manage start / end on click
var start: Coordinate, end: Coordinate;
map.on('click', function (e) {
    if (!start) {
        start = e.coordinate;
        popStart.show(start);
    } else {
        popEnd.show(e.coordinate);
        setTimeout(function () {
            const se = dijkstra.path(start, e.coordinate);
            if (typeof se !== 'boolean') {
                start = se[0];
                end = se[1];
            } else {
                popEnd.hide();
            }
        }, 100)
    }
});


window.calcSpeed = calcSpeed
window.map = map;
window.nodes = nodes;
