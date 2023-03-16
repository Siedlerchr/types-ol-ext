import { Interaction } from 'ol/interaction'
import type { Layer } from 'ol/layer'

export class Options {
  layer?: Layer

  radius?: number
}

/** An interaction to snap on pixel on a layer
 * The CenterTouch interaction modifies map browser event coordinate and pixel properties to force pointer on the viewport center to any interaction that them.
 * @constructor
 * @extends {ol_interaction_Interaction}

 */
export class SnapLayerPixel extends Interaction {
  /**
   * @param {olx.interaction.InteractionOptions} options Options
   *  @param {ol.layer.Layer} options.layer layer to snap on
   */
  constructor(options?: Options);
}
