import React from 'react';
import { connect } from 'react-redux';
import AudioWave from './AudioWave';
import { setJumpToTime } from '../actions/audioActions';

import '../styles/main.css';

const Waves = ({ dispatch, word_timings, currentTime }) => {
  const handleJumpTo = (time) => {
    dispatch(setJumpToTime(time));
  };
  let duration =
    parseFloat(word_timings.slice(-1)[0].slice(-1)[0].endTime) -
    parseFloat(word_timings[0].find((_) => _.word).startTime);
  return (
    <div className="w-full flex flex-col h-24 justify-center pl-4 bg-gray-100">
      {word_timings.map((item, index) => {
        let percentage =
          ((parseFloat(item.slice(-1)[0].endTime) -
            parseFloat(item.find((_) => _.word).startTime)) /
            duration) *
          100;
        return (
          <AudioWave
            key={index}
            word_timing_item={item}
            curTime={currentTime}
            jumpTo={handleJumpTo}
            index={index}
            percentage={percentage.toFixed(2)}
          />
        );
      })}
    </div>
  );
};

// Map Redux state to React component props
const mapStateToProps = (state) => ({
  word_timings: state.audio.word_timings,
  currentTime: state.audio.currentTime,
});
// Connect Redux to React
export default connect(mapStateToProps)(Waves);
