import nodeFetch from 'node-fetch';
import SpotifyWrapper from '../src';

global.fetch = nodeFetch;
const spotify = new SpotifyWrapper({ token: 'foo' });
const albums = spotify.search.albums('Incubus');

albums
  .then(data => data.albums.items.map(item => console.log(item)))
  .catch(err => console.log(err));
