/**
 *
 * MusicInfoCard
 *
 */

import React, { memo, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Meta } = Card;

const StyledMeta = styled(Meta)`
  & .ant-card-meta-description {
    white-space: nowrap;
    overflow-y: hidden;
    text-overflow: ellipsis;
  }
`;

function MusicInfoCard({ trackName, coverImgUrl, artistName, previewUrl, detailsUrl, onActionButtonClick }) {
  const history = useHistory();
  const audioRef = useRef();
  const isMountedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;

    audioRef.current.onended = () => {
      setIsPlaying(false);
    };
    audioRef.current.onpause = () => {
      if (isMountedRef.current) {
        setIsPlaying(false);
      }
    };
    audioRef.current.onplay = () => {
      setIsPlaying(true);
    };

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleMoreClick = () => {
    history.push(detailsUrl);
  };

  const handlePlayClick = () => {
    onActionButtonClick(audioRef.current);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  return (
    <>
      <Card
        data-testid="music-info-card"
        cover={<img src={coverImgUrl} alt={trackName} height="250px" width="250px" style={{ objectFit: 'cover' }} />}
        actions={[
          isPlaying ? (
            <PauseCircleOutlined data-testid="pause-button" key="pause" onClick={handlePlayClick} />
          ) : (
            <PlayCircleOutlined data-testid="play-button" key="play" onClick={handlePlayClick} />
          ),
          <InfoCircleOutlined data-testid="more-button" key="info" onClick={handleMoreClick} />
        ]}
      >
        <StyledMeta title={trackName} description={artistName} />
      </Card>
      <audio data-testid="audio-element" ref={audioRef} src={previewUrl} />
    </>
  );
}

MusicInfoCard.propTypes = {
  trackName: PropTypes.string,
  coverImgUrl: PropTypes.string,
  artistName: PropTypes.string,
  previewUrl: PropTypes.string,
  detailsUrl: PropTypes.string,
  onActionButtonClick: PropTypes.func
};

export default memo(MusicInfoCard);
