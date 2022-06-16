/**
 *
 * Tests for ITunesProvider
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { ITunesProviderTest as ITunesProvider } from '../index';

describe('<ITunesProvider /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ITunesProvider />);
    expect(baseElement).toMatchSnapshot();
  });
});
