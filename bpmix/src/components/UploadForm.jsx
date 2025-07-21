import React, { useState } from 'react';
import axios from 'axios';

export default function UploadForm({ setSongs }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      const uploadRes = await axios.post('/api/upload', formData);
      const analyzed = uploadRes.data;
      const orderRes = await axios.post('/api/order', analyzed);
      setSongs(orderRes.data);
      setFiles([]);
    } catch (err) {
      alert("Upload/order failed. Check backend.");
      console.error(err);
    } finally {
      setLoading(false);
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
          disabled={loading}
        />
      </div>

      {files.length > 0 && (
        <ul className="file-list">
          {files.map((file, i) => (
            <li key={file.name + file.size}>
              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              <button onClick={() => removeFile(i)} disabled={loading}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <button
        className="upload-btn"
        onClick={handleUpload}
        disabled={files.length === 0 || loading}
      >
        Upload
      </button>

      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Processing...</p>
        </div>
      )}

      <style>{`
        .spinner-container {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .spinner {
          border: 6px solid #f3f3f3;
          border-top: 6px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
