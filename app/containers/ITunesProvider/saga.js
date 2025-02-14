import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs } from '@app/services/itunesApi';
import { iTunesTypes, iTunesCreators } from './reducer';

const { REQUEST_GET_SONGS } = iTunesTypes;
const { successGetSongs, errorGetSongs } = iTunesCreators;

export function* getSongsFunction(action) {
  const response = yield call(getSongs, action.searchTerm);
  const { data, ok } = response;
  if (ok) {
    const results = data?.results || [];
    const songs = {};
    results.forEach((item) => {
      songs[item.trackId] = {
        ...item,
        releaseYear: new Date(item.releaseDate).getFullYear().toString(),
        artworkUrl250: item.artworkUrl100.replace('100x100bb.jpg', '250x250bb.jpg')
      };
    });
    yield put(successGetSongs(songs));
  } else {
    yield put(errorGetSongs(data));
  }
}

export default function* iTunesProviderSaga() {
  yield takeLatest(REQUEST_GET_SONGS, getSongsFunction);
}
