"use client";
import { useState, useEffect } from "react";
import { getTournamentsByUser, getTournamentById, addTeamToTournament } from "@/api/tournamentapi";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const Upload = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState("");
  const [tournamentDetails, setTournamentDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);
  const [teamData, setTeamData] = useState({
    teamName: "",
    teamTag: "",
    image: null
  });
  const [submitting, setSubmitting] = useState(false);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTeamData(prev => ({
        ...prev,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error('Please login again');
        return;
      }

      if (!selectedTournament) {
        toast.error('Please select a tournament');
        return;
      }

      if (!teamData.teamName || !teamData.teamTag || !teamData.image) {
        toast.error('Please fill in all fields and upload a team logo');
        return;
      }

      setSubmitting(true);

      const formData = new FormData();
      formData.append('teamName', teamData.teamName);
      formData.append('teamTag', teamData.teamTag);
      if (teamData.image instanceof File) {
        formData.append('logo', teamData.image);
      }

      // Debug log
      console.log('FormData contents:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await addTeamToTournament(selectedTournament, formData, token);
      if (response.success) {
        toast.success('Team added successfully');
        // Refresh tournament details
        const updatedTournament = await getTournamentById(selectedTournament);
        if (updatedTournament.success) {
          setTournamentDetails(updatedTournament.data);
        }
        // Reset form
        setTeamData({
          teamName: "",
          teamTag: "",
          image: null
        });
        setImagePreview(null);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to add team');
    } finally {
      setSubmitting(false);
    }
  };

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
      <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-2 gap-6 bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
        {/* Inputs */}
        <div>
          <label className="block mb-2 text-gray-300">Team Name</label>
          <input
            type="text"
            name="teamName"
            value={teamData.teamName}
            onChange={handleInputChange}
            placeholder="Enter team name"
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 mb-4"
          />
          <label className="block mb-2 text-gray-300">Team Tag</label>
          <input
            type="text"
            name="teamTag"
            value={teamData.teamTag}
            onChange={handleInputChange}
            placeholder="Enter team tag"
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
          />
        </div>

        {/* Drag & Drop */}
        <div className="flex items-center justify-center w-full h-full">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center w-full">
            {imagePreview ? (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Team logo preview" 
                  className="max-h-64 mx-auto rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setTeamData(prev => ({ ...prev, image: null }));
                  }}
                  className="absolute top-2 right-2 p-2 bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-gray-400">
                  <label className="cursor-pointer">
                    <span className="text-blue-400 hover:text-blue-300">Click to upload</span> or drag and drop
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={submitting}
        >
          {submitting ? 'Uploading...' : 'Upload'}
        </button>
      </form>

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
