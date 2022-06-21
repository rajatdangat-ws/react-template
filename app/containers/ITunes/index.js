/**
 *
 * ITunes
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { Input } from 'antd';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import saga from '../ITunesProvider/saga';
import { selectSongs, selectError } from '../ITunesProvider/selectors';
import { iTunesCreators } from '../ITunesProvider/reducer';
import MusicInfoCard from '@components/MusicInfoCard';

const { Search } = Input;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 36px 12px;
`;

const TracksListContainer = styled.div`
  padding: 12px;
`;

const SearchBox = styled(Search)`
  max-width: 500px;
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-column-gap: 12px;
  grid-row-gap: 24px;
  justify-items: center;
`;

export function ITunes({ dispatchRequestGetSongs, dispatchClearSongs, songs }) {
  const [searchValue, setSearchValue] = useState('');
  const [currentTrack, setCurrentTrack] = useState();

  const handleOnChange = debounce((search) => {
    if (!isEmpty(search)) {
      dispatchRequestGetSongs(search);
    } else {
      dispatchClearSongs();
    }
  });

  const onActionButtonClick = (audioTrack) => {
    if (audioTrack !== currentTrack) {
      if (currentTrack && !currentTrack.paused) {
        currentTrack.pause();
      }
      setCurrentTrack(audioTrack);
    }
  };

  return (
    <>
      <Helmet>
        <title>ITunes</title>
        <meta name="description" content="Description of ITunes" />
      </Helmet>
      <SearchContainer>
        <SearchBox
          defaultValue={searchValue}
          data-testid="search-field"
          type="text"
          placeholder="search for songs..."
          onChange={(evt) => setSearchValue(evt.target.value)}
          onSearch={(searchText) => {
            handleOnChange(searchText);
          }}
        />
      </SearchContainer>
      <TracksListContainer>
        <GridLayout>
          {songs &&
            Object.keys(songs).map((key) => {
              const song = songs[key];
              return (
                <MusicInfoCard
                  key={key}
                  trackName={song.trackName}
                  coverImgUrl={song.artworkUrl250}
                  artistName={song.artistName}
                  detailsUrl={`/tracks/${song.trackId}`}
                  previewUrl={song.previewUrl}
                  onActionButtonClick={onActionButtonClick}
                />
              );
            })}
        </GridLayout>
      </TracksListContainer>
    </>
  );
}

ITunes.propTypes = {
  dispatchRequestGetSongs: PropTypes.func,
  dispatchClearSongs: PropTypes.func,
  songs: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  songs: selectSongs(),
  error: selectError()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetSongs, clearSongs } = iTunesCreators;
  return {
    dispatchRequestGetSongs: (searchTerm) => dispatch(requestGetSongs(searchTerm)),
    dispatchClearSongs: () => dispatch(clearSongs())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectSaga({ key: 'iTunes', saga }))(ITunes);

export const ITunesTest = compose(injectIntl)(ITunes);
