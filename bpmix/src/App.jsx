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
      <nav className="navbar">
        <span className="navbar-title">🎧 BPMix - DJ Set Order Generator</span>
        <div className="navbar-links">
          <a 
            href="https://github.com/eshaann/BPMix-frontend" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
          >
            Frontend Repo
          </a>
          <a 
            href="https://github.com/eshaann/BPMix-api" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link highlight"
          >
            API Repo ⚡
          </a>
        </div>
      </nav>

      <div className="content">
        <div className="main-container">
          {songs.length > 0 && <SongGraph songs={songs} />}
          <UploadForm setSongs={setSongs} />
        </div>
      </div>
    </div>
  );
}