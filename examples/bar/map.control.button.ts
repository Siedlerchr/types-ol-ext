import { Map, View } from 'ol';
import { Tile } from 'ol/layer';
import { OSM } from 'ol/source';

import Button from 'ol-ext/control/Button';

// The map
const map = new Map
({	target: 'map',
  view: new View
  ({	zoom: 14,
    center: [270701, 6247637]
  }),
  layers:
    [	new Tile({ source: new OSM() }),
    ]
});

console.log("ok")
// Add a custom push button with onToggle function
const hello = new Button (
  {	html: '<i class="fa fa-smile-o"></i>',
    className: "hello",
    title: "Hello world!",
    handleClick: function()
    {	info ("hello World!");
    }
  });
map.addControl(hello);

// Add a save button with on active event
const save = new Button (
  {	html: '<i class="fa fa-download"></i>',
    className: "save",
    title: "Save",
    handleClick: function()
    {	info("Center: "+map.getView().getCenter()+" - zoom: "+map.getView().getZoom());
    }
  });
map.addControl ( save );

// Show info
function info(i: string)
{	document.querySelector('#info')!.innerHTML = i||"";
}
