/**
 *
 * Tests for TrackInfo
 *
 *
 */

import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { TrackInfoTest as TrackInfo, mapDispatchToProps } from '../index';
import { trackInfoTypes } from '../reducer';

describe('<TrackInfo /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <TrackInfo dispatchGetSongDetails={() => {}} dispatchClearSongDetails={() => {}} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearSongDetails when the component unmounts', async () => {
    const dispatchClearSongDetails = jest.fn();
    const { unmount } = renderProvider(
      <TrackInfo dispatchGetSongDetails={() => {}} dispatchClearSongDetails={dispatchClearSongDetails} />
    );
    unmount();

    await timeout(500);
    expect(dispatchClearSongDetails).toHaveBeenCalled();
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatch = jest.fn();
    const songId = 1234567;
    const actions = {
      dispatchGetSongDetails: { songId, songDetails: undefined, type: trackInfoTypes.REQUEST_GET_SONG_DETAILS },
      dispatchClearSongDetails: { type: trackInfoTypes.CLEAR_SONG_DETAILS }
    };

    const props = mapDispatchToProps(dispatch);
    props.dispatchGetSongDetails(songId);
    expect(dispatch).toHaveBeenCalledWith(actions.dispatchGetSongDetails);

    await timeout(500);
    props.dispatchClearSongDetails();
    expect(dispatch).toHaveBeenCalledWith(actions.dispatchClearSongDetails);
  });
});
