import { API_URL, getHeader } from './config';
import toJSON from './utils';
import search from './search';
import album from './album';

export default class SpotifyWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token;
    this.album = album.bind(this)();
    this.search = search.bind(this)();
    this.headers = getHeader(this.token);
  }

  request(url) {
    return fetch(url, this.headers).then(toJSON);
  }
}
