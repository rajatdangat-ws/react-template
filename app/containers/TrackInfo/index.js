/**
 *
 * TrackInfo
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import saga from './saga';
import { selectSongs, selectSongById } from '../ITunesProvider/selectors';
import { selectSongInfo } from './selectors';
import { trackInfoCreators } from './reducer';

export function TrackInfo({ dispatchGetSongDetails, dispatchClearSongDetails, songs, songInfo, songDetails }) {
  const params = useParams();

  useEffect(() => {
    const songId = params.id;
    dispatchGetSongDetails(songId, songDetails);

    return () => {
      dispatchClearSongDetails();
    };
  }, []);

  return (
    <div>
      <Helmet>
        <title>TrackInfo</title>
        <meta name="description" content="Description of TrackInfo" />
      </Helmet>
      <pre>{JSON.stringify(songInfo, null, 2)}</pre>
    </div>
  );
}

TrackInfo.propTypes = {
  dispatchGetSongDetails: PropTypes.func,
  dispatchClearSongDetails: PropTypes.func,
  songs: PropTypes.array,
  songInfo: PropTypes.object,
  songDetails: PropTypes.object
};

const mapStateToProps = (state, props) => {
  return createStructuredSelector({
    songs: selectSongs(),
    songInfo: selectSongInfo(),
    songDetails: selectSongById(props.match.params.id)
  });
};

export function mapDispatchToProps(dispatch) {
  const { requestGetSongDetails, clearSongDetails } = trackInfoCreators;
  return {
    dispatchGetSongDetails: (trackId, songDetails) => dispatch(requestGetSongDetails(trackId, songDetails)),
    dispatchClearSongDetails: () => dispatch(clearSongDetails())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectSaga({ key: 'trackInfo', saga }))(TrackInfo);

export const TrackInfoTest = compose(injectIntl)(TrackInfo);
