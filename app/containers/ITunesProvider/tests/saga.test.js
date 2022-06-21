/**
 * Test iTunesProvider sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs } from '@app/services/itunesApi';
import { apiResponseGenerator } from '@app/utils/testUtils';
import iTunesProviderSaga, { getSongsFunction } from '../saga';
import { iTunesTypes } from '../reducer';

describe('ITunesProvider saga tests', () => {
  const generator = iTunesProviderSaga();
  const searchTerm = 'linkin park';
  let getSongsGenerator = getSongsFunction({ searchTerm });

  it('should start task to watch for REQUEST_GET_SONGS action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesTypes.REQUEST_GET_SONGS, getSongsFunction));
  });

  it('should ensure that ERROR_GET_SONGS is dispatched when the api call fails', () => {
    expect(getSongsGenerator.next().value).toEqual(call(getSongs, searchTerm));
    const errorResponse = {
      errorMessage: 'There was an error fetching the songs'
    };
    expect(getSongsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: iTunesTypes.ERROR_GET_SONGS,
        error: errorResponse
      })
    );
  });

  it('should ensure that SUCCESS_GET_SONGS is dispatched when the api call succeeds', () => {
    getSongsGenerator = getSongsFunction({ searchTerm });
    expect(getSongsGenerator.next().value).toEqual(call(getSongs, searchTerm));
    const songsResponse = {
      resultCount: 1,
      results: [
        {
          trackName: 'test track 1',
          trackId: 1,
          coverImgUrl: 'image url 1',
          artistName: 'test artist 1',
          previewUrl: 'preview url 1',
          detailsUrl: 'details url 1',
          artworkUrl100: '100x100bb.jpg'
        }
      ]
    };
    const songsData = {
      ...songsResponse,
      results: { [songsResponse.results[0].trackId]: { ...songsResponse.results[0], artworkUrl250: '250x250bb.jpg' } }
    };
    expect(getSongsGenerator.next(apiResponseGenerator(true, songsResponse)).value).toEqual(
      put({
        type: iTunesTypes.SUCCESS_GET_SONGS,
        data: songsData.results
      })
    );
  });
});
