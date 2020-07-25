import React from 'react';
import { connect } from 'react-redux';
import '../styles/main.css';

const AudioProgress = ({ currentTime, duration }) => {
  return (
    <div className="w-full flex justify-start items-center px-4 h-20 bg-gray-100">
      <div className="bg-gray-200 px-2 py-1 rounded text-sm">
        <span className="text-gray-900">{currentTime.toFixed(1)}</span> /
        <span className="text-gray-600"> {duration.toFixed(1)} </span>
      </div>
    </div>
  );
};

// Map Redux state to React component props
const mapStateToProps = (state) => ({
  duration: state.audio.duration,
  currentTime: state.audio.currentTime,
});
// Connect Redux to React
export default connect(mapStateToProps)(AudioProgress);
