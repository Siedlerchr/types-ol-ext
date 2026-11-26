import type { FeatureCollection } from 'geojson';
import type Feature from 'ol/Feature';
import { downloadBlob } from '../.shared/download';
import Map from 'ol/Map';
import View from 'ol/View';
import Geoportail from 'ol-ext/layer/Geoportail';
import VectorImage from 'ol/layer/VectorImage';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import BaseLayer from 'ol/layer/Base';

// @see https://github.com/riatelab/geoimport

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 3,
    center: [270148, 6247782],
  }),
  layers: [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })],
});

declare const geoimport: {
  init(options: { path: string; useWorker: boolean }): void;
  toGeoJSON(file: File): Promise<FeatureCollection>;
  fromGeoJSON(
    collection: FeatureCollection,
    filename: string,
    format: string,
  ): Promise<Blob | string>;
};

geoimport.init({
  path: 'https://cdn.jsdelivr.net/npm/geoimport@latest/dist/static/',
  useWorker: false,
});

const fileInput =
  document.querySelector<HTMLInputElement>('input[type="file"]')!;
const formatInput = document.querySelector<HTMLSelectElement>('select')!;
const loading = document.querySelector<HTMLDialogElement>('dialog.loading')!;
const loaded = document.querySelector<HTMLDialogElement>('dialog.loaded')!;
const saving = document.querySelector<HTMLDialogElement>('dialog.saving')!;
const errorDialog = document.querySelector<HTMLDialogElement>('dialog.error')!;
const format = new GeoJSON<Feature>();
const view = map.getView();
let source: VectorSource<Feature> | undefined;

function showError(error: unknown) {
  const detail = Array.isArray(error) ? error[0] : error;
  errorDialog.querySelector('p')!.textContent =
    detail instanceof Error || detail?.message
      ? String(detail.message)
      : 'Unable to convert the file.';
  errorDialog.showModal();
}

loaded.querySelector('button')!.addEventListener('click', () => {
  const extent = source?.getExtent();
  if (extent) view.fit(extent);
  loaded.close();
});

fileInput.addEventListener('change', async () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  loading.showModal();
  try {
    const collection = await geoimport.toGeoJSON(file);
    const features = format.readFeatures(collection, {
      featureProjection: view.getProjection(),
    });
    source = new VectorSource({ features });
    map.addLayer(new VectorImage({ source }));
    loaded.querySelector('p')!.textContent =
      `${features.length} features loaded`;
    loaded.showModal();
  } catch (error) {
    showError(error);
  } finally {
    loading.close();
  }
});

formatInput.addEventListener('change', async () => {
  const extension = formatInput.value;
  formatInput.value = '';
  if (!source || !extension) return;
  const data = format.writeFeaturesObject(source.getFeatures(), {
    dataProjection: 'EPSG:4326',
    featureProjection: view.getProjection(),
  }) as FeatureCollection;
  if (extension === 'geojson') {
    downloadBlob(
      new Blob([JSON.stringify(data)], { type: 'application/geo+json' }),
      'export.geojson',
    );
    return;
  }
  saving.showModal();
  try {
    const result = await geoimport.fromGeoJSON(data, 'export', extension);
    const blob = result instanceof Blob ? result : new Blob([result]);
    downloadBlob(
      blob,
      result instanceof File
        ? result.name
        : `export.${extension.toLowerCase()}`,
    );
  } catch (error) {
    showError(error);
  } finally {
    saving.close();
  }
});
