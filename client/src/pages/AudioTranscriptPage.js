import React from 'react';
import AudioPlayer from '../components/AudioPlayer';
import AudioProgress from '../components/AudioProgress';
import Waves from '../components/Waves';
import TranscriptSection from '../components/TranscriptSecton';
import '../styles/main.css';

const AudioTranscriptPage = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Audio Container */}
      <div className="w-full flex items-center justify-between h-16 bg-gray-200 px-8">
        <AudioPlayer />
        <div className="flex justify-around items-center border border-gray-400 px-3 py-1 rounded space-x-1 bg-white cursor-pointer">
          <span className="material-icons text-xs">share</span>
          <span className="text-sm font-medium text-gray-700">Share</span>
        </div>
      </div>
      {/* Audio Progress */}
      <AudioProgress />
      <Waves />
      {/* Transcript section */}
      <TranscriptSection />
    </div>
  );
};

export default AudioTranscriptPage;
