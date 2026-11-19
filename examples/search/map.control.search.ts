import { Map, View } from 'ol';
import type { Coordinate } from 'ol/coordinate';
import { easeOut } from 'ol/easing';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import Search from 'ol-ext/control/Search';

interface Place { name: string; pos: Coordinate; zoom: number }
const map = new Map({ target: 'map', view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new TileLayer({ source: new OSM() })] });
const positions: Place[] = [
  { name: 'Paris', pos: fromLonLat([2.351828, 48.856578]), zoom: 11 },
  { name: 'London', pos: fromLonLat([-0.1275, 51.507222]), zoom: 11 },
  { name: 'Geneve', pos: fromLonLat([6.149985, 46.200013]), zoom: 13 },
  { name: 'Bruxelles', pos: fromLonLat([4.35, 50.83]), zoom: 12 },
  { name: 'Berlin', pos: fromLonLat([13.383333, 52.516667]), zoom: 12 },
  { name: 'Madrid', pos: fromLonLat([-3.683333, 40.433333]), zoom: 12 },
  { name: 'Roma', pos: fromLonLat([12.48657, 41.888732]), zoom: 12 },
];
const search = new Search<Place>({ getTitle: place => place.name,
  autocomplete: value => {
    const expression = new RegExp(value.replace('*', '') || '.*', 'i');
    return positions.filter(place => expression.test(place.name));
  } });
map.addControl(search);
search.on('select', event => map.getView().animate({ center: event.search.pos, zoom: 6, easing: easeOut }));
