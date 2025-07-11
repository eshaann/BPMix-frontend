import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import SongGraph from './components/SongGraph';
import './App.css';

export default function App() {
  const [songs, setSongs] = useState([]);

  return (
    <div className="app">
      <header className="navbar">🎧 BPMix - Smart Song Roadmap</header>
      <main className="content">
        <UploadForm setSongs={setSongs} />
        {songs.length > 0 && <SongGraph songs={songs} />}
      </main>
    </div>
  );
}
