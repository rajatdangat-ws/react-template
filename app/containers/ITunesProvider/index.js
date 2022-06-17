/**
 *
 * ITunesProvider
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import makeSelectITunesProvider from './selectors';
import saga from './saga';

export function ITunesProvider() {
  useInjectSaga({ key: 'iTunesProvider', saga });

  return (
    <div>
      <T id={'ITunesProvider'} />
    </div>
  );
}

ITunesProvider.propTypes = {};

const mapStateToProps = createStructuredSelector({
  iTunesProvider: makeSelectITunesProvider()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ITunesProvider);

export const ITunesProviderTest = compose(injectIntl)(ITunesProvider);
