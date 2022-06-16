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
    const newResults = results.map((item) => {
      return {
        ...item,
        artworkUrl250: item.artworkUrl100.replace('100x100bb.jpg', '250x250bb.jpg')
      };
    });
    yield put(successGetSongs(newResults));
  } else {
    yield put(errorGetSongs(data));
  }
}

export default function* iTunesProviderSaga() {
  yield takeLatest(REQUEST_GET_SONGS, getSongsFunction);
}
