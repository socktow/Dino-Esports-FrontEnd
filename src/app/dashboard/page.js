"use client";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [riotApi, setRiotApi] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Load Riot API key từ localStorage khi component được mount
  useEffect(() => {
    const savedApi = localStorage.getItem("riotApi");
    if (savedApi) {
      setRiotApi(savedApi);
      setIsSaved(true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("riotApi", riotApi);
    setIsSaved(true);
    alert("Riot API key đã được lưu!");
  };

  const handleRemove = () => {
    localStorage.removeItem("riotApi");
    setRiotApi("");
    setIsSaved(false);
    alert("Riot API key đã được xóa!");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white">Welcome to Dashboard</h1>
        <p className="mt-4 text-gray-300">
          Select a configuration option from the navigation bar above.
        </p>

        {/* Riot API Input Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-white mb-4">Riot API</h2>
          <input
            type="text"
            value={riotApi}
            onChange={(e) => setRiotApi(e.target.value)}
            placeholder="Enter your Riot API key"
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600"
          />
          {isSaved ? (
            <button
              onClick={handleRemove}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              disabled={riotApi.trim() === ""}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
