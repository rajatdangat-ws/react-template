import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getSongs, getSongDetails } from '../itunesApi';

describe('ItunesApi tests', () => {
  const songId = 123456;
  const searchTerm = 'linkin';

  describe('getSongs', () => {
    it('should make an api call to "/search?term=&media=music', async () => {
      const mock = new MockAdapter(getApiClient('itunes').axiosInstance);
      const data = [
        {
          resultCount: 1,
          results: [{ searchTerm }]
        }
      ];
      mock
        .onGet(`/search`, {
          term: searchTerm,
          media: 'music'
        })
        .reply(200, data);
      const res = await getSongs(searchTerm);
      expect(res.data).toEqual(data);
    });
  });

  describe('get song details', () => {
    it('should make an api call to "/lookup?id="', async () => {
      const mock = new MockAdapter(getApiClient('itunes').axiosInstance);
      const data = [
        {
          resultCount: 1,
          results: { songId }
        }
      ];
      mock
        .onGet('/lookup', {
          id: songId
        })
        .reply(200, data);
      const res = await getSongDetails(songId);
      expect(res.data).toEqual(data);
    });
  });
});
