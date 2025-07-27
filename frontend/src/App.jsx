import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post('http://localhost:5000/upload', formData);
    setResponse(res.data);
  };

  const downloadJSON = () => {
    const jsonString = JSON.stringify(response, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'extracted_structure.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-10 font-mono">
      <h1 className="text-2xl font-bold mb-4">📄 PDF Heading Extractor</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        className="bg-blue-600 text-white px-4 py-2 ml-2 rounded"
        onClick={handleUpload}
      >
        Upload
      </button>

      {response && (
        <div className="mt-8 bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold">🔍 Extracted Structure:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(response, null, 2)}
          </pre>
          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            onClick={downloadJSON}
          >
            Download JSON
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
