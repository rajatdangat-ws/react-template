import { fromJS } from 'immutable';
import { selectITunesProviderDomain } from '../selectors';

describe('ITunesProvider selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      iTunesProvider: fromJS({})
    };
  });

  it('should select the user state', () => {
    expect(selectITunesProviderDomain(mockedState)).toEqual(mockedState.iTunesProvider.toJS());
  });
});
