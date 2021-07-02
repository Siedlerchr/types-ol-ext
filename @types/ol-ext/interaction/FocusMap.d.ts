import { Interaction } from 'ol/interaction';
import { Map as _ol_Map_ } from 'ol';

/** An interaction to focus on the map on click. Usefull when using keyboard event on the map.
 * @constructor
 * @fires focus
 * @extends {Interaction}
 */
export default class FocusMap extends Interaction {
    /** Set the map > add the focus button and focus on the map when pointerdown to enable keyboard events.
     */
    setMap(map: _ol_Map_): void;
}
