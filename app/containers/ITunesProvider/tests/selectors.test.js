import selectITunesProvider, {
  selectITunesProviderDomain,
  selectSongs,
  selectSongById,
  selectError
} from '../selectors';
import { initialState } from '../reducer';

describe('ITunesProvider selector tests', () => {
  let mockedState;
  let songs;
  let error;

  beforeEach(() => {
    songs = {
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
    error = 'There was an error while fetching the songs';

    mockedState = {
      iTunesProviderContainer: {
        songs,
        error
      }
    };
  });

  it('should select the user state', () => {
    expect(selectITunesProviderDomain(mockedState)).toEqual(mockedState.iTunesProviderContainer);
  });

  it('should select the itunes provider state', () => {
    const iTunesProviderSelector = selectITunesProvider();
    expect(iTunesProviderSelector(mockedState)).toEqual(mockedState.iTunesProviderContainer);
  });

  it('should select songs', () => {
    const songsSelector = selectSongs();
    expect(songsSelector(mockedState)).toEqual(songs);
  });

  it('should select songs error', () => {
    const songsErrorSelector = selectError();
    expect(songsErrorSelector(mockedState)).toEqual(error);
  });

  it('should select song by id', () => {
    const songByIdSelector = selectSongById(2);
    expect(songByIdSelector(mockedState)).toEqual(songs[2]);
  });

  it('should select global state', () => {
    const selector = selectITunesProviderDomain(initialState);
    expect(selector).toEqual(initialState);
  });
});
