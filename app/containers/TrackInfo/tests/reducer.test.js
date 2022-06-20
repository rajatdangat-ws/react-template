// import produce from 'immer'
import { trackInfoReducer, trackInfoTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('TrackInfo reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(trackInfoReducer(undefined, {})).toEqual(state);
  });

  it('should ensure that song details is present when SUCCESS_GET_SONG_DETAILS is dispatched', () => {
    const songDetails = {
      trackName: 'test track 1',
      trackId: 1,
      coverImgUrl: 'image url 1',
      artistName: 'test artist 1',
      previewUrl: 'preview url 1',
      detailsUrl: 'details url 1'
    };
    const expectedResult = { ...state, songDetails };
    expect(
      trackInfoReducer(state, {
        type: trackInfoTypes.SUCCESS_GET_SONG_DETAILS,
        data: songDetails
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that error has some data when ERROR_GET_SONG_DETAILS is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, error };
    expect(
      trackInfoReducer(state, {
        type: trackInfoTypes.ERROR_GET_SONG_DETAILS,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that state is reset when the CLEAR_SONG_DETAILS is dispatched', () => {
    const expectedResult = { ...initialState };
    expect(
      trackInfoReducer(state, {
        type: trackInfoTypes.CLEAR_SONG_DETAILS
      })
    ).toEqual(expectedResult);
  });
});
