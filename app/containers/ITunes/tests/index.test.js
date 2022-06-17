/**
 *
 * Tests for ITunes
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event';
import { ITunesTest as ITunes } from '../index';

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
    const { baseElement } = renderProvider(<ITunes />);
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
    expect(getAllByTestId('card-element').length).toEqual(songs.length);
  });
});
