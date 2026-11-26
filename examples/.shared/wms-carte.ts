import TileLayer from 'ol/layer/Tile';
import type Map from 'ol/Map';
import { toLonLat } from 'ol/proj';
import TileWMS from 'ol/source/TileWMS';
import { downloadBlob } from './download';

export function exportWmsCarte(map: Map): void {
  const view = map.getView();
  const center = view.getCenter();
  if (!center) return;
  const [lon, lat] = toLonLat(center, view.getProjection());
  const layers = map
    .getLayers()
    .getArray()
    .flatMap((layer) => {
      if (!(layer instanceof TileLayer)) return [];
      const source = layer.getSource();
      if (!(source instanceof TileWMS)) return [];
      const title = layer.get('title');
      const url = source.getUrls()?.[0];
      if (!url) return [];
      const params = source.getParams();
      const attribution = layer.get('attribution') || '&copy;';
      return [
        {
          wms: true,
          type: 'WMS',
          name: title,
          titre: title,
          visibility: layer.getVisible(),
          opacity: layer.getOpacity(),
          copyright: attribution,
          wmsparam: {
            layer: {
              title,
              extent: layer.getExtent(),
              minResolution: layer.getMinResolution(),
              maxResolution: layer.getMaxResolution(),
            },
            source: {
              url,
              projection:
                source.getProjection()?.getCode() ??
                view.getProjection().getCode(),
              crossOrigin: 'anonymous',
              params: {
                LAYERS: params.LAYERS,
                FORMAT: params.FORMAT,
                VERSION: params.VERSION,
                ...(params.MAP ? { MAP: params.MAP } : {}),
              },
            },
            attribution: { html: attribution },
            originator: [],
            legend: [],
          },
          maxZoomCluster: 20,
          radiusCluster: 40,
        },
      ];
    });
  const carte = {
    param: {
      lon,
      lat,
      rot: 0,
      zoom: view.getZoom(),
      titre: 'WMS',
      description: '',
    },
    layers,
  };
  downloadBlob(
    new Blob([JSON.stringify(carte, null, ' ')], {
      type: 'text/plain;charset=utf-8',
    }),
    'carte.carte',
  );
}
