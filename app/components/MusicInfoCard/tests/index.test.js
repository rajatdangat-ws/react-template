/**
 *
 * Tests for MusicInfoCard
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event';
import { renderWithIntl } from '@utils/testUtils';
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

  it('should play music when clicked on play', async () => {
    const play = jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {});

    const { getByTestId } = renderWithIntl(<MusicInfoCard {...props} onActionButtonClick={() => {}} />);
    const user = userEvent.setup();

    const playBtn = getByTestId('play-button');
    expect(playBtn).toBeInTheDocument();

    await user.click(playBtn);
    expect(play).toHaveBeenCalled();
  });
});
