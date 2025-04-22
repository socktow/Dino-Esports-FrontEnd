'use client';

import { useState } from 'react';

const GameConfig = () => {
  const [config, setConfig] = useState({
    showGold: false,
    showEXP: false,
    combatView: false,
    showGraphGold: false,
    hideObjective: false,
    hideTeamScoreboard: false,
    hideScoreboard: false,
  });

  const toggleConfig = (key) => {
    setConfig((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="max-w-8xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">Game Configuration</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(config).map(([key, value]) => (
          <div 
            key={key} 
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg text-gray-200">
                {key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase())}
              </span>
              <button
                onClick={() => toggleConfig(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameConfig; 