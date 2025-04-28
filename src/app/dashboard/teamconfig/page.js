"use client";

import { useState, useEffect } from "react";
import { getTournamentsByUser, getTournamentById } from "@/api/tournamentapi";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";

const TeamConfig = () => {
  const [teams, setTeams] = useState({
    teamA: {
      selectedTeam: "",
      name: "",
      tag: "",
      logo: "",
      score: 0,
    },
    teamB: {
      selectedTeam: "",
      name: "",
      tag: "",
      logo: "",
      score: 0,
    },
  });

  const [selectedFormat, setSelectedFormat] = useState("bo1");
  const [selectedTournament, setSelectedTournament] = useState("");
  const [tournaments, setTournaments] = useState([]);
  const [tournamentDetails, setTournamentDetails] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTournaments = async () => {
      if (user?.username) {
        try {
          const response = await getTournamentsByUser(user.username);
          if (response.success) {
            setTournaments(response.data);
          }
        } catch (error) {
          console.error("Error fetching tournaments:", error);
        }
      }
    };
    fetchTournaments();
  }, [user]);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      if (selectedTournament) {
        try {
          const response = await getTournamentById(selectedTournament);
          if (response.success) {
            setTournamentDetails(response.data);
          }
        } catch (error) {
          console.error("Error fetching tournament details:", error);
        }
      }
    };
    fetchTournamentDetails();
  }, [selectedTournament]);

  const updateTeam = (team, field, value) => {
    setTeams((prev) => ({
      ...prev,
      [team]: {
        ...prev[team],
        [field]: value,
      },
    }));
  };

  const handleTeamSelect = (team, teamName) => {
    const selectedTeam = tournamentDetails?.teams.find(t => t.teamName === teamName);
    if (selectedTeam) {
      updateTeam(team, 'selectedTeam', teamName);
      updateTeam(team, 'name', selectedTeam.teamName);
      updateTeam(team, 'tag', selectedTeam.teamTag);
      updateTeam(team, 'logo', selectedTeam.logo);
    }
  };

  const handleScoreChange = (team, value) => {
    updateTeam(team, 'score', parseInt(value) || 0);
  };

  const handleSwapTeams = () => {
    setTeams((prev) => ({
      teamA: {
        ...prev.teamB,
        selectedTeam: prev.teamB.selectedTeam,
      },
      teamB: {
        ...prev.teamA,
        selectedTeam: prev.teamA.selectedTeam,
      },
    }));
  };

  const handleSaveConfig = () => {
    if (!selectedTournament) {
      toast.error('Please select a tournament');
      return;
    }

    if (!teams.teamA.selectedTeam || !teams.teamB.selectedTeam) {
      toast.error('Please select both teams');
      return;
    }

    const config = {
      tournamentId: selectedTournament,
      format: selectedFormat,
      teams: [
        {
          team: teams.teamA.selectedTeam,
          position: 'A',
          score: teams.teamA.score
        },
        {
          team: teams.teamB.selectedTeam,
          position: 'B',
          score: teams.teamB.score
        }
      ]
    };

    console.log('Team Configuration:', config);
    toast.success('Configuration saved successfully');
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
                  Select Team
                </label>
                <select
                  value={teams.teamA.selectedTeam}
                  onChange={(e) => handleTeamSelect("teamA", e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" className="bg-gray-800">
                    Select Team
                  </option>
                  {tournamentDetails?.teams.map((team) => (
                    <option 
                      key={team.teamName} 
                      value={team.teamName}
                      className="bg-gray-800"
                    >
                      {team.teamName} ({team.teamTag})
                    </option>
                  ))}
                </select>
              </div>

              {teams.teamA.selectedTeam && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={teams.teamA.logo} 
                      alt={teams.teamA.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold text-white">{teams.teamA.name}</p>
                      <p className="text-sm text-gray-400">{teams.teamA.tag}</p>
                    </div>
                  </div>

                  {showScoreInput && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Score
                      </label>
                      <input
                        type="number"
                        value={teams.teamA.score}
                        onChange={(e) => handleScoreChange("teamA", e.target.value)}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              )}
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
                  {tournaments.map((tournament) => (
                    <option 
                      key={tournament.tournamentId} 
                      value={tournament.tournamentId}
                      className="bg-gray-800"
                    >
                      {tournament.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleSaveConfig}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
                >
                  Save Config
                </button>
                <button
                  onClick={handleSwapTeams}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
                >
                  Swap Teams
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
                  Select Team
                </label>
                <select
                  value={teams.teamB.selectedTeam}
                  onChange={(e) => handleTeamSelect("teamB", e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" className="bg-gray-800">
                    Select Team
                  </option>
                  {tournamentDetails?.teams.map((team) => (
                    <option 
                      key={team.teamName} 
                      value={team.teamName}
                      className="bg-gray-800"
                    >
                      {team.teamName} ({team.teamTag})
                    </option>
                  ))}
                </select>
              </div>

              {teams.teamB.selectedTeam && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={teams.teamB.logo} 
                      alt={teams.teamB.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold text-white">{teams.teamB.name}</p>
                      <p className="text-sm text-gray-400">{teams.teamB.tag}</p>
                    </div>
                  </div>

                  {showScoreInput && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Score
                      </label>
                      <input
                        type="number"
                        value={teams.teamB.score}
                        onChange={(e) => handleScoreChange("teamB", e.target.value)}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamConfig;
