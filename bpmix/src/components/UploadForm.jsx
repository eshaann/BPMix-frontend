import React, { useState } from 'react';
import axios from 'axios';

export default function UploadForm({ setSongs }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (newFiles) => {
    const fileArray = Array.from(newFiles);
    setFiles((curr) => {
      const combined = [...curr];
      fileArray.forEach((file) => {
        if (!combined.find(f => f.name === file.name && f.size === file.size)) {
          combined.push(file);
        }
      });
      return combined;
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("No files to upload!");
      return;
    }

    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      const uploadRes = await axios.post('http://3.149.164.253:5000/upload', formData);
      const analyzed = uploadRes.data;

      const orderRes = await axios.post('http://3.149.164.253:5000/order', analyzed);

      setSongs(orderRes.data);
      setFiles([]);
    } catch (err) {
      alert("Upload/order failed. Check backend.");
      console.error(err);
    }
  };

  return (
    <div>
      <div
        className={`dropbox ${isDragging ? 'dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <p>Drag & drop your audio files here, or click below to select files</p>
        <input
          type="file"
          accept="audio/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="file-list">
          {files.map((file, i) => (
            <li key={file.name + file.size}>
              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              <button onClick={() => setFiles(curr => curr.filter((_, j) => i !== j))}>❌</button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleUpload} disabled={files.length === 0} className="upload-btn">
        Upload & Analyze
      </button>
    </div>
  );
}
