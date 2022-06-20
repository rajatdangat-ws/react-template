import selectTrackInfo, { selectTrackInfoDomain, selectSongInfo, selectSongInfoError } from '../selectors';
import { initialState } from '../reducer';

describe('TrackInfo selector tests', () => {
  let mockedState;
  let songDetails;
  let error;

  beforeEach(() => {
    songDetails = {
      trackName: 'test track 1',
      trackId: 1,
      coverImgUrl: 'image url 1',
      artistName: 'test artist 1',
      previewUrl: 'preview url 1',
      detailsUrl: 'details url 1'
    };
    error = 'There was some error while fetching the song details.';
    mockedState = {
      trackInfoContainer: {
        songDetails,
        error
      }
    };
  });

  it('should select the user state', () => {
    expect(selectTrackInfoDomain(mockedState)).toEqual(mockedState.trackInfoContainer);
  });

  it('should select track info state', () => {
    const trackInfoSelector = selectTrackInfo();
    expect(trackInfoSelector(mockedState)).toEqual(mockedState.trackInfoContainer);
  });

  it('should select song details', () => {
    const songDetailsSelector = selectSongInfo();
    expect(songDetailsSelector(mockedState)).toEqual(songDetails);
  });

  it('should select song details error', () => {
    const songDetailsErrorSelector = selectSongInfoError();
    expect(songDetailsErrorSelector(mockedState)).toEqual(error);
  });

  it('should select global state', () => {
    const selector = selectTrackInfoDomain(initialState);
    expect(selector).toEqual(initialState);
  });
});
