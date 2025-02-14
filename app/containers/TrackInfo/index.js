/**
 *
 * TrackInfo
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import saga from './saga';
import { selectSongById } from '../ITunesProvider/selectors';
import { selectSongInfo } from './selectors';
import { trackInfoCreators } from './reducer';
import colors from '@app/themes/colors';
import fonts from '@app/themes/fonts';
import { T } from '@components/T';

const TrackInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  text-align: center;
`;

const Artwork = styled.img`
  border-radius: 8px;
`;

const TrackTitle = styled.h2`
  font-size: 26px;
  font-size: ${fonts.dynamicFontSize(fonts.size.big, 1, 0.5)};
  font-weight: bold;
  margin: 0;
  margin-top: 12px;
`;

const TrackArtist = styled.a`
  text-decoration: none;
  text-transform: uppercase;
  font-size: ${fonts.dynamicFontSize(fonts.size.regular, 1, 0.5)};
  font-weight: 300;
  color: ${colors.secondary};
  margin: 0;

  &:hover {
    text-decoration: underline;
    color: ${colors.secondary};
  }
`;

const ButtonsContainer = styled.div`
  margin-top: 18px;

  & > .ant-btn {
    display: inline-flex;
    align-items: center;
  }
`;

const GenreName = styled.p`
  text-transform: uppercase;
  font-size: ${fonts.dynamicFontSize(fonts.size.small, 1, 0.5)};
`;

const ButtonText = styled(T)`
  margin-left: 4px;
`;

export function TrackInfo({ dispatchGetSongDetails, dispatchClearSongDetails, songInfo, songDetails }) {
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
      <TrackInfoContainer>
        <Artwork src={songInfo?.artworkUrl250} width="250px" height="250px" alt={songInfo?.trackName} />
        <TrackTitle>{songInfo?.trackName || 'NA'}</TrackTitle>
        <TrackArtist href={songInfo?.artistViewUrl || 'NA'} target="__blank" rel="noreferrer noopener">
          {songInfo?.artistName || 'NA'}
        </TrackArtist>
        <GenreName>
          {songInfo?.primaryGenreName || 'NA'} · {songInfo?.releaseYear || 'NA'}
        </GenreName>
        <ButtonsContainer>
          <Button
            type="primary"
            shape="round"
            href={songInfo?.trackViewUrl}
            target="__blank"
            rel="noreferrer noopener"
            size="medium"
            icon={<CaretRightOutlined />}
          >
            <ButtonText id="play" />
          </Button>
        </ButtonsContainer>
      </TrackInfoContainer>
    </div>
  );
}

TrackInfo.propTypes = {
  dispatchGetSongDetails: PropTypes.func,
  dispatchClearSongDetails: PropTypes.func,
  songInfo: PropTypes.object,
  songDetails: PropTypes.object
};

const mapStateToProps = (state, props) => {
  return createStructuredSelector({
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
