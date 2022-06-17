// import produce from 'immer'
import { fromJS } from 'immutable';
import { iTunesProviderReducer, iTunesProviderTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ITunesProvider reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(iTunesProviderReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = fromJS(state.toJS()).set('somePayload', 'Mohammed Ali Chherawalla');
    expect(
      iTunesProviderReducer(state, {
        type: iTunesProviderTypes.DEFAULT_ACTION,
        somePayload: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
