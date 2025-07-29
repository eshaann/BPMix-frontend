import React, { useState, useEffect } from 'react';
import UploadForm from './components/UploadForm';
import SongGraph from './components/SongGraph';
import './App.css';

export default function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (songs.length > 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [songs]);

  return (
    <div className="app">
      <div className="navbar">🎧 BPMix - DJ Set Order Generator</div>
      <div className="content">
        <div className="main-container">
          {songs.length > 0 && <SongGraph songs={songs} />}
          <UploadForm setSongs={setSongs} />
        </div>
      </div>
    </div>
  );
}
