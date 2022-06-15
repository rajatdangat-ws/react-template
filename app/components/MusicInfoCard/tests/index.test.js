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
  previewUrl: 'preview url',
  detailsUrl: 'details url'
};

jest.mock('react-router-dom');

describe('<MusicInfoCard />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<MusicInfoCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 MusicInfoCard component', () => {
    const { getAllByTestId } = renderWithIntl(<MusicInfoCard />);
    expect(getAllByTestId('music-info-card').length).toBe(1);
  });

  it('should display music title and artist', () => {
    const { getByText } = renderWithIntl(<MusicInfoCard {...props} />);
    expect(getByText('test track 1')).not.toBeNull();
  });

  it('should go to music info page when clicked on more button', async () => {
    const routerDom = require('react-router-dom');
    const pushSpy = jest.fn();
    // useHistory()
    const history = jest.spyOn(routerDom, 'useHistory').mockImplementation(() => {
      return {
        push: pushSpy
      };
    });

    const { getByRole } = renderWithIntl(<MusicInfoCard {...props} />);
    const button = getByRole('button', { name: 'MORE' });
    const user = userEvent.setup();
    expect(button).not.toBeNull();
    await user.click(button);

    expect(history).toBeCalled();
    expect(pushSpy).toBeCalledWith('details url');
  });
});
