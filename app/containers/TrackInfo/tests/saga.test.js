/**
 * Test trackInfo sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongDetails } from '@services/itunesApi';
import trackInfoSaga, { getTrackInfoFunction } from '../saga';
import { trackInfoTypes } from '../reducer';
import { apiResponseGenerator } from '@utils/testUtils';

describe('TrackInfo saga tests', () => {
  const generator = trackInfoSaga();
  const songId = 123456;
  const songDetails = {
    trackName: 'test track 1',
    trackId: 1,
    coverImgUrl: 'image url 1',
    artistName: 'test artist 1',
    previewUrl: 'preview url 1',
    detailsUrl: 'details url 1'
  };
  let getSongDetailsGenerator = getTrackInfoFunction({ songId });

  it('should start task to watch for REQUEST_GET_SONG_DETAILS action', () => {
    expect(generator.next().value).toEqual(takeLatest(trackInfoTypes.REQUEST_GET_SONG_DETAILS, getTrackInfoFunction));
  });

  it('should ensure that the action ERROR_GET_SONG_DETAILS is dispatched when the api call fails', () => {
    // getSongDetailsGenerator = getTrackInfoFunction({ songId });
    const res = getSongDetailsGenerator.next().value;
    expect(res).toEqual(call(getSongDetails, songId));
    const errorResponse = {
      errorMessage: 'There was an error while fetching song details'
    };
    expect(getSongDetailsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: trackInfoTypes.ERROR_GET_SONG_DETAILS,
        error: errorResponse
      })
    );
  });

  it('should ensure that action SUCCESS_GET_SONG_DETAILS is dispatched and no api call is made when songDetails is received as arguement', () => {
    getSongDetailsGenerator = getTrackInfoFunction({ songId, songDetails });
    const res = getSongDetailsGenerator.next().value;
    expect(res).toEqual(
      put({
        type: trackInfoTypes.SUCCESS_GET_SONG_DETAILS,
        data: songDetails
      })
    );
  });

  it('should ensure that action SUCCESS_GET_SONG_DETAILS is dispatched when the api call succeeds', () => {
    getSongDetailsGenerator = getTrackInfoFunction({ songId });
    const res = getSongDetailsGenerator.next().value;
    expect(res).toEqual(call(getSongDetails, songId));
    const songDetailsResponse = {
      totalCount: 1,
      results: [{ ...songDetails }]
    };
    expect(getSongDetailsGenerator.next(apiResponseGenerator(true, songDetailsResponse)).value).toEqual(
      put({
        type: trackInfoTypes.SUCCESS_GET_SONG_DETAILS,
        data: songDetailsResponse.results[0]
      })
    );
  });
});
