import React, { useState } from 'react';
import axios from 'axios';

export default function UploadForm({ setSongs }) {
  const [files, setFiles] = useState([]);


  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((curr) => {
      const combined = [...curr];
      newFiles.forEach((file) => {
        if (!combined.find(f => f.name === file.name && f.size === file.size)) {
          combined.push(file);
        }
      });
      return combined;
    });
  };

  const removeFile = (index) => {
    setFiles((curr) => curr.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("No files to upload!");
      return;
    }

    const formData = new FormData();
    files.forEach(file => formData.append('files', file));


    try {
      const uploadRes = await axios.post('/api/upload', formData);
      const analyzed = uploadRes.data;
      const orderRes = await axios.post('/api/order', analyzed);
      setSongs(orderRes.data);
      setFiles([]);
    } catch (err) {
      alert("Upload/order failed. Check backend.");
      console.error(err);
    }



  };

  return (
    <div className="upload-container">
      <div className="dropbox">
        <p>Drag & drop files here, or click below to select files</p>
        <input
          type="file"
          accept="audio/*"
          multiple
          onChange={handleFileChange}

        />
      </div>
      {files.length > 0 && (
        <ul className="file-list">
          {files.map((file, i) => (
            <li key={file.name + file.size}>
              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              <button onClick={() => removeFile(i)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button className="upload-btn" onClick={handleUpload} disabled={files.length === 0}>
        Upload
      </button>