import sinon from 'sinon';
import nodeFetch from 'node-fetch';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import sinonStubPromise from 'sinon-stub-promise';
import { getAlbum, getAlbumTracks, getAlbums } from '../src/album';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = nodeFetch;

describe('Album', () => {

  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke Tests', () => {

    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });

  });

  describe('getAlbum', () => {

    it('should call fetch function', () => {
      const album = getAlbum('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch function with the correct url', () => {
      const album = getAlbum('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/Incubus');

      const album2 = getAlbum('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/Muse');
    })

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbum('Incubus');

      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });

  });

  describe('getAlbums', () => {

    it('should call fetch function', () => {
      const albums = getAlbums(['Incubus', 'Muse']);
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch function with the correct url', () => {
      const albums = getAlbums(['Incubus', 'Muse']);
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=Incubus,Muse');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves([{ album: 'Incubus' }, { album: 'Muse' }]);
      const albums = getAlbums(['Incubus', 'Muse']);

      expect(albums.resolveValue).to.be.eql([{ album: 'Incubus' }, { album: 'Muse' }]);
    });

  });

  describe('getAlbumTracks', () => {

    it('should call fetch function', () => {
      const tracks = getAlbumTracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch function with the correct url', () => {
      const tracks = getAlbumTracks('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/Incubus/tracks')

      const tracks2 = getAlbumTracks('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/Muse/tracks')
    });

    it('should return the correct data from Promise', () => {
      promise.resolves([{ track: '1' }, { track: '2' }]);
      const tracks = getAlbumTracks('Incubus');

      expect(tracks.resolveValue).to.be.eql([{ track: '1' }, { track: '2' }]);
    });

  });

});
