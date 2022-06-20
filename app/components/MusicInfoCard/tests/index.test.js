/**
 *
 * Tests for MusicInfoCard
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event';
import { renderWithIntl, timeout } from '@utils/testUtils';
import MusicInfoCard from '../index';

const props = {
  trackName: 'test track',
  coverImgUrl: 'image url',
  artistName: 'test artist',
  previewUrl:
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/ed/c5/2c/edc52c92-d0bd-d9ea-e1b2-25b89c90e3ac/mzaf_2299253512947720106.plus.aac.p.m4a',
  detailsUrl: 'details url'
};

jest.mock('react-router-dom');

describe('<MusicInfoCard />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<MusicInfoCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 MusicInfoCard component', () => {
    const { getAllByTestId } = renderWithIntl(<MusicInfoCard {...props} />);
    expect(getAllByTestId('music-info-card').length).toBe(1);
  });

  it('should display music title and artist', () => {
    const { getByText } = renderWithIntl(<MusicInfoCard {...props} />);
    expect(getByText('test track')).not.toBeNull();
  });

  it('should go to music info page when clicked on more button', async () => {
    const routerDom = require('react-router-dom');
    const pushSpy = jest.fn();
    const history = jest.spyOn(routerDom, 'useHistory').mockImplementation(() => {
      return {
        push: pushSpy
      };
    });

    const { getByTestId } = renderWithIntl(<MusicInfoCard {...props} />);
    const button = getByTestId('more-button');
    const user = userEvent.setup();
    expect(button).not.toBeNull();
    await user.click(button);

    expect(history).toBeCalled();
    expect(pushSpy).toBeCalledWith('details url');
  });

  it('should contain audio tag with correct url', () => {
    const { getByTestId } = renderWithIntl(<MusicInfoCard {...props} />);

    const audioEl = getByTestId('audio-element');
    expect(audioEl).toHaveAttribute('src', props.previewUrl);
  });

  it('should play and pause music when clicked on play and pause buttons', async () => {
    const { getByTestId } = renderWithIntl(<MusicInfoCard {...props} onActionButtonClick={() => {}} />);
    const user = userEvent.setup();
    const audioElement = getByTestId('audio-element');
    await timeout(500);

    let playBtn = getByTestId('play-button');
    expect(playBtn).toBeInTheDocument();

    await user.click(playBtn);
    expect(playBtn).not.toBeInTheDocument();
    expect(audioElement.paused).toBe(false);

    await timeout(500);

    const pauseBtn = getByTestId('pause-button');
    expect(pauseBtn).toBeInTheDocument();

    await user.click(pauseBtn);
    expect(audioElement.paused).toBe(true);
    expect(pauseBtn).not.toBeInTheDocument();
    playBtn = getByTestId('play-button');
    expect(playBtn).toBeInTheDocument();
  });

  it('should update the UI when the music finishes playing', async () => {
    const { getByTestId } = renderWithIntl(<MusicInfoCard {...props} onActionButtonClick={() => {}} />);
    const user = userEvent.setup();

    let playBtn = getByTestId('play-button');
    const audioElement = getByTestId('audio-element');

    expect(playBtn).toBeInTheDocument();
    await user.click(playBtn);
    const pauseBtn = getByTestId('pause-button');
    expect(pauseBtn).toBeInTheDocument();
    await timeout(500);
    audioElement.emulateStop();
    playBtn = getByTestId('play-button');
    expect(playBtn).toBeInTheDocument();
  });
});
