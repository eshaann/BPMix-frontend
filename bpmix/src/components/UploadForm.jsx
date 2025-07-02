import React, { useState } from 'react';
import axios from 'axios';

export default function UploadForm({ setSongs }) {
  const [files, setFiles] = useState([]);

  // Add files to state, avoid duplicates by name+size
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

  // Remove a file by index
  const removeFile = (index) => {
    setFiles((curr) => curr.filter((_, i) => i !== index));
  };

// Upload files to backend
const handleUpload = async () => {
    if (files.length === 0) {
      alert("No files to upload!");
      return;
    }
  
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
  
    try {
      // Step 1: Upload and analyze files
      const uploadRes = await axios.post('http://3.22.81.181:4000/upload', formData);
      const analyzed = uploadRes.data;
  
      // Step 2: Get optimized order
      const orderRes = await axios.post('http://3.22.81.181:4000/order', analyzed);
  
      // Step 3: Set the sorted songs for rendering
      setSongs(orderRes.data);
      setFiles([]);
    } catch (err) {
      alert("Upload/order failed. Check backend.");
      console.error(err);
    }
  };
  

  return (
    <div>
      <input type="file" accept="audio/*" multiple onChange={handleFileChange} />
      {files.length > 0 && (
        <ul>
          {files.map((file, i) => (
            <li key={file.name + file.size}>
              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              <button onClick={() => removeFile(i)} style={{ marginLeft: 10 }}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleUpload} disabled={files.length === 0}>
        Upload
      </button>
    </div>
  );
}
