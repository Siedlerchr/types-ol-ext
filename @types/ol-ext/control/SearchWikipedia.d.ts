import type { Options as SearchJSONOptions } from './SearchJSON'
import SearchJSON from './SearchJSON'

export interface WikipediaResult {
  title: string;
  desc: string;
  uri: string;
}

export type WikipediaResponse = [string, string[], string[], string[]]

export interface WikipediaSelection {
  title: string;
  desc: string;
  url: string;
  img?: string;
  pageid: number;
  lon?: number;
  lat?: number;
}

export interface Options extends SearchJSONOptions<WikipediaResult, WikipediaResponse, string | HTMLElement> {
  className?: string;
  label?: string;
  placeholder?: string;
  typing?: number;
  minLength?: number;
  maxItems?: number;
  lang?: string;
}

/**
 * Search places using the MediaWiki API.
 * @see https://www.mediawiki.org/wiki/API:Main_page
 *
 * @constructor
 * @extends {contrSearchJSON}
 * @fires select

 */
export default class SearchWikipedia extends SearchJSON<WikipediaResult, WikipediaResponse, string | HTMLElement, WikipediaSelection> {
  /**
   * @param {Object=} Control options.
   *  @param {string} options.className control class name
   *  @param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
   *  @param {string | undefined} options.label Text label to use for the search button, default "search"
   *  @param {string | undefined} options.placeholder placeholder, default "Search..."
   *  @param {number | undefined} options.typing a delay on each typing to start searching (ms), default 1000.
   *  @param {number | undefined} options.minLength minimum length to start searching, default 3
   *  @param {number | undefined} options.maxItems maximum number of items to display in the autocomplete list, default 10
   *  @param {function | undefined} options.handleResponse Handle server response to pass the features array to the list
   *
   *  @param {string|undefined} options.lang API language, default none
   */
  constructor(options?: Options);

  setLang(lang: string): void;
  getTitle(result: WikipediaResult): HTMLElement;
  requestData(search: string): { action: string; search: string; lang: string; format: string; origin: string; limit: number };
  handleResponse(response: WikipediaResponse): WikipediaResult[];

  /** Set the current language as an ISO language code. */
  setLang(lang: string): void;
}
