'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { displayAPI } from '@/api';
import { toast } from 'react-hot-toast';

const PlayerConfig = () => {
  const { user, token } = useAuth();
  const [players, setPlayers] = useState(
    Array(10).fill().map((_, index) => ({
      id: index + 1,
      name: `Player ${index + 1}`,
      customName: '',
      team: index < 5 ? 'Red Team' : 'Blue Team',
    }))
  );

  useEffect(() => {
    const fetchDisplayData = async () => {
      if (!user?.username || !token) return;
      
      try {
        const data = await displayAPI.getDisplaySettings(token, user.username);
        if (data?.playerConfig) {
          const updatedPlayers = players.map((player, index) => ({
            ...player,
            customName: data.playerConfig[`customNamePlayer${index}`] || ''
          }));
          setPlayers(updatedPlayers);
        }
      } catch (error) {
        console.error('Error fetching display settings:', error);
      }
    };

    fetchDisplayData();
  }, [user?.username, token]);

  const updatePlayerName = (id, value) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === id ? { ...player, customName: value } : player
      )
    );
  };

  const handleConfirm = async () => {
    if (!user?.username || !token) {
      toast.error('Please login first');
      return;
    }

    try {
      const playerConfig = {};
      players.forEach((player, index) => {
        playerConfig[`customNamePlayer${index}`] = player.customName;
      });

      await displayAPI.updatePlayerConfig(token, user.username, playerConfig);
      toast.success('Player configuration updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update player configuration');
    }
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Player Configuration</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Red Team */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold mb-4 text-red-400">Red Team</h2>
          {players
            .filter((player) => player.team === 'Red Team')
            .map((player) => (
              <div key={player.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors">
                <div className="mb-2">
                  <span className="text-base font-medium text-gray-200">Player {player.id}</span>
                </div>
                <input
                  type="text"
                  value={player.customName}
                  onChange={(e) => updatePlayerName(player.id, e.target.value)}
                  placeholder="Enter custom name"
                  className="w-full p-2 text-sm bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
        </div>

        {/* Blue Team */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Blue Team</h2>
          {players
            .filter((player) => player.team === 'Blue Team')
            .map((player) => (
              <div key={player.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors">
                <div className="mb-2">
                  <span className="text-base font-medium text-gray-200">Player {player.id}</span>
                </div>
                <input
                  type="text"
                  value={player.customName}
                  onChange={(e) => updatePlayerName(player.id, e.target.value)}
                  placeholder="Enter custom name"
                  className="w-full p-2 text-sm bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="mt-10 text-center">
        <button
          onClick={handleConfirm}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default PlayerConfig;
