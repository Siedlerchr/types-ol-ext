import { Map  } from 'ol';
import { Options as OverlayOptions } from 'ol/Overlay';

import Collection from 'ol/Collection';
import Attribution from 'ol/control/Attribution';
import ol_control_Control from 'ol/control/Control';
import ol_control_ScaleLine from 'ol/control/ScaleLine';
import { Coordinate, CoordinateFormat } from 'ol/coordinate';
import { Extent } from 'ol/extent';
import Feature, { FeatureLike } from 'ol/Feature';
import { FeatureLoader } from 'ol/featureloader';
import { Geometry, LineString, Point, Polygon } from 'ol/geom';
import { Layer, Vector } from 'ol/layer';
import { ProjectionLike } from 'ol/proj';
import Projection from 'ol/proj/Projection';
import { Size } from 'ol/size';
import { ImageCanvas, Vector as VectorSource, WMTS } from 'ol/source';
import { AttributionLike } from 'ol/source/Source';
import { LoadingStrategy, Options as VectorSourceOptions } from 'ol/source/Vector';
import { StyleLike, RenderFunction } from 'ol/style/Style';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Image, RegularShape } from 'ol/style';
import GeometryType from 'ol/geom/GeometryType'
import { Pointer, Interaction, Draw, Modify, Select, DragAndDrop } from 'ol/interaction';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { Condition as EventsConditionType } from 'ol/events/condition'
import { Color } from 'ol/color';
import { ColorLike } from 'ol/colorlike';
import { Pixel } from 'ol/pixel';
import FeatureFormat from 'ol/format/Feature';
import Event from 'ol/events/Event';
import OverlayPositioning from 'ol/OverlayPositioning';
import { EventsKey } from 'ol/events';


/** The map is the core component of OpenLayers.
 * For a map to render, a view, one or more layers, and a target container are needed:
 * @namespace Map
 * @see {@link http://openlayers.org/en/latest/apidoc/module-ol_Map.html}
 */
declare module 'ol/Map' {

  export interface PulseOptions {
        projection: ProjectionLike | undefined;
        duration: number;
        easing: ((p0: number) => number);
        style: Stroke;
    }

    /** Pulse a point on postcompose
    *	@deprecated use map.animateFeature instead
    *	@param {Array<Coordinate>} point to pulse
    *	@param {pulse.options} pulse options param
    *		- projection {projection||String} projection of coords
    *		- duration {Number} animation duration in ms, default 3000
    *		- amplitude {Number} movement amplitude 0: none - 0.5: start at 0.5*radius of the image - 1: max, default 1
    *		- easing {easing} easing function, default easing.easeOut
    *		- style {style.Image|Style|Array<Style>} Image to draw as markup, default red circle
     */
    function pulse(point: Coordinate[], options?: PulseOptions): void;

}
