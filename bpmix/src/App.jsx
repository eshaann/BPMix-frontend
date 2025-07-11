import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import SongGraph from './components/SongGraph';
import './App.css'

export default function App() {
  const [songs, setSongs] = useState([]);

  return (
    <div>
      <nav className="navbar">
        🎧 BPMix - Smart Song Roadmap
      </nav>
      <div className="content">
        <UploadForm setSongs={setSongs} />
        {songs.length > 0 && <SongGraph songs={songs} />}
      </div>
    </div>
  );
}
