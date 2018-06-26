import sinon from 'sinon';
import nodeFetch from 'node-fetch';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import sinonStubPromise from 'sinon-stub-promise';
import SpotifyWrapper from '../src';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = nodeFetch;

describe('Album', () => {

  let spotify
  let fetchedStub;
  let promise;

  beforeEach(() => {
    spotify = new SpotifyWrapper({ token: 'foo' });
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke Tests', () => {

    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(spotify.album.getTracks).to.exist;
    });

  });

  describe('getAlbum', () => {

    it('should call fetch function', () => {
      const album = spotify.album.getAlbum('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch function with the correct url', () => {
      const album = spotify.album.getAlbum('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/Incubus');

      const album2 = spotify.album.getAlbum('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/Muse');
    })

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = spotify.album.getAlbum('Incubus');

      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });

  });

  describe('getAlbums', () => {

    it('should call fetch function', () => {
      const albums = spotify.album.getAlbums(['Incubus', 'Muse']);
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch function with the correct url', () => {
      const albums = spotify.album.getAlbums(['Incubus', 'Muse']);
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=Incubus,Muse');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves([{ album: 'Incubus' }, { album: 'Muse' }]);
      const albums = spotify.album.getAlbums(['Incubus', 'Muse']);

      expect(albums.resolveValue).to.be.eql([{ album: 'Incubus' }, { album: 'Muse' }]);
    });

  });

  describe('getAlbumTracks', () => {

    it('should call fetch function', () => {
      const tracks = spotify.album.getTracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch function with the correct url', () => {
      const tracks = spotify.album.getTracks('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/Incubus/tracks');

      const tracks2 = spotify.album.getTracks('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/Muse/tracks');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves([{ track: '1' }, { track: '2' }]);
      const tracks = spotify.album.getTracks('Incubus');

      expect(tracks.resolveValue).to.be.eql([{ track: '1' }, { track: '2' }]);
    });

  });

});
