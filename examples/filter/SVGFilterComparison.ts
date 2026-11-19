import Laplacian from 'ol-ext/util/SVGFilter/Laplacian';
import Prewitt from 'ol-ext/util/SVGFilter/Prewitt';
import Roberts from 'ol-ext/util/SVGFilter/Roberts';
import Sobel from 'ol-ext/util/SVGFilter/Sobel';

function toggleFullscreen(event: Event) {
  event.stopPropagation();
  (event.currentTarget as HTMLElement).parentElement?.classList.toggle('fullscreen');
}
document.querySelectorAll<HTMLImageElement>('img').forEach(img => img.addEventListener('click', toggleFullscreen));
document.querySelectorAll<HTMLElement>('.block').forEach(block => block.addEventListener('click', () => block.classList.remove('fullscreen')));
const filters = { Laplacian, Sobel, Prewitt, Roberts };
for (const [name, Filter] of Object.entries(filters)) {
  const filter = new Filter({ id: name, grayscale: true });
  const filterHTML = Array.from(filter.element.children).map(element => `\n    ${element.outerHTML}`).join('');
  const item = document.createElement('li');
  const heading = document.createElement('h3');
  heading.textContent = name;
  const definition = document.createElement('textarea');
  definition.value = `<svg version="1.1" width="0" height="0" style="position: absolute;">\n  <filter id="${name}">${filterHTML}\n  </filter>\n</svg>`;
  item.append(heading, definition);
  document.querySelector('#download ul')!.append(item);
  document.querySelectorAll<HTMLImageElement>(`img.${name}`).forEach(img => {
    img.addEventListener('load', () => {
      const canvas = filter.applyTo(img);
      img.after(canvas);
      canvas.addEventListener('click', toggleFullscreen);
    });
    img.src = img.dataset.src || '';
    img.style.display = 'none';
  });
}
