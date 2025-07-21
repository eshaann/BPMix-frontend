import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import SongGraph from './components/SongGraph';
import './App.css';

export default function App() {
  const [songs, setSongs] = useState([]);

  return (
    <div className="app">
      <div className="navbar">🎧 BPMix - Smart Song Roadmap</div>
      <h2>Upload your mp3 files to generate a set order</h2>
      <div className="content">
        <div className="main-container">
          {songs.length > 0 && <SongGraph songs={songs} />}
          <UploadForm setSongs={setSongs} />
        </div>
      </div>
    </div>
  );
}
