import nodeFetch from 'node-fetch';
import { searchAlbums } from '../src/album';

global.fetch = nodeFetch;

const albums = searchAlbums('Incubus');

albums
  .then(data => data.albums.items.map(item => console.log(item)))
  .catch(err => console.log(err));
