/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import homeContainerReducer from 'containers/HomeContainer/reducer';
import iTunesProviderReducer from './containers/ITunesProvider/reducer';
import trackInfoReducer from './containers/TrackInfo/reducer';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducer = {}) {
  const rootReducer = combineReducers({
    ...injectedReducer,
    language: languageProviderReducer,
    homeContainer: homeContainerReducer,
    iTunesProviderContainer: iTunesProviderReducer,
    trackInfoContainer: trackInfoReducer
  });

  return rootReducer;
}
