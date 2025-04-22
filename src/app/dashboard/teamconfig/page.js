"use client";

import { useState } from "react";

const TeamConfig = () => {
  const [teams, setTeams] = useState({
    teamA: {
      name: "",
      tag: "",
      score: 0,
      selectedTeam: "",
    },
    teamB: {
      name: "",
      tag: "",
      score: 0,
      selectedTeam: "",
    },
  });

  const [selectedFormat, setSelectedFormat] = useState("bo1");
  const [selectedTournament, setSelectedTournament] = useState("");

  const updateTeam = (team, field, value) => {
    setTeams((prev) => ({
      ...prev,
      [team]: {
        ...prev[team],
        [field]: value,
      },
    }));
  };

  const showScoreInput = selectedFormat !== "bo1";

  return (
    <div className="max-w-8xl mx-auto">
      <h1 className="text-3xl font-bold text-white">Team Configuration</h1>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Team A */}
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">
              Team A
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  value={teams.teamA.name}
                  onChange={(e) => updateTeam("teamA", "name", e.target.value)}
                  placeholder="Enter team name"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Team Tag
                </label>
                <input
                  type="text"
                  value={teams.teamA.tag}
                  onChange={(e) => updateTeam("teamA", "tag", e.target.value)}
                  placeholder="Enter team tag"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {showScoreInput && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Score
                  </label>
                  <input
                    type="number"
                    value={teams.teamA.score}
                    onChange={(e) =>
                      updateTeam("teamA", "score", parseInt(e.target.value))
                    }
                    placeholder="Enter score"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Team
                </label>
                <select
                  value={teams.teamA.selectedTeam}
                  onChange={(e) =>
                    updateTeam("teamA", "selectedTeam", e.target.value)
                  }
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" className="bg-gray-800">
                    Select Team
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Match Format and Tournament */}
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-full">
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Match Settings
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Match Format
                </label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="bo1" className="bg-gray-800">
                    Best of 1
                  </option>
                  <option value="bo2" className="bg-gray-800">
                    Best of 2
                  </option>
                  <option value="bo3" className="bg-gray-800">
                    Best of 3
                  </option>
                  <option value="bo5" className="bg-gray-800">
                    Best of 5
                  </option>
                  <option value="bo7" className="bg-gray-800">
                    Best of 7
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tournament
                </label>
                <select
                  value={selectedTournament}
                  onChange={(e) => setSelectedTournament(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" className="bg-gray-800">
                    Select Tournament
                  </option>
                </select>
              </div>

              {/* Confirm button */}
              <div className="pt-4">
                <button
                  onClick={() => {
                    console.log("Match Format:", selectedFormat);
                    console.log("Tournament:", selectedTournament);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Team B */}
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-red-400">Team B</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  value={teams.teamB.name}
                  onChange={(e) => updateTeam("teamB", "name", e.target.value)}
                  placeholder="Enter team name"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Team Tag
                </label>
                <input
                  type="text"
                  value={teams.teamB.tag}
                  onChange={(e) => updateTeam("teamB", "tag", e.target.value)}
                  placeholder="Enter team tag"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {showScoreInput && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Score
                  </label>
                  <input
                    type="number"
                    value={teams.teamB.score}
                    onChange={(e) =>
                      updateTeam("teamB", "score", parseInt(e.target.value))
                    }
                    placeholder="Enter score"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Team
                </label>
                <select
                  value={teams.teamB.selectedTeam}
                  onChange={(e) =>
                    updateTeam("teamB", "selectedTeam", e.target.value)
                  }
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" className="bg-gray-800">
                    Select Team
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamConfig;
