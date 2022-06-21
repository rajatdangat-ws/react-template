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

const songDetails = {
  trackName: 'test track 1',
  trackId: 1,
  coverImgUrl: 'image url 1',
  artistName: 'test artist 1',
  previewUrl: 'preview url 1',
  detailsUrl: 'details url 1',
  primaryGenreName: 'hard rock',
  releaseDate: '2006-11-07T12:00:00Z',
  releaseYear: '2006',
  trackViewUrl: 'track view url'
};

describe('<TrackInfo /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <TrackInfo dispatchGetSongDetails={() => {}} songInfo={songDetails} dispatchClearSongDetails={() => {}} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearSongDetails when the component unmounts', async () => {
    const dispatchClearSongDetails = jest.fn();
    const { unmount } = renderProvider(
      <TrackInfo
        dispatchGetSongDetails={() => {}}
        songInfo={songDetails}
        dispatchClearSongDetails={dispatchClearSongDetails}
      />
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
