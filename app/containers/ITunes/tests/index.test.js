/**
 *
 * Tests for ITunes
 *
 *
 */

import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event';
import { ITunesTest as ITunes, mapDispatchToProps } from '../index';
import { iTunesTypes } from '@app/containers/ITunesProvider/reducer';

const songs = [
  {
    trackName: 'test track 1',
    trackId: 1,
    coverImgUrl: 'image url 1',
    artistName: 'test artist 1',
    previewUrl: 'preview url 1',
    detailsUrl: 'details url 1'
  },
  {
    trackName: 'test track 2',
    trackId: 2,
    coverImgUrl: 'image url 2',
    artistName: 'test artist 2',
    previewUrl: 'preview url 2',
    detailsUrl: 'details url 2'
  }
];

describe('<ITunes /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ITunes songs={songs} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should have search field', () => {
    const { getByTestId } = renderProvider(
      <ITunes dispatchRequestGetSongs={() => {}} songs={songs} dispatchClearSongs={() => {}} />
    );
    const searchField = getByTestId('search-field');
    expect(searchField).toBeInTheDocument();
    expect(searchField).toHaveAttribute('type', 'text');
  });

  it('should dispatch get action on search', async () => {
    const getSongsSpy = jest.fn();
    const { getByRole, getByTestId } = renderProvider(
      <ITunes dispatchRequestGetSongs={getSongsSpy} songs={songs} dispatchClearSongs={() => {}} />
    );
    const user = userEvent.setup();
    const searchButton = getByRole('button', { name: 'search' });
    const searchField = getByTestId('search-field');
    user.type(searchField, 'test');

    expect(searchButton).not.toBeNull();
    await user.click(searchButton);

    expect(getSongsSpy).toBeCalled();
  });

  it('should dispatch clear action when search field is empty', async () => {
    const clearSongsSpy = jest.fn();
    const { getByRole } = renderProvider(
      <ITunes dispatchRequestGetSongs={() => {}} songs={songs} dispatchClearSongs={clearSongsSpy} />
    );
    const user = userEvent.setup();
    const searchButton = getByRole('button', { name: 'search' });

    await user.click(searchButton);
    expect(clearSongsSpy).toBeCalled();
  });

  it('should render the grid layout', () => {
    const { getAllByTestId } = renderProvider(
      <ITunes dispatchRequestGetSongs={() => {}} songs={songs} dispatchClearSongs={() => {}} />
    );
    expect(getAllByTestId('music-info-card').length).toEqual(songs.length);
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatch = jest.fn();
    const searchTerm = 'linkin park';
    const actions = {
      dispatchRequestGetSongs: { searchTerm, type: iTunesTypes.REQUEST_GET_SONGS },
      dispatchClearSongs: { type: iTunesTypes.CLEAR_SONGS }
    };

    const props = mapDispatchToProps(dispatch);
    props.dispatchRequestGetSongs(searchTerm);
    expect(dispatch).toHaveBeenCalledWith(actions.dispatchRequestGetSongs);

    await timeout(500);
    props.dispatchClearSongs();
    expect(dispatch).toHaveBeenCalledWith(actions.dispatchClearSongs);
  });

  it('should pause the previous playing music when playing new music', async () => {
    const { getAllByTestId } = renderProvider(<ITunes songs={songs} />);
    await timeout(500);
    // const audioElements = getAllByTestId('audio-element');
    // let firstAudioElement = audioElements[0];
    // let secondAudioElement = audioElements[1];
    const user = userEvent.setup();

    const playBtns = getAllByTestId('play-button');
    let firstPlayBtn = playBtns[0];
    let secondPlayBtn = playBtns[1];

    expect(firstPlayBtn).toBeInTheDocument();
    await user.click(firstPlayBtn);
    // expect(firstAudioElement.paused).toBe(false);
    const pauseBtn = getAllByTestId('pause-button')[0];
    expect(pauseBtn).toBeInTheDocument();

    await timeout(500);

    expect(secondPlayBtn).toBeInTheDocument();
    // expect(secondAudioElement.paused).toBe(true);
    await user.click(secondPlayBtn);
    // expect(firstAudioElement.paused).toBe(true);
    // expect(secondAudioElement.paused).toBe(false);

    expect(pauseBtn).not.toBeInTheDocument();
    firstPlayBtn = getAllByTestId('play-button')[0];
    expect(firstPlayBtn).toBeInTheDocument();
    expect(secondPlayBtn).not.toBeInTheDocument();
  });
});
