import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the iTunesProvider state domain
 */

const selectITunesProviderDomain = (state) => state.iTunesProviderContainer || initialState;

const makeSelectITunesProvider = () => createSelector(selectITunesProviderDomain, (substate) => substate);

export default makeSelectITunesProvider;
export { selectITunesProviderDomain };

export const selectSongs = () => createSelector(selectITunesProviderDomain, (substate) => get(substate, 'songs'));

export const selectSongById = (songId) =>
  createSelector(selectSongs(), (songs) => {
    return songs.find((song) => song.trackId == songId);
  });

export const selectError = () => createSelector(selectITunesProviderDomain, (substate) => get(substate, 'error'));

export const selectSearchTerm = () =>
  createSelector(selectITunesProviderDomain, (substate) => get(substate, 'searchTerm'));
