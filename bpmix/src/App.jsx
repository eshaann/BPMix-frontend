import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import SongGraph from './components/SongGraph';

export default function App() {
  const [songs, setSongs] = useState([]);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>🎧 BPMix - Smart Song Roadmap</h1>
      <UploadForm setSongs={setSongs} />
      {songs.length > 0 && <SongGraph songs={songs} />}
    </div>
  );
}