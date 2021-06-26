import { Map, View } from 'ol';
import { Vector, Tile } from 'ol/layer';
import { Vector as VectorSource, OSM } from 'ol/source';
import { Select, Draw } from 'ol/interaction';
import GeometryType from 'ol/geom/GeometryType';

import Bar from 'ol-ext/control/Bar';
import Toggle from 'ol-ext/control/Toggle';
// import ZoomToExtent from 'ol-ext/control/ZoomToExtent';
// import Rotate from 'ol-ext/control/Rotate';
// import FullScreen from 'ol-ext/control/FullScreen';

//  Vector layer
const vector = new Vector( { source: new VectorSource() })

// The map
const map = new Map
({	target: 'map',
    view: new View
    ({	zoom: 14,
        center: [270701, 6247637]
    }),
    layers:
        [	new Tile({ source: new OSM() }),
            vector
        ]
});

// Main control bar
const mainbar = new Bar();
map.addControl(mainbar);

/* Nested toobar with one control activated at once */
const nested = new Bar ({ toggleOne: true, group:true });
mainbar.addControl (nested);
// Add selection tool (a toggle control with a select interaction)
const selectCtrl = new Toggle(
    {	html: '<i class="fa fa-hand-pointer-o"></i>',
        className: "select",
        title: "Select",
        interaction: new Select (),
        active:true,
        onToggle: function(active)
        {	document.querySelector('#info')!.innerHTML = "Select is "+(active?"activated":"deactivated");
        }
    });
nested.addControl(selectCtrl);

// Add editing tools
const pedit = new Toggle(
    {	html: '<i class="fa fa-map-marker" ></i>',
        className: "edit",
        title: 'Point',
        interaction: new Draw
        ({	type: GeometryType.POINT,
            source: vector.getSource()
        }),
        onToggle: function(active)
        {	document.querySelector('#info')!.innerHTML = "Edition is "+(active?"activated":"deactivated");
        }
    });
nested.addControl ( pedit );

/* Standard Controls */
// mainbar.addControl (new ZoomToExtent({  extent: [ 265971,6243397 , 273148,6250665 ] }));
// mainbar.addControl (new Rotate());
// mainbar.addControl (new FullScreen());

// Show info
function info(i: string)
{	document.querySelector('#info')!.innerHTML = i||"";
}

interface Window {
    mainbar: Bar
}
declare var window: Window;
window.mainbar = mainbar;
