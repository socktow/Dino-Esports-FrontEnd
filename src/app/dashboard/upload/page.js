"use client";
import { useState, useEffect } from "react";
import { getTournamentsByUser, getTournamentById } from "@/api/tournamentapi";
import { useAuth } from "../../../context/AuthContext";

const Upload = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState("");
  const [tournamentDetails, setTournamentDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTournaments = async () => {
      if (user?.username) {
        try {
          setLoading(true);
          const response = await getTournamentsByUser(user.username);
          if (response.success) {
            setTournaments(response.data);
          }
        } catch (error) {
          console.error("Error fetching tournaments:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTournaments();
  }, [user]);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      if (selectedTournament) {
        try {
          setLoading(true);
          const response = await getTournamentById(selectedTournament);
          if (response.success) {
            setTournamentDetails(response.data);
          }
        } catch (error) {
          console.error("Error fetching tournament details:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTournamentDetails();
  }, [selectedTournament]);

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Upload Team Logo</h1>

      {/* Tournament Select */}
      <div className="mb-6">
        <label className="text-lg mb-2 block">Select Tournament</label>
        <select
          value={selectedTournament}
          onChange={(e) => setSelectedTournament(e.target.value)}
          className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 text-white"
        >
          <option value="">Choose a tournament</option>
          {tournaments.map((tournament) => (
            <option
              key={tournament.tournamentId}
              value={tournament.tournamentId}
            >
              {tournament.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tournament Info */}
      {tournamentDetails && (
        <div className="flex bg-gray-800 rounded-lg p-4 mb-4 flex-col">
          <h2 className="text-xl font-semibold mb-4">Team Details</h2>
          <div className="w-full bg-gray-900 rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 mx-auto">
            <img
              src={tournamentDetails.logo}
              alt={tournamentDetails.name}
              className="w-28 h-28 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold">
                {tournamentDetails.name}
              </h2>
              <p className="text-gray-400">Host: {tournamentDetails.host}</p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Box */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
        {/* Inputs */}
        <div>
          <label className="block mb-2 text-gray-300">Team Name</label>
          <input
            type="text"
            placeholder="Enter team name"
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 mb-4"
          />
          <label className="block mb-2 text-gray-300">Team Tag</label>
          <input
            type="text"
            placeholder="Enter team tag"
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
          />
        </div>

        {/* Drag & Drop */}
        <div className="flex items-center justify-center  w-full h-full ">
          <div className="border-2 border-dashed border-gray-600 w-full h-full flex items-center justify-center text-gray-400 rounded-lg cursor-pointer hover:border-blue-400 transition">
            Drag & Drop Image Here
          </div>
        </div>
        <button className="bg-blue-500 text-white p-3 rounded-lg">Upload</button>
      </div>

      {/* Team Gallery */}
      {tournamentDetails && (
        <div>
          <div className="flex-col items-center justify-center bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Team Gallery</h2>
          {tournamentDetails.teams?.length > 0 ? (
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {tournamentDetails.teams.map((team, index) => (
                <div
                  key={index}
                  className="w-36 flex-shrink-0 bg-gray-800 rounded-lg overflow-hidden relative group border-2 border-gray-700"
                >
                  <img
                    src={team.logo}
                    alt={team.teamName}
                    className="w-full h-36 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center flex-col transition-opacity">
                    <p className="text-sm font-semibold text-white">
                      {team.teamName}
                    </p>
                    <span className="text-xs text-gray-300">
                      {team.teamTag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No teams yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
