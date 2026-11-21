import FillPattern from 'ol-ext/style/FillPattern';
import Icon from 'ol/style/Icon';
import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Style from 'ol/style/Style';
import StrokePattern from 'ol-ext/style/StrokePattern';
import Fill from 'ol/style/Fill';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Draw from 'ol/interaction/Draw';

declare const $: JQueryStatic;

let refresh = () => {};
const imgFile = '../data/pattern.png';

window.addEventListener('load', function () {
  // AddChar patterns
  FillPattern.addPattern('copy (char pattern)', { char: '©' });
  FillPattern.addPattern('bug (fontawesome)', {
    char: '\uf188',
    size: 12,
    font: '10px FontAwesome',
  });
  FillPattern.addPattern('smiley (width angle)', {
    char: '\uf118',
    size: 20,
    angle: true,
    font: '15px FontAwesome',
  });

  // Popup
  $('#select').click(function () {
    $('#pselect').toggle();
  });

  let pat = 'hatch';
  const spattern = $('#pselect');
  for (const i in FillPattern.patterns) {
    const p = new FillPattern({ pattern: i });
    $('<div>')
      .attr('title', i)
      .css('background-image', 'url("' + p.getImage().toDataURL() + '")')
      .click(function () {
        pat = this.title;
        refresh();
      })
      .appendTo(spattern);
  }
  $('<div>')
    .attr('title', 'Image (PNG)')
    .css('background-image', 'url("' + imgFile + '")')
    .click(function () {
      pat = this.title;
      refresh();
    })
    .appendTo(spattern);

  // Redraw map
  refresh = function () {
    $('#pselect').hide();
    vector.changed();
    if (
      $.inArray(pat, ['hatch', 'cross', 'dot', 'circle', 'square', 'tile']) < 0
    ) {
      $('#size').prop('disabled', true);
      $('#spacing').prop('disabled', true);
      $('#angle').prop('disabled', true);
      $('#angle').next().text('');
    } else {
      $('#size').prop('disabled', false);
      $('#spacing').prop('disabled', false);
      $('#angle').prop('disabled', false);
      if (pat == 'hatch') $('#angle').next().text('(deg)');
      else $('#angle').next().text('(bool)');
    }
    // Calculate image to be drawn outside the map
    const p = new FillPattern({
      pattern: pat,
      image: pat == 'Image (PNG)' ? new Icon({ src: imgFile }) : undefined,
      ratio: 2,
      color: '#000',
      size: Number(document.querySelector<HTMLInputElement>('#size')!.value),
      spacing: Number(
        document.querySelector<HTMLInputElement>('#spacing')!.value,
      ),
      angle: Number(document.querySelector<HTMLInputElement>('#angle')!.value),
    });
    $('#select').css(
      'background-image',
      'url(' + p.getImage().toDataURL() + ')',
    );
  };

  // Layers
  const layer = new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' });

  // The map
  const map = new Map({
    target: 'map',
    view: new View({ zoom: 5, center: [166326, 5992663] }),
    layers: [layer],
  });

  function getStyle() {
    const p = pat;
    return [
      new Style({
        stroke: new StrokePattern({
          width: 8,
          pattern: p != 'Image (PNG)' ? p : undefined,
          image: p == 'Image (PNG)' ? new Icon({ src: imgFile }) : undefined,
          color: document.querySelector<HTMLInputElement>('#color')!.value,
          offset: Number(
            document.querySelector<HTMLInputElement>('#offset')!.value,
          ),
          scale: Number(
            document.querySelector<HTMLInputElement>('#scale')!.value,
          ),
          fill: new Fill({
            color: document.querySelector<HTMLInputElement>('#bg')!.value,
          }),
          size: Number(
            document.querySelector<HTMLInputElement>('#size')!.value,
          ),
          spacing: Number(
            document.querySelector<HTMLInputElement>('#spacing')!.value,
          ),
          angle: Number(
            document.querySelector<HTMLInputElement>('#angle')!.value,
          ),
        }),
      }),
    ];
  }

  // Nouvelle source de donnee
  const vector = new VectorLayer({
    source: new VectorSource(),
    style: getStyle,
  });
  map.addLayer(vector);
  vector.getSource()!.addFeature(
    new Feature(
      new Polygon([
        [
          [259274, 6398696],
          [63595, 5958419],
          [635956, 5772524],
          [259274, 6398696],
        ],
      ]),
    ),
  );

  // global so we can remove it later
  const interaction = new Draw({
    type: 'Polygon',
    source: vector.getSource()!,
  });
  map.addInteraction(interaction);

  refresh();
});

Object.assign(window, { refresh: () => refresh() });
