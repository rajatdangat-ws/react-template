// import produce from 'immer'
import { iTunesProviderReducer, iTunesTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ITunesProvider reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(iTunesProviderReducer(undefined, {})).toEqual(state);
  });

  it('should ensure that the songs data is present when SUCCESS_GET_SONGS is dispatched', () => {
    const songs = {
      1: {
        trackName: 'test track 1',
        trackId: 1,
        coverImgUrl: 'image url 1',
        artistName: 'test artist 1',
        previewUrl: 'preview url 1',
        detailsUrl: 'details url 1'
      },
      2: {
        trackName: 'test track 2',
        trackId: 2,
        coverImgUrl: 'image url 2',
        artistName: 'test artist 2',
        previewUrl: 'preview url 2',
        detailsUrl: 'details url 2'
      }
    };
    const expectedResult = { ...state, songs };
    expect(
      iTunesProviderReducer(state, {
        type: iTunesTypes.SUCCESS_GET_SONGS,
        data: songs
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that error has some data when ERROR_GET_SONGS is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, error };
    expect(
      iTunesProviderReducer(state, {
        type: iTunesTypes.ERROR_GET_SONGS,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that state is cleared when CLEAR_SONGS action is dispatched', () => {
    const expectedResult = { ...initialState };
    expect(
      iTunesProviderReducer(state, {
        type: iTunesTypes.CLEAR_SONGS
      })
    ).toEqual(expectedResult);
  });
});
