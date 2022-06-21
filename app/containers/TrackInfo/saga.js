import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongDetails } from '@app/services/itunesApi';
import { trackInfoTypes, trackInfoCreators } from './reducer';
// Individual exports for testing
const { REQUEST_GET_SONG_DETAILS } = trackInfoTypes;
const { successGetSongDetails, errorGetSongDetails } = trackInfoCreators;

export function* getTrackInfoFunction(action) {
  if (action.songDetails) {
    yield put(successGetSongDetails(action.songDetails));
  } else {
    if (action?.songId) {
      const response = yield call(getSongDetails, action.songId);
      const { ok, data } = response;
      if (ok) {
        const songDetails = data?.results && data.results[0];
        if (songDetails) {
          songDetails.releaseYear = new Date(songDetails.releaseDate).getFullYear().toString();
          songDetails.artworkUrl250 = songDetails.artworkUrl100.replace('100x100bb.jpg', '250x250bb.jpg');
        }
        yield put(successGetSongDetails(songDetails || {}));
      } else {
        yield put(errorGetSongDetails(data));
      }
    }
  }
}

export default function* trackInfoSaga() {
  yield takeLatest(REQUEST_GET_SONG_DETAILS, getTrackInfoFunction);
}
