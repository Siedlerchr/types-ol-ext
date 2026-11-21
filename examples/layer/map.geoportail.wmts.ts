import Geoportail from 'ol-ext/layer/Geoportail';
import 'ol-ext/layer/GetPreview';

declare const $: JQueryStatic;

/*
var services = [
  'administratif',
  'agriculture',
  'altimetrie',
  'cartes',
  'cartovecto',
  'clc',
  'economie',
  'environnement',
  'ortho',
  'orthohisto',
  'satellite',
  'sol',
  'parcellaire',
  'topographie',
  'transports',
  'divers'
];
*/

const ul = $('#geoportail');
Geoportail.getCapabilities().then(function (caps, themes) {
  if (!themes) return;
  // Sort but "autre"
  function sort(a: string | number, b: string | number) {
    if (a === 'autre') return 1;
    if (b === 'autre') return -1;
    return a < b ? -1 : a > b ? 1 : 0;
  }
  // Sort by theme
  Object.keys(themes)
    .sort(sort)
    .forEach(function (k) {
      const li = $('<li>').appendTo(ul);
      $('<p>')
        .text(k)
        .click(function (e) {
          e.currentTarget.nextElementSibling?.classList.toggle('collapsed');
        })
        .appendTo(li);
      const ul2 = $('<ul>').appendTo(li);
      Object.keys(themes[k]).forEach(function (c) {
        const cap = themes[k][c];
        Geoportail.register(c, cap);
        const l = new Geoportail({ layer: c });
        const li = $('<li>')
          .click(function () {
            $('#code .js5').text(
              'ol.layer.Geoportail.register(' +
                '"' +
                c +
                '", ' +
                JSON.stringify(cap) +
                ');\n' +
                "var layer = new ol.layer.Geoportail({ layer: '" +
                c +
                "' });",
            );
            $('#code .es6').text(
              "import Geoportail from 'ol-ext/layer/Geoportail';\n" +
                'Geoportail.register("' +
                c +
                '", ' +
                JSON.stringify(cap) +
                ');\n' +
                "const layer = new Geoportail({ layer: '" +
                c +
                "' });",
            );
          })
          .appendTo(ul2);
        $('<img>').attr('src', l.getPreview()[0]).appendTo(li);
        $('<p>').text(cap.title).appendTo(li);
        $('<p>').text(c).appendTo(li);
        $('<p class="desc">')
          .text(cap.desc ?? '')
          .appendTo(li);
      });
      $('#nb').text($('#geoportail ul li:visible').length);
    });
});

function code(elt: HTMLElement, type: string) {
  $('.choice li').removeClass('select');
  $(elt).addClass('select');
  $('#code textarea').hide();
  $('#code textarea.' + type).show();
}
function copy() {
  $('#code textarea:visible').select();
  document.execCommand('copy');
  $('#code textarea:visible').blur();
}

$('#search').on('keyup blur change search', function () {
  const st = document.querySelector<HTMLInputElement>('#search')!.value;
  const query = st.toLowerCase();
  $('#geoportail ul li').each(function () {
    if ($(this).text().toLowerCase().includes(query)) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
  $('#nb').text($('#geoportail ul li:visible').length);
});

Object.assign(window, { code, copy });
