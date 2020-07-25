import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setJumpToTime, setSearchTerm } from '../actions/audioActions';
import '../styles/main.css';

const Search = ({ dispatch }) => {
  const [searchText, setSearchText] = useState('');
  const handleSearchText = (e) => {
    let newVal = e.target.value;
    setSearchText((_) => {
      dispatch(setSearchTerm(newVal));
      return newVal;
    });
  };
  return (
    <div className="w-1/3 mt-10 ml-4">
      <label
        htmlFor="search"
        className="block text-sm font-medium leading-5 text-gray-700"
      ></label>
      <div className="mt-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="material-icons">search</span>
        </div>
        <input
          id="search"
          className="block w-full pl-10  py-1 outline-none rounded-md border border-gray-400"
          placeholder="Search call transcript"
          value={searchText}
          onChange={handleSearchText}
        />
      </div>
    </div>
  );
};

const Transcript = ({ wt, index, curTime, dispatch, searchText }) => {
  let ml = index % 2 === 0 ? 'ml-1' : 'ml-8';
  let startTime = wt.find((i) => i.word !== '').startTime;
  let endTime = wt[wt.length - 1].endTime;
  const [showShare, setShowShare] = useState(false);
  if (
    searchText &&
    wt.findIndex((_) =>
      _.word.toLowerCase().includes(searchText.toLowerCase())
    ) === -1
  ) {
    return null;
  }
  return (
    <div
      key={index}
      className={`w-3/4 flex mb-8 ${ml}`}
      onMouseEnter={() => setShowShare(true)}
      onMouseLeave={() => setShowShare(false)}
    >
      <div
        className={`w-1/12 ${
          index % 2 === 0 ? 'text-indigo-500' : 'text-blue-500'
        }`}
      >
        {startTime}
      </div>
      <div
        className={`w-11/12 border-l-2 ${
          index % 2 === 0 ? 'border-indigo-200' : 'border-blue-200'
        } pl-4 ${
          curTime >= parseFloat(startTime) && curTime <= parseFloat(endTime)
            ? 'bg-gray-200'
            : 'bg-white'
        }`}
      >
        {wt.map((item, itemIndex) => {
          if (!item.word) return null;
          return (
            <span
              className={`transition-colors duration-200 ease-out ${
                curTime >= parseFloat(item.startTime) &&
                curTime <= parseFloat(item.endTime)
                  ? 'bg-blue-400'
                  : ''
              } cursor-pointer focus:bg-blue-300 hover:bg-blue-300 text-gray-800 ${
                searchText &&
                item.word.toLowerCase().includes(searchText.toLowerCase())
                  ? 'bg-yellow-400'
                  : ''
              }`}
              key={itemIndex}
              onClick={() =>
                dispatch(setJumpToTime(parseFloat(item.startTime)))
              }
            >
              {item.word}{' '}
            </span>
          );
        })}

        {showShare && (
          <div className="mt-2 text-blue-600 text-sm font-semibold cursor-pointer">
            Share
          </div>
        )}
        {!showShare && (
          <div className="mt-2 text-blue-600 text-sm font-semibold cursor-pointer">
            &nbsp;
          </div>
        )}
      </div>
    </div>
  );
};

const TranscriptSection = ({ dispatch, word_timings, curTime, searchText }) => {
  return (
    <div className="w-full flex flex-col">
      <Search dispatch={dispatch} />
      <div className="mt-20 ml-8">
        {word_timings.map((wt, index) => {
          return (
            <Transcript
              wt={wt}
              key={index}
              index={index}
              curTime={curTime}
              dispatch={dispatch}
              searchText={searchText}
            />
          );
        })}
      </div>
    </div>
  );
};

// Map Redux state to React component props
const mapStateToProps = (state) => ({
  word_timings: state.audio.word_timings,
  curTime: state.audio.currentTime,
  searchText: state.audio.searchText,
});
// Connect Redux to React
export default connect(mapStateToProps)(TranscriptSection);
