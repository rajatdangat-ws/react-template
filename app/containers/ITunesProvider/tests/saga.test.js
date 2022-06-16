/**
 * Test iTunesProvider sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import iTunesProviderSaga, { defaultFunction } from '../saga';
import { iTunesProviderTypes } from '../reducer';

describe('ITunesProvider saga tests', () => {
  const generator = iTunesProviderSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesProviderTypes.DEFAULT_ACTION, defaultFunction));
  });
});
