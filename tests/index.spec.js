import sinon from 'sinon';
import nodeFetch from 'node-fetch';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import sinonStubPromise from 'sinon-stub-promise';
import SpotifyWrapper from '../src/index';
import { API_URL, getHeader } from '../src/config';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = nodeFetch;

describe('SpotifyWrapper Library', () => {

  it('should create an instance of SpotifyWrapper', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceof(SpotifyWrapper);
  });

  it('should receive apiUrl as an option', () => {
    let spotify = new SpotifyWrapper({ apiURL: 'blabla' });
    expect(spotify.apiURL).to.be.equal('blabla');
  });

  it('should use the default apiURL if not provided', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.an.equal(API_URL);
  });

  it('should receive token as an option', () => {
    let spotify = new SpotifyWrapper({ token: 'foo' });
    expect(spotify.token).to.be.equal('foo');
  });

  describe('Request Method', () => {

    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should have request method', () => {
      let spotify = new SpotifyWrapper({});
      expect(spotify.request).to.exist;
    });

    it('should call fetch when request', () => {
      let spotify = new SpotifyWrapper({ token: 'foo' });
      spotify.request('url');

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call request method with right url passed', () => {
      let spotify = new SpotifyWrapper({ token: 'foo' });
      spotify.request('url');

      expect(fetchedStub).to.have.been.calledWith('url');
    });

    it('should call request method with right headers passed', () => {
      let spotify = new SpotifyWrapper({ token: 'foo' });
      spotify.request('url');

      expect(fetchedStub).to.have.been.calledWith('url', getHeader('foo'));
    });
  });

});
