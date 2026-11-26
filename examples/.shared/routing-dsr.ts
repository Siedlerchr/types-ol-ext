import BaseEvent from 'ol/events/Event';

import type Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import RoutingGeoportail from 'ol-ext/control/RoutingGeoportail';
import type { Options } from 'ol-ext/control/RoutingGeoportail';
import type { Feature as GeoJSONFeature } from 'geojson';

type DsrResponse =
  | { status: 'ERROR'; message: string }
  | { status?: string; features: GeoJSONFeature[] };

export default class RoutingDsr extends RoutingGeoportail {
  // Used by the release's listRouting implementation and subclasses.
  declare resultElement: HTMLElement;
  declare path: Feature;

  constructor(options: Options) {
    super(options);
    this.set('url', 'https://api-dscr.ign.fr/api/v1/route');
  }

  handleResponse(data: DsrResponse): Feature | undefined {
    if (!('features' in data)) {
      this.dispatchEvent(new BaseEvent('error'));
      return undefined;
    }
    const map = this.getMap();
    if (!map) return undefined;
    const [feature] = new GeoJSON<Feature>().readFeatures(data.features[0], {
      featureProjection: map.getView().getProjection(),
    });
    if (!feature) return undefined;
    this.path = feature;
    this.dispatchEvent(
      Object.assign(new BaseEvent('routing'), { feature, features: [feature] }),
    );
    return feature;
  }

  listRouting(feature: Feature): void {
    const summary = document.createElement('i');
    summary.textContent = `${feature.get('distance')} (${feature.get('duration')})`;
    const list = document.createElement('ul');
    const routes: {
      numero: string;
      nom_gestionnaire: string;
      longueur: number;
    }[] = feature.get('routes') ?? [];
    for (const route of routes) {
      const row = document.createElement('li');
      const distance =
        route.longueur >= 1000
          ? `${(route.longueur / 1000).toFixed(2)} km`
          : `${route.longueur} m`;
      row.textContent = `${route.numero} ${route.nom_gestionnaire} ${distance}`;
      list.append(row);
    }
    this.resultElement.replaceChildren(summary, list);
  }
}
