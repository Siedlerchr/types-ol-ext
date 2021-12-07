import { View, Collection, Feature, Map } from 'ol';
import { LineString, Circle, MultiPoint, Point, Geometry } from 'ol/geom';
import { Modify } from 'ol/interaction';
import TileLayer from 'ol/layer/Tile';
import { Stamen, Vector } from 'ol/source';
import { Style, Stroke } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import CircleStyle from 'ol/style/Circle';
import cspline from 'ol-ext/render/Cspline';

  // Layers
  const layer = new TileLayer({ source: new Stamen({ layer: 'watercolor' }) });

  // The map
  const map = new Map({
    target: 'map',
    view: new View({
      zoom: 6,
      center: [166246, 6118863]
    }),
    layers: [layer]
  });

  // Data to draw on the map
  const lstring = [[-315612, 5859589], [-144393, 6211811], [232288, 6275406], [354587, 5952536], [755728, 6113971]];

  const features = new Collection<Feature>();
  features.push (new Feature(new LineString(lstring)));

  const vector = new VectorLayer({
    source: new Vector({ features }),
    style(f) {
      const opt = {
        tension: Number($("#tension").val()),
        pointsPerSeg: Number($("#pps").val()),
        normalize: $("#normalize").prop("checked")
      };
      //TODO cspline not found
      const csp = f.getGeometry()?.cspline(opt);

      return [ new Style({
        stroke: new Stroke({ color: "red", width: 1 }),
        geometry: $("#cspline").prop("checked") ? csp : undefined
      }),
      new Style({
        image: new CircleStyle({ stroke: new Stroke({color: "blue", width: 1}), radius: 1 }),
        geometry: ($("#dpt").prop("checked") && $("#cspline").prop("checked")) ? new MultiPoint(csp.getCoordinates()) : undefined
      }),
      new Style({
        image: new CircleStyle({ stroke: new Stroke({color: "red", width: 4}), radius: 2 }),
        geometry: new MultiPoint((f.getGeometry() as Point).getCoordinates())
      })
      ];
    }
  });
  map.addLayer(vector);

  const mod = new Modify({ features });
  map.addInteraction(mod);

