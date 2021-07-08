import { Coordinate } from "ol/coordinate";
import { EventsKey } from "ol/events";
import { ProjectionLike } from "ol/proj";
import { Style, Image } from "ol/style";

declare module 'ol/Map' {

    /** Show a markup a point on postcompose
        *	@deprecated use map.animateFeature instead
        *	@param {Array<Coordinate>} point to pulse
        *	@param {markup.options} pulse options param
        *		- projection {projection|String|undefined} projection of coords, default none
        *		- delay {Number} delay before mark fadeout
        *		- maxZoom {Number} zoom when mark fadeout
        *		- style {style.Image|Style|Array<Style>} Image to draw as markup, default red circle
        *	@return Unique key for the listener with a stop function to stop animation
         */
    function markup(point: Array<Coordinate>, options: {
        projection?: ProjectionLike,
        delay?: number,
        maxZoom?: number,
        style?: Image | Style | Style[]
    }): EventsKey;

}
