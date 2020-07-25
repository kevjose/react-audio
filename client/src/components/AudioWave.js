import React from 'react';
import '../styles/main.css';

const AudioWave = ({
  word_timing_item,
  curTime,
  index,
  jumpTo,
  percentage,
}) => {
  let bgColor = index ? 'bg-blue-500' : 'bg-indigo-700';
  let textColor = index ? 'text-blue-500' : 'text-indigo-700';
  let speaker = index ? 'Prospect' : 'You';
  let border = !index ? 'border-b border-gray-500' : '';
  return (
    <div className="flex">
      <div
        className={`pl-2 py-2 ${textColor} font-semibold w-1/12 text-sm ${border} h-12`}
      >
        {percentage}% &nbsp;{speaker}
      </div>
      <div className="flex items-end w-11/12 justify-start">
        {word_timing_item.map((item, index) => {
          let width =
            parseFloat(item.endTime, 10) * 10 -
            parseFloat(item.startTime, 10) * 10;

          return (
            <React.Fragment key={index}>
              <div
                className={`${
                  item.word
                    ? `${
                        curTime < parseFloat(item.endTime)
                          ? bgColor
                          : 'bg-gray-400'
                      } h-12 border-r-2 border-l-2 border-white-700`
                    : 'bg-gray-100 h-12'
                } cursor-pointer`}
                style={{
                  width: `${width > 0 ? width * 5 : 2}px`,
                }}
                title={JSON.stringify(item, null, 2)}
                onClick={() => jumpTo(parseFloat(item.startTime))}
              ></div>
              {bgColor === 'bg-indigo-700' && (
                <div
                  className="h-1 absolute border-b border-gray-700 opacity-75"
                  style={{ width: `${Math.floor(curTime * 10) * 5 || 5}px` }}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default AudioWave;
