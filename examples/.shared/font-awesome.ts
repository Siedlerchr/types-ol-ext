export async function loadFontAwesome(): Promise<void> {
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href =
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
  await new Promise<void>((resolve, reject) => {
    stylesheet.addEventListener('load', () => resolve(), { once: true });
    stylesheet.addEventListener(
      'error',
      () => reject(new Error('Font stylesheet failed to load')),
      { once: true },
    );
    document.head.append(stylesheet);
  });
  await document.fonts.load('16px FontAwesome', '\uf240');
}
