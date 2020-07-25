import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  togglePlay,
  setDuration,
  getCurrentTime,
  setJumpToTime,
} from '../actions/audioActions';
import '../styles/main.css';

const AudioPlayer = ({ dispatch, audioFile, playing, jumpTo }) => {
  const [audio, setAudio] = useState(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  useEffect(() => {
    if (!audioFile) return;
    const newAudio = new Audio(audioFile);
    setAudio(newAudio);
  }, [audioFile, dispatch]);

  const handlePlayPause = () => {
    dispatch(togglePlay());
  };

  const jumpForward10 = () => {
    if (!audio) return;
    dispatch(setJumpToTime(audio.currentTime + 10));
  };
  const jumpBack10 = () => {
    if (!audio) return;
    dispatch(setJumpToTime(audio.currentTime - 10));
  };

  const handlePlaybackRate = () => {
    let rate = playbackRate;
    let increase = 0.5;
    let limit = 2;
    if (rate + increase <= limit) {
      setPlaybackRate((currentRate) => {
        audio.playbackRate = currentRate + increase;
        return currentRate + increase;
      });
    } else {
      setPlaybackRate((_) => {
        audio.playbackRate = 1;
        return 1;
      });
    }
  };

  useEffect(() => {
    if (!audio) return;
    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [audio, playing]);

  useEffect(() => {
    if (!audio) return;
    const setAudioData = () => {
      dispatch(setDuration(audio.duration));
    };
    const setAudioTime = () => {
      dispatch(getCurrentTime(audio.currentTime));
    };
    const onAudioEnd = () => {
      // dispatch(getCurrentTime(0));
      dispatch(togglePlay());
    };
    // DOM listeners: update React state on DOM events
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', onAudioEnd);
    // effect cleanup
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', onAudioEnd);
    };
  }, [audio, dispatch]);

  useEffect(() => {
    if (!audio) return;
    if (jumpTo !== audio.currentTime) {
      audio.currentTime = jumpTo;
      dispatch(getCurrentTime(audio.currentTime));
    }
  }, [audio, jumpTo, dispatch]);

  return (
    <div className="w-full flex items-center space-x-3">
      <span
        className="material-icons text-gray-500 hover:text-blue-600 cursor-pointer"
        onClick={jumpBack10}
      >
        replay_10
      </span>
      <div
        className="bg-blue-600 rounded-full p-2 flex justify-center items-center cursor-pointer"
        onClick={handlePlayPause}
      >
        <span className="material-icons text-white">
          {playing ? 'pause' : 'play_arrow'}
        </span>
      </div>

      <span
        className="material-icons text-gray-500 hover:text-blue-600 cursor-pointer"
        onClick={jumpForward10}
      >
        forward_10
      </span>

      <div
        className="bg-white border border-gray-400 rounded-lg px-2 text-sm text-gray-900 cursor-pointer"
        onClick={handlePlaybackRate}
      >
        {playbackRate.toFixed(1)}x
      </div>
    </div>
  );
};

// Map Redux state to React component props
const mapStateToProps = (state) => ({
  audioFile: state.audio.audioFile,
  playing: state.audio.playing,
  jumpTo: state.audio.jumpTo,
});
// Connect Redux to React
export default connect(mapStateToProps)(AudioPlayer);
