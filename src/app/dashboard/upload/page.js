'use client';

import { useState } from 'react';

const Upload = () => {
  const [selectedTournament, setSelectedTournament] = useState('');
  const [uploadedImages, setUploadedImages] = useState({});

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (selectedTournament) {
      setUploadedImages((prev) => ({
        ...prev,
        [selectedTournament]: [...(prev[selectedTournament] || []), ...files],
      }));
    }
  };

  return (
    <div className="max-w-8xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">Upload Images</h1>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
        <div className="mb-6">
          <label className="block text-lg font-medium mb-4 text-gray-200">
            Select Tournament
          </label>
          <select
            value={selectedTournament}
            onChange={(e) => setSelectedTournament(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="bg-gray-800">Select a tournament</option>
          </select>
        </div>

        {selectedTournament && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Upload Images
              </label>
              <p className="mt-4 text-gray-400">
                Click to upload or drag and drop
              </p>
            </div>

            {uploadedImages[selectedTournament]?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-6 text-white">Uploaded Images</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {uploadedImages[selectedTournament].map((file, index) => (
                    <div
                      key={index}
                      className="relative aspect-square bg-gray-700 rounded-lg overflow-hidden group"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload; 