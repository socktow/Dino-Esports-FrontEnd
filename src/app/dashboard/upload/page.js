'use client';
import { useState, useEffect } from 'react';
import { getTournamentsByUser, getTournamentById } from '@/api/tournamentapi';
import { useAuth } from '../../../context/AuthContext';

const Upload = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState('');
  const [tournamentDetails, setTournamentDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Fetch tournaments on component mount
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
          console.error('Error fetching tournaments:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTournaments();
  }, [user]);

  // Fetch tournament details when selected
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
          console.error('Error fetching tournament details:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTournamentDetails();
  }, [selectedTournament]);

  return (
    <div className="max-w-8xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Team Logo Upload</h1>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
        <div className="mb-6">
          <label className="block text-lg font-medium mb-4 text-gray-200">
            Select Tournament
          </label>
          <select
            value={selectedTournament}
            onChange={(e) => setSelectedTournament(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="">Select a tournament</option>
            {tournaments.map((tournament) => (
              <option key={tournament.tournamentId} value={tournament.tournamentId}>
                {tournament.name}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}

        {tournamentDetails && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-6 text-white">Team Gallery</h2>
            {tournamentDetails.teams?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tournamentDetails.teams.map((team, index) => (
                  <div
                    key={index}
                    className="relative aspect-square bg-gray-700 rounded-lg overflow-hidden group"
                  >
                    <img
                      src={team.logo}
                      alt={team.teamName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                      <h3 className="text-lg font-medium text-white text-center">{team.teamName}</h3>
                      <p className="text-gray-300 text-sm">{team.teamTag}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center">No teams added yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload; 