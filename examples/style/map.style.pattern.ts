import FillPattern from 'ol-ext/style/FillPattern'
import { Map, View, Feature } from 'ol'
import { Tile, Vector } from 'ol/layer'
import { Stamen, Vector as VectorSource } from 'ol/source'
import { Fill, Icon, Style } from 'ol/style'
import { Draw } from 'ol/interaction'
import { Polygon } from 'ol/geom'

let refresh: any
const imgFile = '../data/pattern.png'

declare global {
  interface Window {
    $(selector: any, context?: any): any,

    refresh(): void
  }
}

$(window).on('load', () => {
  FillPattern.addPattern('copy (char pattern)', { char: '©' })
  FillPattern.addPattern('bug (fontawesome)', { char: '\uf188', size: 12, font: '10px FontAwesome' })
  FillPattern.addPattern('smiley (width angle)', {
    char: '\uf118', size: 20, angle: true, font: '15px FontAwesome',
  })

  // Popup
  $('#select').click(() => {
    $('#pselect').toggle()
  })

  let pat = 'hatch'
  const spattern = $('#pselect')
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const i in FillPattern.patterns) {
    const p = new FillPattern({ pattern: i })
    $('<div>').attr('title', i)
      .css('background-image', `url("${p.getImage().toDataURL()}")`)
      // eslint-disable-next-line no-loop-func
      .click(function () {
        pat = $(this).attr('title') as string
        refresh()
      })
      .appendTo(spattern)
  }
  const p = new FillPattern({ image: new Icon({ src: imgFile }) })
  $('<div>').attr('title', 'Image (PNG)')
    .css('background-image', `url("${imgFile}")`)
    .click(function () {
      pat = $(this).attr('title') as string
      refresh()
    })
    .appendTo(spattern)

  // Redraw map
  refresh = () => {
    $('#pselect').hide()
    vector.changed()
    if ($.inArray(pat, ['hatch', 'cross', 'dot', 'circle', 'square', 'tile']) < 0) {
      $('#size').prop('disabled', true)
      $('#spacing').prop('disabled', true)
      $('#angle').prop('disabled', true)
      $('#angle').next().text('')
    } else {
      $('#size').prop('disabled', false)
      $('#spacing').prop('disabled', false)
      $('#angle').prop('disabled', false)
      if (pat === 'hatch') $('#angle').next().text('(deg)')

      else { $('#angle').next().text('(bool)') }
    }
    // Calculate image to be drawn outside the map
    const pp = new FillPattern(
      {
        pattern: pat,
        image: (pat === 'Image (PNG)') ? new Icon({ src: imgFile }) : undefined,
        ratio: 2,
        color: '#000',
        size: Number($('#size').val()),
        spacing: Number($('#spacing').val()),
        angle: Number($('#angle').val()),
      },
    )
    $('#select').css('background-image', `url(${pp.getImage().toDataURL()})`)
  }
  window.refresh = (): void => {
    refresh()
  }

  // Layers
  const layer = new Tile({
    // title: 'terrain-background',
    source: new Stamen({ layer: 'terrain' }),
  })

  /* fix offset ?!
  var offset;
  layer.on('precompose', function(e)
  { offset=[e.frameState.coordinateToPixelMatrix[12],e.frameState.coordinateToPixelMatrix[12]];
  });
  */
  // The map
  const map = new Map({
    target: 'map',
    view: new View({
      zoom: 5,
      center: [166326, 5992663],
    }),
    layers: [layer],
  })

  function getStyle(feature: any) {
    const ppp = pat
    return [new Style(
      {
        fill: new FillPattern(
          {
            pattern: (ppp !== 'Image (PNG)') ? ppp : undefined,
            image: (ppp === 'Image (PNG)') ? new Icon({ src: imgFile }) : undefined,
            ratio: 1,
            icon: ppp === 'Image (PNG)' ? new Icon({ src: 'data/target.png' }) : undefined,
            color: $('#color').val()?.toString(),
            offset: Number($('#offset').val()),
            scale: Number($('#scale').val()),
            fill: new Fill({ color: $('#bg').val()?.toString() }),
            size: Number($('#size').val()),
            spacing: Number($('#spacing').val()),
            angle: Number($('#angle').val()),
          },
        ),
      },
    )]
  }

  // Nouvelle source de donnee
  const vector = new Vector(
    {
      source: new VectorSource(),
      style: getStyle,
    },
  )
  map.addLayer(vector)
  vector.getSource()?.addFeature(new Feature(new Polygon([[[259274, 6398696], [63595, 5958419], [635956, 5772524], [259274, 6398696]]])))

  // global so we can remove it later
  const interaction = new Draw({
    type: 'Polygon',
    source: vector.getSource() as VectorSource,
  })
  map.addInteraction(interaction)

  refresh()
})
